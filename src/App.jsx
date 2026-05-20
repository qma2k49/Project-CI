import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import PromosPage from "./pages/PromosPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTablesPage from "./pages/AdminTablesPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminRoute from "./components/AdminRoute";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomerLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="booking" element={<BookingPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="promos" element={<PromosPage />} />
                    </Route>

                    <Route path="/admin" element={<AdminRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="tables" element={<AdminTablesPage />} />
                            <Route path="orders" element={<AdminOrdersPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
};

export default App;