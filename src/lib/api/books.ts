import { supabase } from "../supabase";
import type { Database } from "@/types/supabase";

export type Book = Database["public"]["Tables"]["books"]["Row"];
export type BookInsert = Database["public"]["Tables"]["books"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["books"]["Update"];

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) throw error;
  return data;
};

export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const generateSKU = (title: string, category: string) => {
  // Take first 3 letters of title and category, uppercase them
  const titlePrefix = title.slice(0, 3).toUpperCase();
  const categoryPrefix = category.slice(0, 3).toUpperCase();
  // Add random 4 digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${titlePrefix}-${categoryPrefix}-${randomNum}`;
};

export const createBook = async (book: BookInsert) => {
  // Generate SKU if not provided
  const bookWithSku = {
    ...book,
    sku: book.sku || generateSKU(book.title, book.category),
  };

  const { data, error } = await supabase
    .from("books")
    .insert(bookWithSku)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateBook = async (id: string, book: BookUpdate) => {
  // If title or category is being updated, regenerate SKU
  const bookToUpdate = { ...book };
  if (book.title || book.category) {
    const currentBook = await getBookById(id);
    bookToUpdate.sku = generateSKU(
      book.title || currentBook.title,
      book.category || currentBook.category,
    );
  }

  const { data, error } = await supabase
    .from("books")
    .update(bookToUpdate)
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

export const getBookBySKU = async (sku: string) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("sku", sku)
    .single();
  if (error) throw error;
  return data;
};
