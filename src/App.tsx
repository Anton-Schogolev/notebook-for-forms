import React, { useEffect, useState } from "react"
import s from "./App.module.css"
import { Button, Col, Empty, Row, Tabs } from "antd"
import { InputCopy } from "components/Input/InputCopy"
import { InputsStoreMethods, useInputsStore } from "store/useInputsStore"
import { EditOutlined } from "@ant-design/icons"
import { LabelInput } from "components/Input/LabelInput"

function App() {
  const tabs = useInputsStore((state) => state.tabs)
  const inputsObj = useInputsStore((state) => state.inputs)
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)
  useEffect(() => {
    useInputsStore.persist.onFinishHydration((state) => {
      setActiveTab(state.tabs[0]?.id)
    })
  }, [])

  const inputs = activeTab && inputsObj[activeTab]

  return (
    <div className={s.app}>
      <div>
        <Tabs
          className={s.editContainer}
          type="editable-card"
          activeKey={activeTab}
          items={tabs.map((tab) => ({ label: tab.label, key: tab.id }))}
          onChange={setActiveTab}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              InputsStoreMethods.addNewTab()
              return
            }
            if (typeof targetKey === "string") {
              InputsStoreMethods.removeTab(targetKey)
            }
            console.error("action remove, but no id")
          }}
          tabBarExtraContent={{
            right: (
              <Button
                type={"text"}
                icon={<EditOutlined />}
                onClick={() => setIsEditMode((prev) => !prev)}
              />
            ),
          }}
        />
        {inputs ? (
          <>
            <Row gutter={[2, 25]}>
              {inputs.map((input) => (
                <Col key={input.id} span={24}>
                  {isEditMode && (
                    <LabelInput
                      value={input.label}
                      onChange={(label) => {
                        InputsStoreMethods.changeInputValue(activeTab, {
                          ...input,
                          label,
                        })
                      }}
                      onDelete={() =>
                        InputsStoreMethods.removeInput(activeTab, input.id)
                      }
                    />
                  )}
                  <InputCopy
                    label={input.label}
                    value={input.value}
                    disabled={isEditMode}
                    onChange={(value) => {
                      InputsStoreMethods.changeInputValue(activeTab, {
                        ...input,
                        value,
                      })
                    }}
                  />
                </Col>
              ))}
            </Row>
            <Row className={s.addNewLine__container} justify="center">
              <Button
                onClick={() => {
                  InputsStoreMethods.addNewInput(activeTab)
                }}
              >
                Add new input
              </Button>
            </Row>
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

export default App
