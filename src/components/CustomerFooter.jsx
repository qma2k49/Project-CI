import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const CustomerFooter = () => {
    return (
        <footer className="mt-auto w-full border-t border-outline-variant/30 bg-surface-container-lowest/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary font-bold text-sm">
                                DH
                            </span>
                            <span className="font-bold text-lg text-on-background">The Discerning Host</span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
                            Không gian ẩm thực tinh tế — nơi hương vị, dịch vụ và trải nghiệm hòa quyện.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-on-background mb-4 text-sm uppercase tracking-wider">Khám phá</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">
                                    Thực đơn
                                </Link>
                            </li>
                            <li>
                                <Link to="/booking" className="text-on-surface-variant hover:text-primary transition-colors">
                                    Đặt bàn
                                </Link>
                            </li>
                            <li>
                                <Link to="/promos" className="text-on-surface-variant hover:text-primary transition-colors">
                                    Khuyến mãi
                                </Link>
                            </li>
                            <li>
                                <Link to="/checkout" className="text-on-surface-variant hover:text-primary transition-colors">
                                    Giỏ hàng
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-on-background mb-4 text-sm uppercase tracking-wider">Liên hệ</h4>
                        <ul className="space-y-3 text-sm text-on-surface-variant">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                                123 Đại lộ Ẩm Thực, Q.1, TP.HCM
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-primary shrink-0" />
                                +84 28 3456 7890
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-primary shrink-0" />
                                hello@discerninghost.vn
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/25 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant">
                    <span>© {new Date().getFullYear()} The Discerning Host. All rights reserved.</span>
                    <div className="flex gap-6">
                        <button type="button" className="hover:text-primary transition-colors">Chính sách</button>
                        <button type="button" className="hover:text-primary transition-colors">Điều khoản</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CustomerFooter;
