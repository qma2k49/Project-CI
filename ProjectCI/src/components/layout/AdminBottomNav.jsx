import { Link, useLocation } from "react-router-dom";

const AdminBottomNav = () => {
    const location = useLocation();

    return (
        <nav className="bg-surface dark:bg-surface-dim shadow-[0px_-4px_20px_rgba(45,52,54,0.08)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe md:hidden rounded-t-xl">
            <Link to="/admin" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${location.pathname === '/admin' ? 'bg-primary-container text-on-primary-container scale-90' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/admin' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                <span className="font-label-bold text-caption mt-1">Dash</span>
            </Link>
            <Link to="/admin/orders" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${location.pathname === '/admin/orders' ? 'bg-primary-container text-on-primary-container scale-90' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/admin/orders' ? { fontVariationSettings: "'FILL' 1" } : {}}>restaurant_menu</span>
                <span className="font-label-bold text-caption mt-1">Orders</span>
            </Link>
            <Link to="/admin/tables" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${location.pathname === '/admin/tables' ? 'bg-primary-container text-on-primary-container scale-90' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/admin/tables' ? { fontVariationSettings: "'FILL' 1" } : {}}>table_restaurant</span>
                <span className="font-label-bold text-caption mt-1">Tables</span>
            </Link>
            <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-full cursor-pointer">
                <span className="material-symbols-outlined">person</span>
                <span className="font-label-bold text-caption mt-1">Profile</span>
            </Link>
        </nav>
    );
};

export default AdminBottomNav;
