import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { v4 } from "uuid"
import * as localforage from "localforage"

function createEmptyInput(): ValueType {
  return {
    id: v4(),
    label: "",
    value: "",
  }
}

const initialTabId = v4()

export const useInputsStore = create<InputsStoreType>()(
  devtools(
    persist(
      immer((setState) => ({
        inputs: {
          [initialTabId]: [createEmptyInput()],
        },
        tabs: [{ id: initialTabId, label: "new tab" }],

        addNewTab: () => {
          setState(
            (state) => {
              const newTabID = v4()
              state.tabs.push({
                id: newTabID,
                label: "new tab",
              })
              state.inputs[newTabID] = []
            },
            false,
            "addNewTab",
          )
        },
        removeTab: (tabId) => {
          setState(
            (state) => {
              state.tabs = state.tabs.filter(({ id }) => tabId !== id)
              delete state.inputs[tabId]
            },
            false,
            "removeTab",
          )
        },
        addNewInput: (tabId) => {
          setState(
            (state) => {
              const inputs = state.inputs[tabId]
              if (!inputs) return
              inputs.push(createEmptyInput())
            },
            false,
            "addNewInput",
          )
        },
        changeInputValue: (tabId, updatedInput) => {
          setState(
            (state) => {
              const inputs = state.inputs[tabId]
              if (!inputs) return
              const index = inputs.findIndex(({ id }) => id === updatedInput.id)
              if (index === -1) {
                return
              }
              inputs[index] = updatedInput
            },
            false,
            "changeInputValue",
          )
        },
        removeInput: (tabId, removeItemId) => {
          setState(
            (state) => {
              const inputs = state.inputs[tabId]
              if (!inputs) return
              state.inputs[tabId] = inputs.filter(
                ({ id }) => id !== removeItemId,
              )
            },
            false,
            "removeInput",
          )
        },
      })),
      {
        name: "inputs",
        version: 1,
        migrate: (persistedState, version) => {
          switch (version) {
            case 0:
              const tabId = v4()
              const persistedStateAny: any = persistedState
              persistedStateAny.tabs = [{ id: tabId, label: "new tab" }]
              const temp = persistedStateAny.inputs
              delete persistedStateAny.inputs
              persistedStateAny.inputs[tabId] = temp
              return persistedStateAny
          }
        },
        partialize: (state) => ({ inputs: state.inputs, tabs: state.tabs }),
        storage: {
          ...localforage,
          setItem: async (name, value) => {
            await localforage.setItem(name, value)
          },
        },
      },
    ),
    { name: "inputs", store: "inputs" },
  ),
)
export const InputsStoreMethods = getMethods(useInputsStore.getState())

type ValueType = {
  id: string
  label: string
  value: string
}
type TabType = {
  id: string
  label: string
}
type InputsStoreType = {
  tabs: TabType[]
  inputs: Record<string, ValueType[]>
  addNewTab: () => void
  removeTab: (tabId: string) => void
  addNewInput: (tabId: string) => void
  changeInputValue: (tabId: string, updatedInput: ValueType) => void
  removeInput: (tabId: string, removeItemId: string) => void
}

function getMethods<T extends Record<string, unknown>>(
  store: T,
): ExtractMethods<T> {
  const entries = Object.entries(store) as Entries<T>
  const init = {} as T
  return entries.reduce((acc, entre) => {
    if (typeof entre[1] === "function") {
      acc[entre[0]] = entre[1]
    }
    return acc
  }, init) as ExtractMethods<T>
}

type Entries<T extends Record<string, unknown>> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

type ExtractMethods<T extends Record<string, unknown>> = {
  [key in keyof T as T[key] extends Function ? key : never]: T[key]
}
