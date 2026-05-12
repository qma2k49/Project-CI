import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Input, message } from "antd";

const CustomerTopNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        <nav className="hidden md:flex sticky top-0 z-50 justify-between items-center w-full px-margin-desktop py-4 max-w-container-max-width mx-auto bg-surface shadow-[0px_4px_20px_rgba(45,52,54,0.08)]">
            <Link to="/" className="font-display-lg text-headline-md font-bold text-primary">The Discerning Host</Link>
            <ul className="flex items-center gap-8">
                <li className="text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer">
                    <Link to="/">Menu</Link>
                </li>
                <li className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer">
                    <Link to="/booking">Reservations</Link>
                </li>
                <li className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer">Promos</li>
                <li className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer">Settings</li>
            </ul>
            <div className="flex items-center gap-4 text-primary">
                <Link to="/checkout">
                    <span className="material-symbols-outlined cursor-pointer hover:text-primary-container transition-colors duration-200">shopping_cart</span>
                </Link>
                <span className="material-symbols-outlined cursor-pointer hover:text-primary-container transition-colors duration-200">notifications</span>
                
                <span 
                    onClick={showModal}
                    className="font-body-md text-primary font-semibold cursor-pointer hover:text-primary-container transition-colors duration-200 border border-primary px-3 py-1 rounded-md"
                >
                    Bạn là admin?
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
