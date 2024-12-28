export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          isbn: string;
          sku: string;
          category: string;
          price: number;
          created_at: string;
          updated_at: string;
          cover_image: string | null;
          description: string | null;
          publisher: string | null;
          publication_date: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          isbn: string;
          sku: string;
          category: string;
          price: number;
          created_at?: string;
          updated_at?: string;
          cover_image?: string | null;
          description?: string | null;
          publisher?: string | null;
          publication_date?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          isbn?: string;
          sku?: string;
          category?: string;
          price?: number;
          created_at?: string;
          updated_at?: string;
          cover_image?: string | null;
          description?: string | null;
          publisher?: string | null;
          publication_date?: string | null;
        };
      };
      inventory: {
        Row: {
          id: string;
          book_id: string;
          store_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
          min_stock_level: number;
          max_stock_level: number;
        };
        Insert: {
          id?: string;
          book_id: string;
          store_id: string;
          quantity: number;
          created_at?: string;
          updated_at?: string;
          min_stock_level?: number;
          max_stock_level?: number;
        };
        Update: {
          id?: string;
          book_id?: string;
          store_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
          min_stock_level?: number;
          max_stock_level?: number;
        };
      };
      stores: {
        Row: {
          id: string;
          name: string;
          address: string;
          created_at: string;
          updated_at: string;
          manager_id: string | null;
          status: "active" | "inactive";
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          created_at?: string;
          updated_at?: string;
          manager_id?: string | null;
          status?: "active" | "inactive";
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          created_at?: string;
          updated_at?: string;
          manager_id?: string | null;
          status?: "active" | "inactive";
        };
      };
      orders: {
        Row: {
          id: string;
          supplier: string;
          status: "pending" | "completed" | "cancelled";
          total_amount: number;
          created_at: string;
          updated_at: string;
          store_id: string;
        };
        Insert: {
          id?: string;
          supplier: string;
          status?: "pending" | "completed" | "cancelled";
          total_amount: number;
          created_at?: string;
          updated_at?: string;
          store_id: string;
        };
        Update: {
          id?: string;
          supplier?: string;
          status?: "pending" | "completed" | "cancelled";
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
          store_id?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          book_id: string;
          quantity: number;
          unit_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          book_id: string;
          quantity: number;
          unit_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          book_id?: string;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "manager" | "staff";
          store_id: string | null;
          created_at: string;
          updated_at: string;
          status: "active" | "inactive";
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: "admin" | "manager" | "staff";
          store_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: "active" | "inactive";
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "admin" | "manager" | "staff";
          store_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: "active" | "inactive";
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
