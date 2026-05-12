import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    // Đọc trạng thái từ localStorage
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
