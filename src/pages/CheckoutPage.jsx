import { useState, useEffect } from "react";
import { CalendarIcon, Plus, Minus, Tag, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import { useCart, calcPromoDiscount } from "../contexts/CartContext";

const OCCUPIED_TABLE_IDS_KEY = 'occupiedTableIds';

const markTablesAsOccupied = (tableIds) => {
    if (!tableIds?.length) return;
    try {
        const raw = localStorage.getItem(OCCUPIED_TABLE_IDS_KEY);
        const existing = raw ? JSON.parse(raw) : [];
        const occupied = new Set(existing);
        tableIds.forEach((id) => occupied.add(id));
        localStorage.setItem(OCCUPIED_TABLE_IDS_KEY, JSON.stringify([...occupied]));
    } catch (e) {
        console.error('Failed to mark tables occupied', e);
    }
};

const CheckoutPage = () => {
    const {
        cartItems,
        updateQuantity,
        cartCount,
        tableReservation,
        clearReservation,
        clearCart,
        appliedPromo,
        applyPromoCode,
        clearPromo,
    } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [promoInput, setPromoInput] = useState('');

    const reservationTables = tableReservation?.tables ?? (tableReservation ? [tableReservation] : []);
    const hasReservation = reservationTables.length > 0;

    useEffect(() => {
        const codeFromUrl = searchParams.get('code');
        if (!codeFromUrl) return;
        const result = applyPromoCode(codeFromUrl);
        if (result.ok) {
            message.success(`Đã áp mã ${result.promo.code}`);
        }
    }, [searchParams, applyPromoCode]);

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseInt(String(priceStr).replace(/\D/g, ''), 10) || 0;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(Math.max(0, Math.round(amount))) + 'đ';
    };

    const subtotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
    const promoDiscount = calcPromoDiscount(subtotal, appliedPromo);
    const discountedSubtotal = Math.max(0, subtotal - promoDiscount);
    const serviceFee = discountedSubtotal * 0.05;
    const vat = discountedSubtotal * 0.08;
    const total = discountedSubtotal + serviceFee + vat;

    const promoBelowMinSpend = appliedPromo && subtotal < appliedPromo.minSpend;
    const promoIsGift = appliedPromo?.type === 'gift';

    const handleApplyPromo = () => {
        const result = applyPromoCode(promoInput);
        if (result.ok) {
            message.success(`Đã áp mã ${result.promo.code} — ${result.promo.title}`);
            setPromoInput('');
        } else {
            message.warning(result.message);
        }
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0 && !hasReservation) {
            message.warning('Giỏ hàng và thông tin đặt bàn đều đang trống.');
            return;
        }

        if (promoBelowMinSpend) {
            message.warning(`Đơn tối thiểu ${formatCurrency(appliedPromo.minSpend)} để dùng mã ${appliedPromo.code}.`);
            return;
        }

        const order = {
            id: `ORD-${Date.now()}`,
            items: cartItems,
            table: tableReservation,
            promo: appliedPromo,
            promoDiscount,
            subtotal,
            discountedSubtotal,
            serviceFee,
            vat,
            total,
            createdAt: new Date().toISOString(),
        };

        try {
            const existing = JSON.parse(localStorage.getItem('orders') || '[]');
            existing.push(order);
            localStorage.setItem('orders', JSON.stringify(existing));
        } catch (e) {
            console.error('Failed to save order', e);
        }

        if (hasReservation) {
            markTablesAsOccupied(reservationTables.map((table) => table.id));
        }

        clearCart();
        clearReservation();

        message.success('Đặt bàn và món thành công!');
        navigate('/');
    };

    if (cartItems.length === 0 && !hasReservation) {
        return (
            <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h1>
                <p className="text-gray-500 mb-8">Hãy quay lại thực đơn để chọn những món ăn tuyệt vời nhé!</p>
                <Link to="/">
                    <button type="button" className="bg-[#C25E30] hover:bg-orange-800 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                        Xem thực đơn
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Giỏ hàng & Xác nhận</h1>
                <p className="text-gray-500">Vui lòng kiểm tra lại đơn hàng và điền thông tin để hoàn tất.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3 space-y-8 w-full">
                    {hasReservation && (
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FDF0E9] border border-[#F2E3D8] flex items-center justify-center text-[#C25E30] font-bold">B</div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bàn đã đặt</p>
                                        <p className="font-bold text-gray-900">
                                            {reservationTables.length > 1
                                                ? `Các bàn: ${reservationTables.map((table) => table.label).join(', ')}`
                                                : `Bàn ${reservationTables[0].label} • ${reservationTables[0].zone}`}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">{tableReservation.date} • {tableReservation.time} • {tableReservation.guests}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => clearReservation()}
                                    className="text-sm text-[#C25E30] font-medium hover:underline"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Danh sách món ăn</h2>
                        <div className="space-y-8">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`${index !== 0 ? 'pt-8 border-t border-gray-100' : ''}`}>
                                    <div className="flex gap-4 sm:gap-6 items-start">
                                        <img
                                            src={item.image && item.image !== '[URL]' ? item.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                            alt={item.title}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-sm"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-500">
                                                        {item.tags ? (typeof item.tags === 'string' ? item.tags.split(',')[0] : item.tags[0]) : 'Món ăn'}
                                                    </p>
                                                </div>
                                                <span className="text-[#C25E30] font-bold sm:text-lg">
                                                    {item.price}{String(item.price).includes('đ') ? '' : 'đ'}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <div className="inline-flex items-center bg-[#FDF0E9] rounded-full border border-[#F2E3D8] px-2 py-1 mb-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center text-[#C25E30] hover:bg-[#FCE5D8] rounded-full transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-[#C25E30] hover:bg-[#FCE5D8] rounded-full transition-colors"
                                                    >
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
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    placeholder="090 123 4567"
                                    className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Yêu cầu đặc biệt cho nhà hàng</label>
                                <textarea
                                    rows={4}
                                    placeholder="Ghi chú về vị trí bàn, dị ứng, hoặc các yêu cầu khác..."
                                    className="w-full bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C25E30] transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 w-full">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng hóa đơn</h2>

                        {/* Mã khuyến mãi */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                                <Tag size={16} className="text-[#C25E30]" />
                                Mã khuyến mãi
                            </label>
                            {appliedPromo ? (
                                <div className="flex items-start justify-between gap-2 p-3 bg-[#FDF0E9] border border-[#F2E3D8] rounded-xl">
                                    <div>
                                        <p className="font-mono font-bold text-[#8B3A00]">{appliedPromo.code}</p>
                                        <p className="text-xs text-gray-600 mt-0.5">{appliedPromo.title}</p>
                                        {promoIsGift && (
                                            <p className="text-xs text-emerald-700 mt-1">🎁 Quà tặng sẽ được chuẩn bị tại quán</p>
                                        )}
                                        {promoBelowMinSpend && (
                                            <p className="text-xs text-amber-700 mt-1">
                                                Cần đơn tối thiểu {formatCurrency(appliedPromo.minSpend)}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearPromo}
                                        className="p-1 text-gray-400 hover:text-[#C25E30] transition-colors"
                                        aria-label="Xóa mã"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                        placeholder="Nhập mã (VD: WEEKEND20)"
                                        className="flex-1 bg-[#FDF8F5] border border-[#EEDFCC] rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:border-[#C25E30]"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyPromo}
                                        className="px-4 py-2.5 bg-[#C25E30] hover:bg-orange-800 text-white rounded-lg text-sm font-bold transition-colors shrink-0"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            )}
                            <Link to="/promos" className="inline-block mt-2 text-xs text-[#C25E30] font-medium hover:underline">
                                Xem tất cả khuyến mãi →
                            </Link>
                        </div>

                        <div className="space-y-4 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between items-center">
                                <span>Tạm tính ({cartCount} món)</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                            </div>
                            {appliedPromo && (promoDiscount > 0 || promoIsGift) && (
                                <div className="flex justify-between items-center text-emerald-700">
                                    <span>
                                        Giảm giá ({appliedPromo.code})
                                        {promoIsGift && !promoDiscount ? ' — Quà tặng' : ''}
                                    </span>
                                    <span className="font-semibold">
                                        {promoDiscount > 0 ? `−${formatCurrency(promoDiscount)}` : '—'}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span>Phí dịch vụ (5%)</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(serviceFee)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>VAT (8%)</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(vat)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-gray-100 pt-6 mb-8">
                            <span className="text-xl font-bold text-gray-900">Tổng cộng</span>
                            <span className="text-2xl font-bold text-[#C25E30]">{formatCurrency(total)}</span>
                        </div>

                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="w-full bg-[#C25E30] hover:bg-orange-800 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mb-4"
                        >
                            <CalendarIcon size={18} /> Xác nhận đặt bàn & Món
                        </button>

                        <p className="text-center text-xs text-gray-500">
                            Bằng việc xác nhận, bạn đồng ý với{' '}
                            <a href="#" className="text-[#C25E30] hover:underline">Điều khoản dịch vụ</a> của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
