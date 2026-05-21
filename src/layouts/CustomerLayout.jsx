import { Outlet } from "react-router-dom";
import CustomerTopNav from "../components/layout/CustomerTopNav";
import CustomerFooter from "../components/layout/CustomerFooter";
import CustomerBottomNav from "../components/layout/CustomerBottomNav";

const CustomerLayout = () => {
    return (
        <div className="relative flex flex-col min-h-screen bg-background">
            <div
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(194,94,48,0.12),transparent),linear-gradient(to_bottom,var(--color-surface-container-low),var(--color-background))]"
                aria-hidden
            />

            <CustomerTopNav />

            <main className="flex-grow w-full container-max-width mx-auto">
                <Outlet />
            </main>

            <CustomerFooter />
            <CustomerBottomNav />
        </div>
    );
};

export default CustomerLayout;
