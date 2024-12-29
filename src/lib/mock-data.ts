export const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    sku: "TGG-FIC-4321",
    category: "fiction",
    price: 9.99,
    description: "A story of decadence and excess.",
    publisher: "Scribner",
    publication_date: "2004-09-30",
    cover_image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    sku: "TKM-FIC-8765",
    category: "fiction",
    price: 12.99,
    description: "A classic of modern American literature.",
    publisher: "Grand Central Publishing",
    publication_date: "1988-10-11",
    cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockStores = [
  {
    id: "1",
    name: "Downtown Branch",
    address: "123 Main St, City",
    status: "active",
    manager_id: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Suburban Store",
    address: "456 Oak Ave, Suburb",
    status: "active",
    manager_id: "2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "manager",
    store_id: "1",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "staff",
    store_id: "2",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Inventory Data
export const mockInventory = [
  {
    id: "1",
    book_id: "1",
    store_id: "1",
    quantity: 150,
    min_stock_level: 20,
    max_stock_level: 200,
    status: "in_stock",
    last_restock_date: "2024-03-15",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    book_id: "2",
    store_id: "1",
    quantity: 15,
    min_stock_level: 25,
    max_stock_level: 150,
    status: "low_stock",
    last_restock_date: "2024-03-10",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Sales Analytics Data
export const mockSalesData = {
  today: {
    total: 2547.99,
    orders: 32,
    averageOrder: 79.62,
    percentChange: 12.5,
  },
  monthlyTrends: [
    { month: "Jan", sales: 4000, orders: 120 },
    { month: "Feb", sales: 3500, orders: 90 },
    { month: "Mar", sales: 4500, orders: 150 },
    { month: "Apr", sales: 3780, orders: 110 },
    { month: "May", sales: 4890, orders: 180 },
    { month: "Jun", sales: 5390, orders: 200 },
  ],
  categoryDistribution: [
    { name: "Fiction", value: 35, sales: 12500 },
    { name: "Non-Fiction", value: 25, sales: 8900 },
    { name: "Children's", value: 20, sales: 7200 },
    { name: "Academic", value: 15, sales: 5400 },
    { name: "Other", value: 5, sales: 1800 },
  ],
  hourlyTrends: [
    { hour: "00:00", sales: 120 },
    { hour: "03:00", sales: 80 },
    { hour: "06:00", sales: 150 },
    { hour: "09:00", sales: 450 },
    { hour: "12:00", sales: 650 },
    { hour: "15:00", sales: 550 },
    { hour: "18:00", sales: 480 },
    { hour: "21:00", sales: 250 },
  ],
};
