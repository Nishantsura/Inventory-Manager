import { mockStores } from "../mock-data";

export type Store = (typeof mockStores)[0];
export type StoreInsert = Omit<Store, "id" | "created_at" | "updated_at">;
export type StoreUpdate = Partial<StoreInsert>;

export const getStores = async () => {
  return mockStores;
};

export const createStore = async (store: StoreInsert) => {
  const newStore = {
    ...store,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockStores.push(newStore);
  return newStore;
};

export const updateStore = async (id: string, store: StoreUpdate) => {
  const index = mockStores.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Store not found");

  const updatedStore = {
    ...mockStores[index],
    ...store,
    updated_at: new Date().toISOString(),
  };
  mockStores[index] = updatedStore;
  return updatedStore;
};

export const deleteStore = async (id: string) => {
  const index = mockStores.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Store not found");
  mockStores.splice(index, 1);
};
