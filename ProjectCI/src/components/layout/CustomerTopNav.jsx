import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal, Input, message } from "antd";
import { ShoppingCart, Bell } from "lucide-react";

const CustomerTopNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setPassword("");
    };

    const handleOk = () => {
        if (password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            message.success("Đăng nhập thành công!");
            setIsModalOpen(false);
            setPassword("");
            navigate("/admin");
        } else {
            message.error("Mật khẩu không đúng!");
        }
    };

    return (
        <nav className="flex sticky top-0 z-50 justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto bg-[#FAF9F6] border-b border-gray-200">
            <Link to="/" className="text-xl md:text-2xl font-bold text-[#C25E30]">The Discerning Host</Link>
            <ul className="hidden md:flex items-center gap-8">
                <li className={`cursor-pointer transition-colors duration-200 ${location.pathname === '/' ? 'text-[#C25E30] font-bold border-b-2 border-[#C25E30] pb-1' : 'text-gray-500 font-medium hover:text-[#C25E30]'}`}>
                    <Link to="/">Menu</Link>
                </li>
                <li className={`cursor-pointer transition-colors duration-200 ${location.pathname === '/booking' ? 'text-[#C25E30] font-bold border-b-2 border-[#C25E30] pb-1' : 'text-gray-500 font-medium hover:text-[#C25E30]'}`}>
                    <Link to="/booking">Reservations</Link>
                </li>
                <li className="text-gray-500 font-medium hover:text-[#C25E30] transition-colors duration-200 cursor-pointer">Promos</li>
                <li className="text-gray-500 font-medium hover:text-[#C25E30] transition-colors duration-200 cursor-pointer">Settings</li>
            </ul>
            <div className="flex items-center gap-5 text-[#C25E30]">
                <Link to="/checkout" className="hover:text-orange-700 transition-colors">
                    <ShoppingCart size={22} />
                </Link>
                <button className="hover:text-orange-700 transition-colors relative">
                    <Bell size={22} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>


                <span
                    onClick={showModal}
                    className="text-xs md:text-sm font-semibold cursor-pointer hover:bg-orange-50 transition-colors duration-200 border border-[#C25E30] px-2 py-1 rounded-md"
                >
                    Admin?
                </span>

                <Modal
                    title="Xác thực Admin"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <div className="py-4">
                        <Input.Password
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onPressEnter={handleOk}
                        />
                    </div>
                </Modal>
            </div>
        </nav>
    );
};

export default CustomerTopNav;
