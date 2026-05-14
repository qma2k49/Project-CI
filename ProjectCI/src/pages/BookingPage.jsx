import { CalendarDays, Clock, Users, Check, ArrowRight, LayoutTemplate } from "lucide-react";

const BookingPage = () => {
    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Đặt bàn trực tuyến</h1>
                <p className="text-gray-500">Tận hưởng trải nghiệm ẩm thực tinh tế. Vui lòng hoàn tất các bước bên dưới.</p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-center max-w-3xl mx-auto mb-16 relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                    <div className="w-10 h-10 rounded-full bg-[#C25E30] text-white flex items-center justify-center font-bold mb-2 shadow-sm">
                        <Check size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">Thời gian & Khách</span>
                </div>
                {/* Line 1-2 */}
                <div className="absolute top-5 left-[16.6%] w-[33.3%] h-[3px] bg-[#C25E30] z-0"></div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                    <div className="w-10 h-10 rounded-full bg-[#C25E30] text-white flex items-center justify-center font-bold mb-2 shadow-sm ring-4 ring-orange-50">
                        2
                    </div>
                    <span className="text-sm font-bold text-[#C25E30]">Chọn vị trí bàn</span>
                </div>
                {/* Line 2-3 */}
                <div className="absolute top-5 right-[16.6%] w-[33.3%] h-[3px] bg-[#F2E3D8] z-0"></div>

                {/* Step 3 */}
                <div className="flex flex-col items-center relative z-10 w-1/3">
                    <div className="w-10 h-10 rounded-full bg-[#F8EFEA] text-gray-400 flex items-center justify-center font-bold mb-2">
                        3
                    </div>
                    <span className="text-sm font-medium text-gray-500">Xác nhận</span>
                </div>
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

                            <div className="w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 shadow-sm z-10 cursor-pointer hover:border-[#C25E30] transition-colors">
                                T1
                            </div>
                            <div className="w-16 h-16 rounded-full bg-[#F2E3D8] text-[#8B5A2B] flex items-center justify-center font-bold shadow-sm z-10 cursor-not-allowed opacity-80">
                                T2
                            </div>
                            <div className="w-16 h-16 rounded-full bg-[#C25E30] text-white flex items-center justify-center font-bold shadow-md z-10 ring-4 ring-[#F2E3D8] cursor-pointer">
                                T3
                            </div>
                        </div>

                        {/* Zone 2: Indoor */}
                        <div className="relative border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center gap-8">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 font-bold tracking-widest text-sm z-0 text-center">KHU VỰC TRONG NHÀ</div>

                            <div className="w-full flex justify-between px-8 z-10">
                                <div className="w-16 h-16 rounded-md bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 shadow-sm cursor-pointer hover:border-[#C25E30] transition-colors">
                                    M1
                                </div>
                                <div className="w-16 h-16 rounded-md bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 shadow-sm cursor-pointer hover:border-[#C25E30] transition-colors">
                                    M2
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-[#F2E3D8] text-[#8B5A2B] flex items-center justify-center font-bold shadow-sm z-10 cursor-not-allowed opacity-80">
                                M3
                            </div>
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
                                    <p className="font-bold text-gray-900">Thứ Sáu, 24 Tháng 11</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Clock className="text-gray-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Giờ</p>
                                    <p className="font-bold text-gray-900">19:30</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Users className="text-gray-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Số lượng khách</p>
                                    <p className="font-bold text-gray-900">4 Người lớn</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FDF0E9] rounded-xl p-4 flex gap-4 items-center mb-8 border border-[#F2E3D8]">
                            <LayoutTemplate className="text-[#C25E30]" size={24} />
                            <div>
                                <p className="text-sm text-[#C25E30] font-medium mb-1">Bàn đang chọn</p>
                                <p className="font-bold text-[#8B3A00]">Bàn T3 (Cạnh cửa sổ)</p>
                            </div>
                        </div>

                        <div className="space-y-3 mt-auto">
                            <button className="w-full bg-[#C25E30] hover:bg-orange-800 text-white py-3.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                                Tiếp tục Xác nhận <ArrowRight size={18} />
                            </button>
                            <button className="w-full bg-white border border-[#C25E30] text-[#C25E30] hover:bg-orange-50 py-3.5 rounded-lg font-bold transition-colors">
                                Quay lại Bước 1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
