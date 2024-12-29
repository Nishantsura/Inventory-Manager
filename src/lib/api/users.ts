import { mockUsers } from "../mock-data";

export type User = (typeof mockUsers)[0];
export type UserInsert = Omit<User, "id" | "created_at" | "updated_at">;
export type UserUpdate = Partial<UserInsert>;

export const getUsers = async () => {
  return mockUsers;
};

export const createUser = async (user: UserInsert) => {
  const newUser = {
    ...user,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = async (id: string, user: UserUpdate) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");

  const updatedUser = {
    ...mockUsers[index],
    ...user,
    updated_at: new Date().toISOString(),
  };
  mockUsers[index] = updatedUser;
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  mockUsers.splice(index, 1);
};
