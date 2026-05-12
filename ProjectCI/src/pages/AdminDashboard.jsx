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
    { key: '1', orderId: '#ORD-001', customer: 'Nguyễn Văn A', table: 'T-01', time: '10:30 AM', amount: '$125.00', status: 'Completed' },
    { key: '2', orderId: '#ORD-002', customer: 'Trần Thị B', table: 'T-05', time: '11:15 AM', amount: '$85.50', status: 'In Progress' },
    { key: '3', orderId: '#ORD-003', customer: 'Lê Hoàng C', table: 'T-12', time: '12:00 PM', amount: '$210.00', status: 'Pending' },
    { key: '4', orderId: '#ORD-004', customer: 'Phạm Văn D', table: 'T-03', time: '12:45 PM', amount: '$45.00', status: 'Completed' },
    { key: '5', orderId: '#ORD-005', customer: 'Vũ Thị E', table: 'T-08', time: '01:30 PM', amount: '$150.00', status: 'In Progress' },
];

const columns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId', className: 'font-semibold text-primary' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Table', dataIndex: 'table', key: 'table' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', className: 'font-semibold' },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            let color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'orange';
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
    },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Dashboard Overview</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                {/* Có thể thêm nút Quick Action ở đây */}
                <button className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-md font-label-md transition-colors">
                    + New Reservation
                </button>
            </header>

            {/* 1. Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$2,450" icon={DollarSign} trend="vs last week" trendValue="+15%" isPositive={true} />
                <StatCard title="New Customers" value="42" icon={Users} trend="vs last week" trendValue="+5%" isPositive={true} />
                <StatCard title="Reservations" value="18" icon={Calendar} trend="vs last week" trendValue="-2%" isPositive={false} />
                <StatCard title="Active Tables" value="12" icon={Utensils} trend="vs last week" trendValue="+20%" isPositive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. Chart Placeholder (Chiếm 2/3 không gian trên Desktop) */}
                <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col min-h-[400px]">
                    <h3 className="font-title-lg text-on-surface mb-6">Revenue Trend</h3>
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-low">
                        <div className="text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50" data-icon="bar_chart">bar_chart</span>
                            <p className="font-body-md">Chart Area</p>
                            <p className="text-label-sm opacity-70 mt-1">(Dữ liệu biểu đồ doanh thu theo tuần sẽ hiển thị ở đây)</p>
                        </div>
                    </div>
                </div>

                {/* 3. Phụ lục bên cạnh (1/3 không gian) */}
                <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow flex flex-col min-h-[400px]">
                    <h3 className="font-title-lg text-on-surface mb-6">Trending Items</h3>
                    <div className="flex-1 space-y-4">
                        {[
                            { name: "Wagyu Ribeye Steak", orders: 24, price: "$85" },
                            { name: "Truffle Pasta", orders: 18, price: "$45" },
                            { name: "Lobster Bisque", orders: 15, price: "$32" },
                            { name: "Chocolate Lava Cake", orders: 12, price: "$28" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                                <div>
                                    <p className="font-label-bold text-on-surface">{item.name}</p>
                                    <p className="text-label-sm text-on-surface-variant">{item.orders} orders</p>
                                </div>
                                <span className="font-semibold text-primary">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Recent Orders Table */}
            <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-title-lg text-on-surface">Recent Orders</h3>
                    <button className="text-primary hover:text-primary-container font-label-md transition-colors">
                        View All
                    </button>
                </div>
                {/* Responsive wrapper cho bảng antd */}
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
