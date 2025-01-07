import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type Book = Database["public"]["Tables"]["books"]["Row"];
export type BookInsert = Database["public"]["Tables"]["books"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["books"]["Update"];

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select();
  if (error) throw error;
  return data;
};

export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const generateSKU = (title: string, category: string) => {
  const titlePrefix = title.slice(0, 3).toUpperCase();
  const categoryPrefix = category.slice(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${titlePrefix}-${categoryPrefix}-${randomNum}`;
};

export const createBook = async (book: BookInsert) => {
  const { data, error } = await supabase
    .from("books")
    .insert({
      ...book,
      sku: book.sku || generateSKU(book.title, book.category),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBook = async (id: string, book: BookUpdate) => {
  const { data, error } = await supabase
    .from("books")
    .update(book)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBook = async (id: string) => {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw error;
};

export const processBookUpload = async (books: any[]) => {
  const errors: string[] = [];
  const validBooks: BookInsert[] = [];

  // Validate each book
  books.forEach((book, index) => {
    try {
      const validatedBook = validateBook(book);
      validBooks.push(validatedBook);
    } catch (error) {
      errors.push(
        `Row ${index + 2}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  });

  // If there are any validation errors, throw them
  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join("\n")}`);
  }

  // Insert books in batches
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < validBooks.length; i += batchSize) {
    const batch = validBooks.slice(i, i + batchSize);
    batches.push(batch);
  }

  for (const batch of batches) {
    const { error } = await supabase.from("books").insert(batch);
    if (error) throw error;
  }

  return validBooks.length;
};

function validateBook(book: any): BookInsert {
  if (!book.title) throw new Error("Title is required");
  if (!book.author) throw new Error("Author is required");
  if (!book.isbn) throw new Error("ISBN is required");
  if (!book.category) throw new Error("Category is required");
  if (!book.price || isNaN(Number(book.price)))
    throw new Error("Price must be a valid number");

  return {
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    category: book.category.toLowerCase(),
    price: Number(book.price),
    description: book.description || "",
    publisher: book.publisher || "",
    publication_date: book.publication_date || null,
    cover_image: book.cover_image || null,
    sku: book.sku || generateSKU(book.title, book.category),
  };
}
