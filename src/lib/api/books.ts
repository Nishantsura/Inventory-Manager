import { mockBooks } from "../mock-data";

export type Book = (typeof mockBooks)[0];
export type BookInsert = Omit<Book, "id" | "created_at" | "updated_at">;
export type BookUpdate = Partial<BookInsert>;

export const getBooks = async () => {
  return mockBooks;
};

export const getBookById = async (id: string) => {
  const book = mockBooks.find((b) => b.id === id);
  if (!book) throw new Error("Book not found");
  return book;
};

export const generateSKU = (title: string, category: string) => {
  const titlePrefix = title.slice(0, 3).toUpperCase();
  const categoryPrefix = category.slice(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${titlePrefix}-${categoryPrefix}-${randomNum}`;
};

export const createBook = async (book: BookInsert) => {
  const newBook = {
    ...book,
    id: Math.random().toString(36).substr(2, 9),
    sku: book.sku || generateSKU(book.title, book.category),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockBooks.push(newBook);
  return newBook;
};

export const updateBook = async (id: string, book: BookUpdate) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Book not found");

  const updatedBook = {
    ...mockBooks[index],
    ...book,
    updated_at: new Date().toISOString(),
  };
  mockBooks[index] = updatedBook;
  return updatedBook;
};

export const deleteBook = async (id: string) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Book not found");
  mockBooks.splice(index, 1);
};
