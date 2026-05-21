import { Link, useLocation } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "../../contexts/CartContext";

const TABS = [
    { to: "/", label: "Menu", icon: "restaurant_menu" },
    { to: "/promos", label: "Ưu đãi", icon: "local_offer" },
    { to: "/booking", label: "Đặt bàn", icon: "event_seat" },
    { to: "/checkout", label: "Giỏ", icon: "shopping_cart", showBadge: true },
];

const CustomerBottomNav = () => {
    const location = useLocation();
    const { cartCount } = useCart();

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2 safe-area-pb">
            <div className="flex justify-around items-center max-w-lg mx-auto bg-white/90 backdrop-blur-xl border border-outline-variant/30 rounded-2xl shadow-[0_-4px_24px_rgba(38,25,18,0.08)] px-1 py-1.5">
                {TABS.map(({ to, label, icon, showBadge }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all duration-200 ${
                            isActive(to)
                                ? "text-primary bg-primary-container/25"
                                : "text-on-surface-variant hover:bg-surface-container-low"
                        }`}
                    >
                        <span
                            className="material-symbols-outlined text-[22px]"
                            style={isActive(to) ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {icon}
                        </span>
                        <span className="text-[10px] font-semibold">{label}</span>
                        {showBadge && cartCount > 0 && (
                            <Badge
                                count={cartCount}
                                size="small"
                                className="absolute top-0.5 right-[18%]"
                                style={{ boxShadow: "0 0 0 2px white" }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default CustomerBottomNav;
