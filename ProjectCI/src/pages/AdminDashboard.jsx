const AdminDashboard = () => {
    return (
        <div>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Dashboard Overview</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
            </header>
            <div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow">
                <p className="text-on-surface-variant">Placeholder cho nội dung Dashboard.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
