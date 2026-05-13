import { SlidersHorizontal, Calendar, ChevronDown, User, Phone, Users, UtensilsCrossed, Settings, Clock, Contact, Save } from 'lucide-react';

const AdminOrdersPage = () => {
    return (
        <div className="font-body-md pb-12 text-gray-800">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Đơn hàng</h1>
                <p className="text-gray-600">Theo dõi và quản lý đặt bàn cùng các đơn gọi món trước.</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold">
                    <SlidersHorizontal size={20} />
                    <span>Bộ lọc</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Date Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="dd/mm/yyyy"
                                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-500 text-sm"
                            />
                            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                        <div className="relative">
                            <select className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-500 text-sm appearance-none bg-white">
                                <option>Tất cả trạng thái</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    {/* Order Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Loại đơn</label>
                        <div className="relative">
                            <select className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg outline-none focus:border-orange-500 text-sm appearance-none bg-white">
                                <option>Tất cả loại đơn</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Xoá bộ lọc
                    </button>
                </div>
            </div>

            {/* Order Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Card 1: Pending */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="flex flex-1">
                        {/* Left colored border */}
                        <div className="w-1.5 bg-[#F5A623] flex-shrink-0"></div>
                        <div className="flex-1 p-6 flex flex-col">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-[#FFF8E7] text-[#D89016] text-xs font-semibold px-3 py-1 rounded-full border border-[#FBE6B8]">
                                    Chờ xác nhận
                                </span>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900 text-sm">Hôm nay, 19:30</div>
                                    <div className="text-xs text-gray-500">Dùng tại quán</div>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Bàn 04</h3>
                                <span className="text-sm text-gray-500">#ORD-892</span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-gray-400" /> Nguyen Van A
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" /> 090 123 4567
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" /> 4 Khách
                                </div>
                            </div>

                            <div className="border-t border-gray-100 py-4 flex-1">
                                <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-sm">
                                    <UtensilsCrossed size={16} className="text-gray-600" /> Thực đơn đặt trước
                                </div>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    <li className="flex justify-between">
                                        <span>2x Bò bít tết Wagyu Ribeye</span>
                                        <span className="font-medium">$120</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>1x Cơm Ý nấm Truffle</span>
                                        <span className="font-medium">$28</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>1x Salad Caesar (GF)</span>
                                        <span className="font-medium">$16</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                                <span className="font-bold text-[#C25E30]">Tổng tạm tính.</span>
                                <span className="font-bold text-lg text-[#C25E30]">$164</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <button className="py-2.5 rounded-lg border border-[#C25E30] text-[#C25E30] font-semibold text-sm hover:bg-[#FDF0E9] transition-colors">
                                    Hủy đơn
                                </button>
                                <button className="py-2.5 rounded-lg bg-[#964B00] text-white font-semibold text-sm hover:bg-[#7A3D00] transition-colors">
                                    Hoàn tất đơn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Confirmed */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="flex flex-1">
                        {/* Left colored border */}
                        <div className="w-1.5 bg-[#A0522D] flex-shrink-0"></div>
                        <div className="flex-1 p-6 flex flex-col">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-[#FDF0E9] text-[#A0522D] text-xs font-semibold px-3 py-1 rounded-full border border-[#FCE5D8]">
                                    Đã xác nhận
                                </span>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900 text-sm">Hôm nay, 20:00</div>
                                    <div className="text-xs text-gray-500">Dùng tại quán (VIP)</div>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Bàn 12</h3>
                                <span className="text-sm text-gray-500">#ORD-891</span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-gray-400" /> Tran Thi B
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" /> 091 987 6543
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" /> 2 Khách
                                </div>
                            </div>

                            <div className="border-t border-gray-100 py-4 flex-1">
                                <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-sm">
                                    <UtensilsCrossed size={16} className="text-gray-600" /> Thực đơn đặt trước
                                </div>
                                <div className="text-sm text-gray-800 italic mb-2 font-medium">Thực đơn nếm thử của Bếp trưởng x2</div>
                                <ul className="space-y-2 text-sm text-gray-600 pl-4 border-l-2 border-gray-100 ml-1">
                                    <li>Món khai vị (Amuse-Bouche)</li>
                                    <li>Sò điệp áp chảo</li>
                                    <li>Ức vịt</li>
                                    <li>Bánh Fondant Socola</li>
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                                <span className="font-bold text-[#C25E30]">Tổng tạm tính.</span>
                                <span className="font-bold text-lg text-[#C25E30]">$240</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <button className="py-2.5 rounded-lg border border-[#C25E30] text-[#C25E30] font-semibold text-sm hover:bg-[#FDF0E9] transition-colors">
                                    Hủy đơn
                                </button>
                                <button className="py-2.5 rounded-lg bg-[#964B00] text-white font-semibold text-sm hover:bg-[#7A3D00] transition-colors">
                                    Hoàn tất đơn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Restaurant Settings Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8 text-gray-900 font-bold text-2xl">
                    <Settings className="text-[#C25E30]" size={28} />
                    <span>Cài đặt Nhà hàng</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Operating Hours */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-[#FAFAFA]">
                        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-6 text-lg">
                            <Clock size={20} className="text-gray-600" /> Giờ mở cửa
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-gray-600">Ngày thường</span>
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="relative flex-1">
                                        <input type="text" defaultValue="11:00 AM" className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm outline-none bg-white focus:border-orange-500" />
                                        <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <span className="text-gray-400">-</span>
                                    <div className="relative flex-1">
                                        <input type="text" defaultValue="10:30 PM" className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm outline-none bg-white focus:border-orange-500" />
                                        <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-gray-600">Cuối tuần</span>
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="relative flex-1">
                                        <input type="text" defaultValue="10:00 AM" className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm outline-none bg-white focus:border-orange-500" />
                                        <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <span className="text-gray-400">-</span>
                                    <div className="relative flex-1">
                                        <input type="text" defaultValue="11:00 PM" className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm outline-none bg-white focus:border-orange-500" />
                                        <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-[#FAFAFA]">
                        <div className="flex items-center gap-2 font-semibold text-gray-900 mb-6 text-lg">
                            <Contact size={20} className="text-gray-600" /> Thông tin liên hệ
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Địa chỉ quán</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 bg-white min-h-[80px]"
                                    defaultValue="123 Culinary Boulevard, Fine Dining District, City"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Số điện thoại Hotline</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 bg-white"
                                    defaultValue="1900 8888"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 bg-[#2D2A26] hover:bg-[#1A1816] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <Save size={18} /> Lưu Cài Đặt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
