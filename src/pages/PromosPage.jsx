import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCart } from "../contexts/CartContext";
import { Tag, Gift, Percent, Copy, Calendar, Sparkles, Clock, ArrowRight } from "lucide-react";

const PROMO_CATEGORIES = ["Tất cả", "Đặt bàn", "Combo món", "Đồ uống", "Thành viên"];

const promos = [
    {
        id: "p1",
        category: "Đặt bàn",
        badge: "HOT",
        badgeColor: "bg-red-500",
        title: "Cuối tuần sang trọng",
        description: "Giảm 20% tổng hóa đơn khi đặt bàn Thứ 7 & Chủ nhật từ 17:00.",
        discount: "20%",
        code: "WEEKEND20",
        validUntil: "31/12/2026",
        minSpend: "500.000đ",
        featured: true,
    },
    {
        id: "p2",
        category: "Combo món",
        badge: "COMBO",
        badgeColor: "bg-[#C25E30]",
        title: "Combo đôi tinh tế",
        description: "Khai vị + món chính + tráng miệng cho 2 khách với giá ưu đãi.",
        discount: "499K",
        code: "COMBO2",
        validUntil: "30/06/2026",
        minSpend: "Không yêu cầu",
        featured: false,
    },
    {
        id: "p3",
        category: "Đồ uống",
        badge: "HAPPY HOUR",
        badgeColor: "bg-amber-500",
        title: "Happy Hour 14h–17h",
        description: "Giảm 30% toàn bộ đồ uống, cocktail & rượu vang theo ly.",
        discount: "30%",
        code: "HAPPY30",
        validUntil: "31/12/2026",
        minSpend: "Áp dụng tại quán",
        featured: false,
    },
    {
        id: "p4",
        category: "Thành viên",
        badge: "NEW",
        badgeColor: "bg-emerald-500",
        title: "Chào thực khách mới",
        description: "Giảm 15% cho lần đặt bàn & đặt món đầu tiên tại The Discerning Host.",
        discount: "15%",
        code: "NEWHOST15",
        validUntil: "31/12/2026",
        minSpend: "300.000đ",
        featured: false,
    },
    {
        id: "p5",
        category: "Đặt bàn",
        badge: "SỚM",
        badgeColor: "bg-blue-500",
        title: "Đặt bàn sớm",
        description: "Đặt trước 12:00 cùng ngày, nhận ưu đãi 10% cho bữa tối.",
        discount: "10%",
        code: "EARLY10",
        validUntil: "31/08/2026",
        minSpend: "Không yêu cầu",
        featured: false,
    },
    {
        id: "p6",
        category: "Thành viên",
        badge: "GIFT",
        badgeColor: "bg-purple-500",
        title: "Sinh nhật đặc biệt",
        description: "Tặng bánh kem & nến khi đặt bàn nhóm từ 4 người trong tháng sinh nhật.",
        discount: "Tặng quà",
        code: "BIRTHDAY",
        validUntil: "31/12/2026",
        minSpend: "Đặt bàn trước 24h",
        featured: false,
    },
];

const copyPromoCode = async (code) => {
    try {
        await navigator.clipboard.writeText(code);
        message.success(`Đã sao chép mã: ${code}`);
    } catch {
        message.info(`Mã khuyến mãi: ${code}`);
    }
};

const PromosPage = () => {
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const navigate = useNavigate();
    const { applyPromoCode } = useCart();

    const handleUsePromo = (code) => {
        const result = applyPromoCode(code);
        if (result.ok) {
            message.success(`Đã áp mã ${code} vào hóa đơn`);
            navigate('/checkout');
        } else {
            message.warning(result.message);
        }
    };

    const filteredPromos = promos.filter(
        (promo) => activeCategory === "Tất cả" || promo.category === activeCategory
    );
    const featuredPromo = promos.find((p) => p.featured);

    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10 pb-24 md:pb-10">
            {/* Header */}
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0E9] text-[#C25E30] text-sm font-semibold mb-4">
                    <Sparkles size={16} />
                    Ưu đãi độc quyền
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Khuyến mãi & Promos</h1>
                <p className="text-gray-500 max-w-2xl">
                    Khám phá các chương trình ưu đãi dành riêng cho thực khách. Sao chép mã và áp dụng khi đặt bàn hoặc thanh toán.
                </p>
            </div>

            {/* Featured banner */}
            {featuredPromo && (
                <div className="relative mb-10 rounded-2xl overflow-hidden bg-gradient-to-r from-[#8B3A00] via-[#C25E30] to-[#E07A3A] p-6 md:p-10 text-white shadow-lg">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="max-w-xl">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3">
                                Nổi bật tuần này
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{featuredPromo.title}</h2>
                            <p className="text-white/90 text-sm md:text-base mb-4">{featuredPromo.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5">
                                    <Percent size={16} /> Giảm {featuredPromo.discount}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={16} /> HSD: {featuredPromo.validUntil}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex items-center gap-2 bg-white/15 backdrop-blur rounded-xl px-4 py-3 border border-white/20">
                                <Tag size={18} />
                                <span className="font-mono font-bold tracking-wider">{featuredPromo.code}</span>
                                <button
                                    type="button"
                                    onClick={() => copyPromoCode(featuredPromo.code)}
                                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                                    aria-label="Sao chép mã"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleUsePromo(featuredPromo.code)}
                                className="w-full sm:w-auto bg-white text-[#C25E30] hover:bg-orange-50 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                Áp dụng & Thanh toán <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {PROMO_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === cat
                                ? "bg-[#C25E30] text-white"
                                : "bg-[#F8EFEA] text-[#C25E30] hover:bg-[#F2E3D8]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Promo grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromos.map((promo) => (
                    <article
                        key={promo.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                    >
                        <div className="h-2 bg-gradient-to-r from-[#C25E30] to-[#E07A3A]" />
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <span className={`${promo.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-md`}>
                                    {promo.badge}
                                </span>
                                <span className="text-2xl font-bold text-[#C25E30]">{promo.discount}</span>
                            </div>

                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{promo.category}</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{promo.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-1">{promo.description}</p>

                            <div className="space-y-2 text-xs text-gray-500 mb-4">
                                <p className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400 shrink-0" />
                                    HSD: {promo.validUntil}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Gift size={14} className="text-gray-400 shrink-0" />
                                    Điều kiện: {promo.minSpend}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-[#FDF8F5] border border-[#F2E3D8] rounded-xl mb-4">
                                <span className="font-mono font-bold text-[#8B3A00] flex-1 tracking-wide">{promo.code}</span>
                                <button
                                    type="button"
                                    onClick={() => copyPromoCode(promo.code)}
                                    className="p-2 rounded-lg text-[#C25E30] hover:bg-[#F2E3D8] transition-colors"
                                    aria-label={`Sao chép ${promo.code}`}
                                >
                                    <Copy size={16} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleUsePromo(promo.code)}
                                className="w-full mt-auto border border-[#C25E30] text-[#C25E30] hover:bg-orange-50 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                Áp dụng vào hóa đơn <ArrowRight size={16} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {filteredPromos.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <Tag size={40} className="mx-auto mb-4 text-gray-300" />
                    <p>Chưa có khuyến mãi trong danh mục này.</p>
                </div>
            )}

            {/* Terms note */}
            <div className="mt-12 p-5 rounded-xl bg-white border border-gray-100 text-sm text-gray-500">
                <p className="flex items-start gap-2">
                    <Clock size={16} className="text-[#C25E30] shrink-0 mt-0.5" />
                    <span>
                        Mỗi mã chỉ áp dụng một lần/khách, không cộng dồn với khuyến mãi khác. Vui lòng nhập mã khi đặt bàn hoặc thanh toán tại quầy.
                        Quản lý có quyền thay đổi điều kiện mà không báo trước.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PromosPage;
