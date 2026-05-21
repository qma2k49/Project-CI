import { Search, Plus, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Spin, Input, Button, Tag, Empty, Card } from "antd";
import { useCart } from "../contexts/CartContext";

const CATEGORIES = ["Tất cả", "Khai vị", "Món chính", "Tráng miệng", "Đồ uống"];

const HomePage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [showAll, setShowAll] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://sheetdb.io/api/v1/upphenz3slflr');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
                message.error("Không thể tải thực đơn. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const filteredItems = menuItems.filter((item) => {
        const q = searching.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(q);
        const matchesCategory = activeCategory === "Tất cả" || (item.tags && item.tags.includes(activeCategory));
        return matchesSearch && matchesCategory;
    });

    const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

    return (
        <div className="w-full">
            {/* Hero */}
            <section
                className="relative w-full h-[min(520px,70vh)] md:mx-4 md:mt-4 md:rounded-3xl overflow-hidden mb-10 md:mb-14"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <Tag color="volcano" className="!mb-4 !px-3 !py-1 !text-xs !font-semibold !border-0 !rounded-full">
                        Nhà hàng cao cấp
                    </Tag>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight tracking-tight">
                        Trải nghiệm ẩm thực tinh tế & sang trọng
                    </h1>
                    <p className="text-white/85 text-sm md:text-lg max-w-xl mb-8 leading-relaxed">
                        Hương vị đặc sắc, không gian riêng tư và dịch vụ chuẩn mực — dành cho thực khách sành điệu.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/booking">
                            <Button type="primary" size="large" className="!h-12 !px-8 !rounded-full !font-semibold">
                                Đặt bàn ngay
                            </Button>
                        </Link>
                        <Link to="/promos">
                            <Button size="large" ghost className="!h-12 !px-8 !rounded-full !text-white !border-white/60 hover:!bg-white/10">
                                Xem ưu đãi
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="customer-page !pt-0">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={activeCategory === cat ? "customer-chip-active" : "customer-chip-inactive"}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <Input
                        allowClear
                        size="large"
                        prefix={<Search size={16} className="text-on-surface-variant" />}
                        placeholder="Tìm kiếm món ăn..."
                        value={searching}
                        onChange={(e) => setSearching(e.target.value)}
                        className="!max-w-md !rounded-full"
                    />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Spin size="large" />
                        <p className="text-sm text-on-surface-variant">Đang tải thực đơn...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <Empty
                        description="Không tìm thấy món phù hợp"
                        className="py-16"
                    >
                        <Button type="primary" onClick={() => { setSearching(""); setActiveCategory("Tất cả"); }}>
                            Xóa bộ lọc
                        </Button>
                    </Empty>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {displayedItems.map((item) => (
                            <Card
                                key={item.id}
                                hoverable
                                className="!customer-card !border-outline-variant/30 overflow-hidden"
                                cover={
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            alt={item.title}
                                            src={item.image && item.image !== '[URL]' ? item.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        {item.badge && (
                                            <Tag color="gold" className="!absolute !top-3 !left-3 !m-0 !font-bold">
                                                {item.badge}
                                            </Tag>
                                        )}
                                    </div>
                                }
                                styles={{ body: { padding: "1.25rem" } }}
                            >
                                <h3 className="text-lg font-bold text-on-background mb-1">{item.title}</h3>
                                <p className="text-on-surface-variant text-sm line-clamp-2 mb-3 min-h-[2.5rem]">{item.desc}</p>
                                {item.tags && (
                                    <div className="mb-4 flex flex-wrap gap-1.5">
                                        {(typeof item.tags === 'string' ? item.tags.split(',') : item.tags).slice(0, 3).map((tag, index) => (
                                            <Tag key={index} bordered={false} className="!bg-surface-container !text-on-surface-variant !text-xs">
                                                {typeof tag === 'string' ? tag.trim() : tag}
                                            </Tag>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
                                    <span className="text-primary font-bold text-xl">
                                        {item.price}{String(item.price).includes('đ') ? '' : 'đ'}
                                    </span>
                                    <Button
                                        type="primary"
                                        ghost
                                        icon={<Plus size={16} />}
                                        onClick={() => {
                                            addToCart(item);
                                            message.success(`Đã thêm "${item.title}" vào giỏ`);
                                        }}
                                        className="!rounded-full"
                                    >
                                        Thêm
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {filteredItems.length > 6 && (
                    <div className="flex justify-center mt-12">
                        <Button size="large" onClick={() => setShowAll(!showAll)} className="!rounded-full !px-10">
                            {showAll ? "Thu gọn" : "Xem toàn bộ thực đơn"}
                        </Button>
                    </div>
                )}

                {/* Contact */}
                <section className="mt-16 md:mt-20">
                    <Card className="!customer-card-muted !border-0">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 p-2 md:p-4">
                            <div className="lg:w-2/5 space-y-6">
                                <h2 className="text-2xl font-bold text-on-background">Thông tin liên hệ</h2>
                                {[
                                    { icon: MapPin, title: "Địa chỉ", text: "123 Đại lộ Ẩm Thực, Q.1\nTP. Hồ Chí Minh" },
                                    { icon: Clock, title: "Giờ mở cửa", text: "T2–T6: 10:00–22:30\nT7–CN: 09:00–23:30" },
                                    { icon: Phone, title: "Điện thoại", text: "+84 28 3456 7890" },
                                ].map(({ icon: Icon, title, text }) => (
                                    <div key={title} className="flex gap-4">
                                        <div className="bg-primary-container/50 p-3 rounded-xl h-fit text-primary">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-on-background mb-1">{title}</h4>
                                            <p className="text-on-surface-variant text-sm whitespace-pre-line">{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="lg:flex-1 h-[280px] md:h-[320px] rounded-2xl bg-surface-container-high relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                                <Button type="primary" size="large" icon={<Navigation size={18} />} className="!rounded-full relative z-10">
                                    Chỉ đường
                                </Button>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
