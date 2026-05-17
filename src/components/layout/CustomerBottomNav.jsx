import { Link, useLocation } from "react-router-dom";

const CustomerBottomNav = () => {
    const location = useLocation();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface shadow-[0px_-4px_20px_rgba(45,52,54,0.08)] rounded-t-xl">
            <Link to="/" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 ${location.pathname === '/' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low transition-colors'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
                <span className="font-label-bold text-caption mt-1">Home</span>
            </Link>
            <Link to="/checkout" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 cursor-pointer ${location.pathname === '/checkout' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low transition-colors'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/checkout' ? { fontVariationSettings: "'FILL' 1" } : {}}>restaurant</span>
                <span className="font-label-bold text-caption mt-1">Order</span>
            </Link>
            <Link to="/booking" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 cursor-pointer ${location.pathname === '/booking' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low transition-colors'}`}>
                <span className="material-symbols-outlined" style={location.pathname === '/booking' ? { fontVariationSettings: "'FILL' 1" } : {}}>event_seat</span>
                <span className="font-label-bold text-caption mt-1">Book</span>
            </Link>
            <Link to="/admin" className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-full cursor-pointer">
                <span className="material-symbols-outlined">person</span>
                <span className="font-label-bold text-caption mt-1">Profile</span>
            </Link>
        </nav>
    );
};

export default CustomerBottomNav;
