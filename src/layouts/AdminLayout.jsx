import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-margin-desktop w-full max-w-[1600px] mx-auto pb-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
