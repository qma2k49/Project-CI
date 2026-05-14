import { CalendarIcon, Plus, Minus } from "lucide-react";

const cartItems = [
    {
        id: 1,
        title: "Sò điệp áp chảo sốt đậu Hà Lan",
        category: "Khai vị",
        price: "350.000đ",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 2,
        title: "Thăn ngoại bò Wagyu (200g)",
        category: "Món chính • Medium Rare",
        price: "1.250.000đ",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
];

const CheckoutPage = () => {
    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Giỏ hàng & Xác nhận</h1>
                <p className="text-gray-500">Vui lòng kiểm tra lại đơn hàng và điền thông tin để hoàn tất.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left Column */}
                <div className="lg:w-2/3 space-y-8 w-full">
                    
                    {/* Cart Items Block */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Danh sách món ăn</h2>
                        
                        <div className="space-y-8">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`${index !== 0 ? 'pt-8 border-t border-gray-100' : ''}`}>
                                    <div className="flex gap-4 sm:gap-6 items-start">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-sm" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                                                </div>
                                                <span className="text-[#C25E30] font-bold sm:text-lg">{item.price}</span>
                                            </div>
                                            
                                            <div className="mt-4">
                                                <div className="inline-flex items-center bg-[#FDF0E9] rounded-full border border-[#F2E3D8] px-2 py-1 mb-3">
                                                    <button className="w-6 h-6 flex items-center justify-center text-[#C25E30] hover:bg-[#FCE5D8] rounded-full transition-colors">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                                                    <button className="w-6 h-6 flex items-center justify-center text-[#C25E30] hover:bg-[#FCE5D8] rounded-full transition-colors">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                
                                                <input 
                                                    type="text" 
                                                    placeholder="Thêm ghi chú (VD: Không hành, ít cay...)" 
                                                    className="w-full bg-[#FDF8F5] border border-[#F2E3D8] rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Info Form */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Thông tin khách hàng</h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Họ và Tên</label>
                                <input 
                                    type="text" 
                                    placeholder="VD: Nguyễn Văn A" 
                                    className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Số điện thoại</label>
                                    <input 
                                        type="tel" 
                                        placeholder="090 123 4567" 
                                        className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Email (Tùy chọn)</label>
                                    <input 
                                        type="email" 
                                        placeholder="example@email.com" 
                                        className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Yêu cầu đặc biệt cho nhà hàng</label>
                                <textarea 
                                    rows="4"
                                    placeholder="Ghi chú về vị trí bàn, dị ứng, hoặc các yêu cầu khác..." 
                                    className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:w-1/3 w-full">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng hóa đơn</h2>
                        
                        <div className="space-y-4 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between items-center">
                                <span>Tạm tính (3 món)</span>
                                <span className="font-semibold text-gray-900">1.950.000đ</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Phí dịch vụ (5%)</span>
                                <span className="font-semibold text-gray-900">97.500đ</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>VAT (8%)</span>
                                <span className="font-semibold text-gray-900">156.000đ</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-gray-100 pt-6 mb-8">
                            <span className="text-xl font-bold text-gray-900">Tổng cộng</span>
                            <span className="text-2xl font-bold text-[#C25E30]">2.203.500đ</span>
                        </div>

                        <button className="w-full bg-[#C25E30] hover:bg-orange-800 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mb-4">
                            <CalendarIcon size={18} /> Xác nhận đặt bàn & Món
                        </button>

                        <p className="text-center text-xs text-gray-500">
                            Bằng việc xác nhận, bạn đồng ý với <a href="#" className="text-[#C25E30] hover:underline">Điều khoản dịch vụ</a> của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
