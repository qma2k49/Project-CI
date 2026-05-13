import { Search, ChevronDown, Users, Edit2, LayoutTemplate } from "lucide-react";

// Dữ liệu giả định dựa trên hình ảnh
const tablesData = [
    { id: 'T-01', capacity: 4, status: 'Trống' },
    { id: 'T-02', capacity: 2, status: 'Đang phục vụ' },
    { id: 'T-03', capacity: 6, status: 'Đã đặt', time: '7:30 PM' },
    { id: 'T-04', capacity: 2, status: 'Trống' },
];

const AdminTablesPage = () => {
    return (
        <div className="font-body-md pb-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản Lý Bàn & Thực Đơn</h1>
                    <p className="text-gray-500">Cài đặt và tuỳ chỉnh danh sách Bàn ăn và Món ăn của nhà hàng.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                        />
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
                <button className="text-[#C25E30] font-semibold pb-3 border-b-2 border-[#C25E30]">
                    Quản lý Bàn
                </button>
                <button className="text-gray-500 font-medium pb-3 hover:text-gray-700 transition-colors">
                    Quản lý Thực đơn
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#D2691E]"></span> Trống
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-200"></span> Đã đặt
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-800"></span> Đang phục vụ
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <span className="text-gray-400">Khu vực:</span>
                    <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                        Khu chung <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tablesData.map((table) => {
                    let borderTopColor = '';
                    let actionButton = null;
                    let iconColor = 'text-gray-700';

                    if (table.status === 'Trống') {
                        borderTopColor = 'border-[#D2691E]'; // Cam đất
                        iconColor = 'text-[#C25E30]';
                        actionButton = (
                            <button className="w-full mt-6 bg-[#FDF0E9] text-[#C25E30] py-2 rounded-lg font-semibold hover:bg-[#FCE5D8] transition-colors text-sm">
                                Xếp bàn
                            </button>
                        );
                    } else if (table.status === 'Đang phục vụ') {
                        borderTopColor = 'border-[#8B5A2B]'; // Nâu đen nhẹ (như ảnh)
                        actionButton = (
                            <button className="w-full mt-6 bg-[#FDF8F5] border border-[#EEDFCC] text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-[#FAEBD7] transition-colors text-sm flex justify-between items-center">
                                Đang phục vụ
                                <Edit2 size={14} className="text-gray-600" />
                            </button>
                        );
                    } else if (table.status === 'Đã đặt') {
                        borderTopColor = 'border-blue-200'; // Xanh nhạt
                        actionButton = (
                            <div className="w-full mt-6 flex gap-2">
                                <button className="flex-1 bg-[#F0F7FF] text-[#2B6CB0] py-2 rounded-lg font-semibold hover:bg-[#EBF4FF] transition-colors text-sm">
                                    Đã đặt
                                </button>
                                <div className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center">
                                    {table.time}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={table.id} className={`bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden border-t-4 ${borderTopColor} flex flex-col items-center p-6 pt-8`}>
                            <LayoutTemplate size={44} strokeWidth={1.5} className={iconColor} />
                            <h3 className="text-2xl font-bold mt-4 text-gray-900">{table.id}</h3>
                            <p className="text-gray-500 flex items-center gap-2 mt-1 text-xs font-medium">
                                <Users size={14} /> {table.capacity} Chỗ
                            </p>
                            {actionButton}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminTablesPage;
