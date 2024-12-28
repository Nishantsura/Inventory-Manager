import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import InventoryPage from "./components/inventory/InventoryPage";
import OrdersPage from "./components/orders/OrdersPage";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import CatalogPage from "./components/catalog/CatalogPage";
import UsersPage from "./components/users/UsersPage";
import SettingsPage from "./components/settings/SettingsPage";
import StoresPage from "./components/stores/StoresPage";
import ReportsPage from "./components/reports/ReportsPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
