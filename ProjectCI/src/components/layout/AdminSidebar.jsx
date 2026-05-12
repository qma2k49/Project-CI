import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <nav className="bg-surface-container dark:bg-surface-container-highest border-r border-outline-variant h-screen w-64 fixed left-0 top-0 flex flex-col py-6 z-40 hidden md:flex">
            <div className="px-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md">
                        <span className="material-symbols-outlined icon-fill">restaurant</span>
                    </div>
                    <div>
                        <h1 className="font-display-lg text-headline-md font-bold text-primary">Admin Portal</h1>
                        <p className="font-caption text-caption text-on-surface-variant">Restaurant Manager</p>
                    </div>
                </div>
            </div>
            <div className="px-4 mb-6">
                <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 flex items-center justify-center gap-2 ambient-shadow">
                    <span className="material-symbols-outlined">add</span>
                    New Reservation
                </button>
            </div>
            <ul className="flex-1 space-y-1 overflow-y-auto px-2">
                {/* Active Tab: Dashboard */}
                <li>
                    <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${location.pathname === '/admin' ? 'text-primary font-bold bg-primary-fixed dark:bg-on-primary-fixed-variant translate-x-1' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={location.pathname === '/admin' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                        <span className="font-label-bold text-label-bold">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${location.pathname === '/admin/orders' ? 'text-primary font-bold bg-primary-fixed dark:bg-on-primary-fixed-variant translate-x-1' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={location.pathname === '/admin/orders' ? { fontVariationSettings: "'FILL' 1" } : {}}>restaurant_menu</span>
                        <span className="font-label-bold text-label-bold">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/tables" className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${location.pathname === '/admin/tables' ? 'text-primary font-bold bg-primary-fixed dark:bg-on-primary-fixed-variant translate-x-1' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined" style={location.pathname === '/admin/tables' ? { fontVariationSettings: "'FILL' 1" } : {}}>table_restaurant</span>
                        <span className="font-label-bold text-label-bold">Tables & Menu</span>
                    </Link>
                </li>
                <li>
                    <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 transition-all cursor-pointer">
                        <span className="material-symbols-outlined" data-icon="edit_note">edit_note</span>
                        <span className="font-label-bold text-label-bold">Menu Editor</span>
                    </a>
                </li>
                <li>
                    <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 transition-all cursor-pointer">
                        <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
                        <span className="font-label-bold text-label-bold">Analytics</span>
                    </a>
                </li>
            </ul>
            <div className="mt-auto px-2 border-t border-outline-variant pt-4 space-y-1">
                <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 transition-all cursor-pointer">
                    <span className="material-symbols-outlined" data-icon="help">help</span>
                    <span className="font-label-bold text-label-bold">Support</span>
                </a>
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 transition-all cursor-pointer">
                    <span className="material-symbols-outlined" data-icon="logout">logout</span>
                    <span className="font-label-bold text-label-bold">Logout</span>
                </Link>
            </div>
        </nav>
    );
};

export default AdminSidebar;
