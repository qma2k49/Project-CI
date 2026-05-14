import { Search, Plus, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
    {
        id: 1,
        title: "Bò Bít Tết Wagyu A5",
        desc: "Thăn ngoại bò Wagyu Nhật Bản thượng hạng, nướng than hoa ăn kèm với măng tây nướng, khoai tây nghiền nấm truffle và sốt...",
        price: "1,850,000đ",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        badge: "Món nổi bật",
        tags: ["Không Gluten"]
    },
    {
        id: 2,
        title: "Cá Hồi Na Uy Áp Chảo",
        desc: "Ăn kèm măng tây, khoai tây nghiền và sốt kem chanh dây.",
        price: "450,000đ",
        image: "https://images.unsplash.com/photo-1481070555726-e2fe83477d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Súp Kem Nấm Truffle",
        desc: "Súp kem nấm rừng đặc biệt với dầu nấm truffle đen và bánh mì nướng tỏi.",
        price: "220,000đ",
        image: "https://images.unsplash.com/photo-1548943487-a2e4b43b4850?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Tiramisu Cổ Điển",
        desc: "Bánh ngọt Ý truyền thống với phô mai mascarpone, espresso và bột cacao nguyên...",
        price: "180,000đ",
        image: "https://images.unsplash.com/photo-1571115177098-24deca958eb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Sunset Signature Cocktail",
        desc: "Sự kết hợp hoàn hảo giữa Gin thượng hạng, nước cốt cam tươi và siro lựu đỏ.",
        price: "250,000đ",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

const HomePage = () => {
    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto md:px-12">
            {/* Hero Section */}
            <div 
                className="relative w-full h-[500px] md:rounded-b-3xl bg-cover bg-center overflow-hidden mb-12"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">Trải Nghiệm Ẩm Thực Tinh Tế & Sang Trọng</h1>
                    <p className="text-gray-200 text-sm md:text-base max-w-lg mb-8">Chào mừng đến với không gian ẩm thực hòa quyện cùng dịch vụ hoàn hảo, dành riêng cho những thực khách sành điệu.</p>
                    <Link to="/booking">
                        <button className="bg-[#C25E30] hover:bg-orange-800 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                            Đặt bàn ngay
                        </button>
                    </Link>
                </div>
            </div>

            {/* Menu Section */}
            <div className="px-6 mb-16">
                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="bg-[#C25E30] text-white px-5 py-2 rounded-full text-sm font-medium">Tất cả</button>
                        <button className="bg-[#F8EFEA] text-[#C25E30] hover:bg-[#F2E3D8] transition-colors px-5 py-2 rounded-full text-sm font-medium">Khai vị</button>
                        <button className="bg-[#F8EFEA] text-[#C25E30] hover:bg-[#F2E3D8] transition-colors px-5 py-2 rounded-full text-sm font-medium">Món chính</button>
                        <button className="bg-[#F8EFEA] text-[#C25E30] hover:bg-[#F2E3D8] transition-colors px-5 py-2 rounded-full text-sm font-medium">Tráng miệng</button>
                        <button className="bg-[#F8EFEA] text-[#C25E30] hover:bg-[#F2E3D8] transition-colors px-5 py-2 rounded-full text-sm font-medium">Đồ uống</button>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm món ăn..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white outline-none focus:border-[#C25E30] text-sm"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#F8EFEA] text-[#C25E30] px-4 py-2 rounded-full text-sm font-medium border border-[#EEDFCC]">
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                            Bộ lọc
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menuItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                            <div className="relative h-48 sm:h-56 w-full">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                {item.badge && (
                                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {item.badge}
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-1">{item.desc}</p>
                                {item.tags && (
                                    <div className="mb-4">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                                    <span className="text-[#C25E30] font-bold text-lg">{item.price}</span>
                                    <button className="flex items-center gap-1 border border-[#C25E30] text-[#C25E30] hover:bg-[#FDF0E9] transition-colors px-3 py-1.5 rounded-full text-sm font-medium">
                                        <Plus size={16} /> Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button className="border border-gray-400 text-gray-600 hover:text-gray-900 hover:border-gray-900 px-8 py-2.5 rounded-full text-sm font-medium transition-colors">
                        Xem toàn bộ thực đơn
                    </button>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="px-6 pb-16">
                <div className="bg-[#FDF8F5] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/3 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900">Thông Tin Liên Hệ</h2>
                        
                        <div className="flex gap-4">
                            <div className="bg-[#F8EFEA] p-2.5 rounded-full h-fit text-[#C25E30]">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Địa chỉ</h4>
                                <p className="text-gray-600 text-sm">123 Đại lộ Ẩm Thực, Quận 1<br/>Thành phố Hồ Chí Minh, Việt Nam</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#F8EFEA] p-2.5 rounded-full h-fit text-[#C25E30]">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Giờ mở cửa</h4>
                                <p className="text-gray-600 text-sm">Thứ Hai - Thứ Sáu: 10:00 - 22:30<br/>Thứ Bảy - Chủ Nhật: 09:00 - 23:30</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#F8EFEA] p-2.5 rounded-full h-fit text-[#C25E30]">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Điện thoại</h4>
                                <p className="text-gray-600 text-sm">+84 28 3456 7890</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 w-full h-[300px] bg-[#F2E3D8] rounded-2xl relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                        <div className="text-center z-10">
                            <div className="text-red-500 mb-2">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                                </svg>
                            </div>
                            <button className="bg-[#C25E30] hover:bg-orange-800 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 mx-auto">
                                <Navigation size={16} /> Chỉ đường
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
