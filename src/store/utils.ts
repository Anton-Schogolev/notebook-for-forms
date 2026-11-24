export interface StateStorage {
  getItem: (name: string) => unknown | Promise<unknown>;
  setItem: (name: string, value: unknown) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
}
// export function createPersistStorage(getStorage: () => StateStorage) {
//   let storage: StateStorage;
//   try {
//     storage = getStorage();
//   } catch (e) {
//     return;
//   }
//   let persistStorage = {
//     getItem: function getItem(name: string) {
//       let _getItem;
//       let str = (_getItem = storage.getItem(name)) != null ? _getItem : null;
//       if (str instanceof Promise) {
//         return str.then(parse);
//       }
//       return parse(str);
//     },
//     setItem: function setItem(name, newValue) {
//       return storage.setItem(name, JSON.stringify(newValue));
//     },
//     removeItem: function removeItem(name) {
//       return storage.removeItem(name);
//     }
//   };
//   return persistStorage;
// }