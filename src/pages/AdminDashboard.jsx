import { DollarSign, Users, Calendar, Utensils, TrendingUp, TrendingDown } from "lucide-react";
import { Table, Tag } from "antd";

// Thẻ thống kê Component
const StatCard = ({ title, value, icon: Icon, trend, trendValue, isPositive }) => (
    <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="font-label-md text-on-surface-variant mb-1">{title}</p>
                <h3 className="font-headline-md text-on-surface">{value}</h3>
            </div>
            <div className="p-3 bg-primary-container text-primary rounded-full">
                <Icon size={24} />
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className={`flex items-center text-label-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {trendValue}
            </span>
            <span className="text-label-sm text-on-surface-variant">{trend}</span>
        </div>
    </div>
);

// Dữ liệu giả cho bảng đơn hàng
const recentOrders = [
    { key: '1', orderId: '#ORD-001', customer: 'Nguyễn Văn A', table: 'T-01', time: '10:30 AM', amount: '$125.00', status: 'Hoàn thành' },
    { key: '2', orderId: '#ORD-002', customer: 'Trần Thị B', table: 'T-05', time: '11:15 AM', amount: '$85.50', status: 'Đang xử lý' },
    { key: '3', orderId: '#ORD-003', customer: 'Lê Hoàng C', table: 'T-12', time: '12:00 PM', amount: '$210.00', status: 'Chờ xử lý' },
    { key: '4', orderId: '#ORD-004', customer: 'Phạm Văn D', table: 'T-03', time: '12:45 PM', amount: '$45.00', status: 'Hoàn thành' },
    { key: '5', orderId: '#ORD-005', customer: 'Vũ Thị E', table: 'T-08', time: '01:30 PM', amount: '$150.00', status: 'Đang xử lý' },
];

const columns = [
    { title: 'Mã đơn', dataIndex: 'orderId', key: 'orderId', className: 'font-semibold text-primary' },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Bàn', dataIndex: 'table', key: 'table' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time' },
    { title: 'Tổng tiền', dataIndex: 'amount', key: 'amount', className: 'font-semibold' },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            let color = status === 'Hoàn thành' ? 'green' : status === 'Đang xử lý' ? 'blue' : 'orange';
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
    },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Dashboard tổng quan</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Xin chào, Admin. Đây là những gì đang diễn ra hôm nay.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Tổng doanh thu" value="$2,450" icon={DollarSign} trend="so với tuần trước" trendValue="+15%" isPositive={true} />
                <StatCard title="Khách hàng mới" value="42" icon={Users} trend="so với tuần trước" trendValue="+5%" isPositive={true} />
                <StatCard title="Lượt đặt bàn" value="18" icon={Calendar} trend="so với tuần trước" trendValue="-2%" isPositive={false} />
                <StatCard title="Bàn đang phục vụ" value="12" icon={Utensils} trend="so với tuần trước" trendValue="+20%" isPositive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col min-h-[400px]">
                    <h3 className="font-title-lg text-on-surface mb-6">Biểu đồ doanh thu</h3>
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-low">
                        <div className="text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50" data-icon="bar_chart">bar_chart</span>
                            <p className="font-body-md">Khu vực biểu đồ</p>
                            <p className="text-label-sm opacity-70 mt-1">(Dữ liệu biểu đồ doanh thu theo tuần sẽ hiển thị ở đây)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col min-h-[400px]">
                    <h3 className="font-title-lg text-on-surface mb-6">Món ăn thịnh hành</h3>
                    <div className="flex-1 space-y-4">
                        {[
                            { name: "Bò bít tết Wagyu Ribeye", orders: 24, price: "$85" },
                            { name: "Mì Ý nấm Truffle", orders: 18, price: "$45" },
                            { name: "Súp tôm hùm", orders: 15, price: "$32" },
                            { name: "Bánh socola tan chảy", orders: 12, price: "$28" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                                <div>
                                    <p className="font-label-bold text-on-surface">{item.name}</p>
                                    <p className="text-label-sm text-on-surface-variant">{item.orders} lượt gọi</p>
                                </div>
                                <span className="font-semibold text-primary">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-title-lg text-on-surface">Đơn hàng gần đây</h3>
                    <button className="text-primary hover:text-primary-container font-label-md transition-colors">
                        Xem tất cả
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={recentOrders}
                        pagination={false}
                        className="min-w-[800px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
