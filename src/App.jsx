import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import CustomerLayout from "./layouts/CustomerLayout";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import PromosPage from "./pages/PromosPage";
import { CartProvider } from "./contexts/CartContext";

const antdTheme = {
    token: {
        colorPrimary: '#C25E30',
        colorLink: '#C25E30',
        borderRadius: 12,
        fontFamily: "'Inter', system-ui, sans-serif",
        colorBgContainer: '#ffffff',
        colorBgLayout: '#fff8f6',
    },
    components: {
        Button: { controlHeight: 40, fontWeight: 600 },
        Input: { controlHeight: 44 },
        Card: { borderRadiusLG: 16 },
    },
};

const App = () => {
    return (
        <ConfigProvider theme={antdTheme}>
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomerLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="booking" element={<BookingPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="promos" element={<PromosPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
        </ConfigProvider>
    );
};

export default App;