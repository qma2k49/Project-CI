import { CalendarDays, Clock, Users, Check, ArrowRight, LayoutTemplate } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCart } from "../contexts/CartContext";

const tables = [
    { id: 'T1', label: 'T1', zone: 'Cạnh cửa sổ', status: 'available', shape: 'rounded-full' },
    { id: 'T2', label: 'T2', zone: 'Cạnh cửa sổ', status: 'occupied', shape: 'rounded-full' },
    { id: 'T3', label: 'T3', zone: 'Cạnh cửa sổ', status: 'available', shape: 'rounded-full' },
    { id: 'M1', label: 'M1', zone: 'Trong nhà', status: 'available', shape: 'rounded-md' },
    { id: 'M2', label: 'M2', zone: 'Trong nhà', status: 'available', shape: 'rounded-md' },
    { id: 'M3', label: 'M3', zone: 'Trong nhà', status: 'occupied', shape: 'rounded-full' }
];

const BookingPage = () => {
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [selectedTime, setSelectedTime] = useState(() => {
        return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    });
    const [guests, setGuests] = useState(4);
    const selectedDateFormatted = selectedDate
        ? new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
        : '';
    const navigate = useNavigate();
    const { setTableReservation } = useCart();

    useEffect(() => {
        const updateTime = () => setSelectedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
        // Update immediately, then every minute
        updateTime();
        const id = setInterval(updateTime, 60 * 1000);
        return () => clearInterval(id);
    }, []);

    const handleTableClick = (table) => {
        if (table.status === 'available') {
            setSelectedTableId(table.id);
        }
    };

    const handleConfirm = () => {
        if (!selectedTableId) {
            message.warning("Vui lòng chọn một bàn trống trước khi tiếp tục!");
            return;
        }

        const table = tables.find(t => t.id === selectedTableId);
        const now = new Date();
        const dateObj = selectedDate ? new Date(selectedDate) : null;
        const dateFormatted = dateObj
            ? dateObj.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
            : '';

        setTableReservation({
            ...table,
            date: dateFormatted || '—',
            time: selectedTime,
            guests: `${guests} Người lớn`,
            reservationDateTimeISO: selectedDate ? `${selectedDate}T${selectedTime}:00` : null,
            createdAt: now.toISOString(),
            createdAtFormatted: now.toLocaleString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        });

        message.success(`Đã chọn thành công Bàn ${table.label}!`);
        navigate('/checkout');
    };

    const handleBack = () => {
        navigate('/');
    }

    const selectedTable = tables.find(t => t.id === selectedTableId);
    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Đặt bàn trực tuyến</h1>
                <p className="text-gray-500">Tận hưởng trải nghiệm ẩm thực tinh tế. Vui lòng hoàn tất các bước bên dưới.</p>
            </div>


            {/* Main Content */}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Table Map */}
                <div className="lg:w-2/3 bg-white rounded-2xl p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sơ đồ bàn ăn</h2>

                    {/* Legend */}
                    <div className="flex items-center gap-6 mb-8 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-gray-300 bg-white"></span> Trống
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#F2E3D8]"></span> Đã đặt
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#C25E30]"></span> Đang chọn
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="w-full border-2 border-dashed border-[#F2E3D8] rounded-xl p-8 bg-[#FDF8F5] relative min-h-[400px]">

                        {/* Zone 1: Window */}
                        <div className="mb-12 relative border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-between">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 font-bold tracking-widest text-sm z-0">KHU VỰC CẠNH CỬA SỔ</div>

                            {tables.slice(0, 3).map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => handleTableClick(t)}
                                    className={`w-16 h-16 flex items-center justify-center font-bold shadow-sm z-10 transition-colors ${t.shape}
                                        ${t.status === 'occupied' ? 'bg-[#F2E3D8] text-[#8B5A2B] cursor-not-allowed opacity-80' :
                                            selectedTableId === t.id ? 'bg-[#C25E30] text-white ring-4 ring-[#F2E3D8] cursor-pointer' :
                                                'bg-white border border-gray-300 text-gray-700 cursor-pointer hover:border-[#C25E30]'}
                                    `}
                                >
                                    {t.label}
                                </div>
                            ))}
                        </div>

                        {/* Zone 2: Indoor */}
                        <div className="relative border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center gap-8">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 font-bold tracking-widest text-sm z-0 text-center">KHU VỰC TRONG NHÀ</div>

                            <div className="w-full flex justify-between px-8 z-10">
                                {tables.slice(3, 5).map(t => (
                                    <div
                                        key={t.id}
                                        onClick={() => handleTableClick(t)}
                                        className={`w-16 h-16 flex items-center justify-center font-bold shadow-sm transition-colors ${t.shape}
                                            ${t.status === 'occupied' ? 'bg-[#F2E3D8] text-[#8B5A2B] cursor-not-allowed opacity-80' :
                                                selectedTableId === t.id ? 'bg-[#C25E30] text-white ring-4 ring-[#F2E3D8] cursor-pointer' :
                                                    'bg-white border border-gray-300 text-gray-700 cursor-pointer hover:border-[#C25E30]'}
                                        `}
                                    >
                                        {t.label}
                                    </div>
                                ))}
                            </div>

                            {(() => {
                                const t = tables[5];
                                return (
                                    <div
                                        onClick={() => handleTableClick(t)}
                                        className={`w-16 h-16 flex items-center justify-center font-bold shadow-sm z-10 transition-colors ${t.shape}
                                            ${t.status === 'occupied' ? 'bg-[#F2E3D8] text-[#8B5A2B] cursor-not-allowed opacity-80' :
                                                selectedTableId === t.id ? 'bg-[#C25E30] text-white ring-4 ring-[#F2E3D8] cursor-pointer' :
                                                    'bg-white border border-gray-300 text-gray-700 cursor-pointer hover:border-[#C25E30]'}
                                        `}
                                    >
                                        {t.label}
                                    </div>
                                );
                            })()}
                        </div>

                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#EEDFCC]">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">Tóm tắt Đặt bàn</h2>

                        <div className="space-y-6 mb-8">
                            <div className="flex gap-4 items-start">
                                <CalendarDays className="text-gray-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Ngày</p>
                                    <p className="font-bold text-gray-900">{selectedDateFormatted}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Clock className="text-gray-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Giờ</p>
                                    <p className="font-bold text-gray-900">{selectedTime}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Users className="text-gray-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Số lượng khách</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value) || "")}
                                        className="font-bold text-gray-900 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#C25E30]"
                                    />
                                </div>
                            </div>
                        </div>

                        {selectedTable ? (
                            <div className="bg-[#FDF0E9] rounded-xl p-4 flex gap-4 items-center mb-8 border border-[#F2E3D8] transition-all">
                                <LayoutTemplate className="text-[#C25E30]" size={24} />
                                <div>
                                    <p className="text-sm text-[#C25E30] font-medium mb-1">Bàn đang chọn</p>
                                    <p className="font-bold text-[#8B3A00]">Bàn {selectedTable.label} ({selectedTable.zone})</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-4 flex gap-4 items-center mb-8 border border-gray-200 transition-all">
                                <LayoutTemplate className="text-gray-400" size={24} />
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Chưa chọn bàn</p>
                                    <p className="font-medium text-gray-400 text-sm">Vui lòng click vào sơ đồ</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 mt-auto">
                            <button
                                onClick={handleConfirm}
                                className="w-full bg-[#C25E30] hover:bg-orange-800 text-white py-3.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                Tiếp tục Xác nhận <ArrowRight size={18} />
                            </button>
                            <button onClick={handleBack} className="w-full bg-white border border-[#C25E30] text-[#C25E30] hover:bg-orange-50 py-3.5 rounded-lg font-bold transition-colors">
                                Quay lại Trang Chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
