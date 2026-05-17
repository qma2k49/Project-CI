import { Outlet } from "react-router-dom";
import CustomerTopNav from "../components/layout/CustomerTopNav";
import CustomerFooter from "../components/layout/CustomerFooter";

const CustomerLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <CustomerTopNav />

            <main className="flex-grow w-full max-w-container-max-width mx-auto pb-0">
                <Outlet />
            </main>

            <CustomerFooter />
        </div>
    );
};

export default CustomerLayout;
