import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

// Lazy load components
const Home = lazy(() => import("./components/home"));
const InventoryPage = lazy(
  () => import("./components/inventory/InventoryPage"),
);
const OrdersPage = lazy(() => import("./components/orders/OrdersPage"));
const PricingPage = lazy(() => import("./components/pricing/PricingPage"));
const AnalyticsPage = lazy(
  () => import("./components/analytics/AnalyticsPage"),
);
const CatalogPage = lazy(() => import("./components/catalog/CatalogPage"));
const UsersPage = lazy(() => import("./components/users/UsersPage"));
const SettingsPage = lazy(() => import("./components/settings/SettingsPage"));
const StoresPage = lazy(() => import("./components/stores/StoresPage"));
const ReportsPage = lazy(() => import("./components/reports/ReportsPage"));
const BulkUploadPage = lazy(
  () => import("./components/bulk-upload/BulkUploadPage"),
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/bulk-upload" element={<BulkUploadPage />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
    </Suspense>
  );
}

function ErrorBoundary() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <ErrorMessage message="Page not found or something went wrong. Please try again." />
    </div>
  );
}

export default App;
