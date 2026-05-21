import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal, Input, Badge, Button } from "antd";
import { ShoppingCart, UtensilsCrossed, CalendarDays, Tag, Shield } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

const NAV_ITEMS = [
    { to: "/", label: "Thực đơn", icon: UtensilsCrossed },
    { to: "/booking", label: "Đặt bàn", icon: CalendarDays },
    { to: "/promos", label: "Khuyến mãi", icon: Tag },
];

const CustomerTopNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const handleOk = () => {
        if (password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            Modal.success({ title: "Đăng nhập thành công", content: "Chuyển đến trang quản trị." });
            setIsModalOpen(false);
            setPassword("");
            navigate("/admin");
        } else {
            Modal.error({ title: "Mật khẩu không đúng", content: "Vui lòng thử lại." });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
            <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-[4.25rem]">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 group"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary font-bold text-sm shadow-sm">
                        DH
                    </span>
                    <div className="hidden sm:block leading-tight">
                        <span className="block text-base font-bold text-on-background group-hover:text-primary transition-colors">
                            The Discerning Host
                        </span>
                        <span className="block text-[11px] text-on-surface-variant font-medium tracking-wide uppercase">
                            Fine Dining
                        </span>
                    </div>
                </Link>

                <ul className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20">
                    {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive(to)
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-on-surface-variant hover:text-primary hover:bg-white/60"
                                }`}
                            >
                                <Icon size={16} strokeWidth={2.25} />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Link to="/checkout" className="relative">
                        <Button
                            type="default"
                            shape="circle"
                            size="large"
                            icon={<ShoppingCart size={18} />}
                            className="!border-outline-variant/40 !shadow-sm hover:!border-primary hover:!text-primary"
                        />
                        {cartCount > 0 && (
                            <Badge
                                count={cartCount}
                                size="small"
                                className="absolute -top-1 -right-1"
                                style={{ boxShadow: "0 0 0 2px white" }}
                            />
                        )}
                    </Link>

                    <Button
                        type="text"
                        size="small"
                        icon={<Shield size={16} />}
                        onClick={() => setIsModalOpen(true)}
                        className="!text-on-surface-variant hover:!text-primary !font-medium hidden sm:inline-flex"
                    >
                        Admin
                    </Button>
                    <Button
                        type="text"
                        shape="circle"
                        icon={<Shield size={18} />}
                        onClick={() => setIsModalOpen(true)}
                        className="sm:!hidden !text-on-surface-variant"
                        aria-label="Admin"
                    />
                </div>
            </nav>

            <Modal
                title="Xác thực quản trị"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    setIsModalOpen(false);
                    setPassword("");
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                centered
                destroyOnClose
            >
                <p className="text-on-surface-variant text-sm mb-4">
                    Nhập mật khẩu để truy cập bảng điều khiển nhà hàng.
                </p>
                <Input.Password
                    placeholder="Mật khẩu admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onPressEnter={handleOk}
                    size="large"
                />
            </Modal>
        </header>
    );
};

export default CustomerTopNav;
