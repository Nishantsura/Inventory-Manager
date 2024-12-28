import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBooks, createBook, updateBook, deleteBook } from "@/lib/api/books";
import type { Book, BookInsert } from "@/lib/api/books";
import { BookDialog } from "./BookDialog";
import { useToast } from "@/components/ui/use-toast";

const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (data: BookInsert) => {
    try {
      await createBook(data);
      await loadBooks();
      setDialogOpen(false);
      toast({
        title: "Success",
        description: "Book created successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create book",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBook = async (data: BookInsert) => {
    if (!editingBook) return;
    try {
      await updateBook(editingBook.id, data);
      await loadBooks();
      setDialogOpen(false);
      setEditingBook(null);
      toast({
        title: "Success",
        description: "Book updated successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update book",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id);
      await loadBooks();
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Book Catalog</h1>
          <Button
            className="flex items-center gap-2"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>

        <div className="flex gap-4">
          <Input
            className="max-w-sm"
            placeholder="Search books..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <img
                src={
                  book.cover_image ||
                  `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600`
                }
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  SKU: {book.sku}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <Badge>{book.category}</Badge>
                  <span className="font-semibold">${book.price}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setEditingBook(book);
                      setDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <BookDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
          initialData={editingBook || undefined}
          mode={editingBook ? "edit" : "create"}
        />
      </div>
    </DashboardLayout>
  );
};

export default CatalogPage;
