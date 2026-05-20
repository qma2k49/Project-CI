import { CalendarDays, Clock, Users, ArrowRight, LayoutTemplate } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { useCart } from "../contexts/CartContext";

const OCCUPIED_TABLE_IDS_KEY = 'occupiedTableIds';

const TABLE_STATUS = {
    available: { fill: '#2563eb', label: 'Bàn trống' },
    occupied: { fill: '#9ca3af', label: 'Đang phục vụ' },
};

const getOccupiedTableIds = () => {
    try {
        const raw = localStorage.getItem(OCCUPIED_TABLE_IDS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const applyOccupiedStatusToFloors = (floors) => {
    const occupiedIds = new Set(getOccupiedTableIds());
    return floors.map((floor) => ({
        ...floor,
        tables: floor.tables.map((table) => ({
            ...table,
            status: occupiedIds.has(table.id) ? 'occupied' : 'available',
        })),
    }));
};

const buildTables = (floorId, idPrefix, startNum, count, zoneName) => {
    return Array.from({ length: count }, (_, i) => {
        const label = String(startNum + i);
        return {
            id: `${idPrefix}${label}`,
            label,
            zone: zoneName,
            seats: 6,
            floorId,
            status: 'available',
        };
    });
}

const createFloors = () => [
    { id: 'floor-1', name: 'Tầng 1', tables: buildTables('floor-1', 'F1-', 101, 25, 'Tầng 1') },
    { id: 'floor-2', name: 'Tầng 2', tables: buildTables('floor-2', 'F2-', 201, 15, 'Tầng 2') },
];

const CHAIR_POSITIONS = [
    { x: 20, y: 2 }, { x: 36, y: 2 }, { x: 52, y: 2 },
    { x: 20, y: 50 }, { x: 36, y: 50 }, { x: 52, y: 50 },
    { x: 6, y: 22 }, { x: 6, y: 34 }, { x: 58, y: 22 }, { x: 58, y: 34 },
];

const TableSeatIcon = ({ label, status, selected, onClick }) => {
    const colors = TABLE_STATUS[status] ?? TABLE_STATUS.available;
    const clickable = status === 'available';

    return (
        <button
            type="button"
            disabled={!clickable}
            onClick={onClick}
            aria-label={`Bàn ${label}`}
            aria-pressed={selected}
            className={`
                relative flex flex-col items-center p-1 rounded-lg transition-all duration-150
                ${clickable ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-75'}
                ${selected ? 'ring-2 ring-green-600 ring-offset-2 bg-green-50/50' : ''}
            `}
        >
            <svg viewBox="0 0 72 56" className="w-[52px] h-[40px] sm:w-14 sm:h-11 drop-shadow-sm" aria-hidden>
                {CHAIR_POSITIONS.map((pos, i) => (
                    <rect key={i} x={pos.x} y={pos.y} width={10} height={6} rx={1.5} fill={colors.fill} opacity={0.85} />
                ))}
                <rect x={14} y={12} width={44} height={32} rx={5} fill={colors.fill} />
                <text x="36" y="32" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">
                    {label}
                </text>
            </svg>
        </button>
    );
}

const BookingPage = () => {
    const [floorsData, setFloorsData] = useState([]);
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [mapError, setMapError] = useState(null);
    const [selectedTableIds, setSelectedTableIds] = useState([]);
    const [activeFloorId, setActiveFloorId] = useState('');
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState(() =>
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    );
    const [guests, setGuests] = useState(4);

    const selectedDateFormatted = selectedDate
        ? new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
        : '';

    const navigate = useNavigate();
    const { setTableReservation, tableReservation } = useCart();

    const allTables = useMemo(() => floorsData.flatMap((f) => f.tables), [floorsData]);

    const activeFloor = useMemo(
        () => floorsData.find((f) => f.id === activeFloorId) ?? floorsData[0],
        [floorsData, activeFloorId]
    );

    const stats = useMemo(() => {
        if (!activeFloor) {
            return { totalSeats: 0, freeAll: 0, freeFloor: 0, seatsFloor: 0 };
        }
        const totalSeats = allTables.reduce((s, t) => s + t.seats, 0);
        const freeAll = allTables.filter((t) => t.status === 'available').length;
        const freeFloor = activeFloor.tables.filter((t) => t.status === 'available').length;
        const seatsFloor = activeFloor.tables.reduce((s, t) => s + t.seats, 0);
        return { totalSeats, freeAll, freeFloor, seatsFloor };
    }, [activeFloor, allTables]);

    useEffect(() => {
        let cancelled = false;

        const loadFloorPlan = async () => {
            setIsMapLoading(true);
            setMapError(null);

            try {
                // Mô phỏng gọi API — thay bằng fetch('/api/tables') khi có backend
                await new Promise((resolve) => setTimeout(resolve, 400));

                if (cancelled) return;

                const loadedFloors = applyOccupiedStatusToFloors(createFloors());
                setFloorsData(loadedFloors);
                setActiveFloorId(loadedFloors[0]?.id ?? '');

                const savedTables = tableReservation?.tables
                    ?? (tableReservation?.id ? [tableReservation] : []);
                const availableSavedIds = savedTables
                    .map((t) => t.id)
                    .filter((id) => {
                        const table = loadedFloors.flatMap((f) => f.tables).find((t) => t.id === id);
                        return table?.status === 'available';
                    });
                if (availableSavedIds.length > 0) {
                    setSelectedTableIds(availableSavedIds);
                }
            } catch {
                if (!cancelled) {
                    setMapError('Không thể tải sơ đồ bàn. Vui lòng thử lại.');
                }
            } finally {
                if (!cancelled) {
                    setIsMapLoading(false);
                }
            }
        };

        loadFloorPlan();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const updateTime = () =>
            setSelectedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
        updateTime();
        const id = setInterval(updateTime, 60 * 1000);
        return () => clearInterval(id);
    }, []);

    const handleTableClick = (table) => {
        if (table.status !== 'available') return;

        setSelectedTableIds((prev) => (
            prev.includes(table.id)
                ? prev.filter((id) => id !== table.id)
                : [...prev, table.id]
        ));
    };

    const handleConfirm = () => {
        if (selectedTableIds.length === 0) {
            message.warning("Vui lòng chọn ít nhất một bàn trống trước khi tiếp tục!");
            return;
        }

        const selectedTables = allTables.filter((t) => selectedTableIds.includes(t.id));
        const primaryTable = selectedTables[0];
        const now = new Date();
        const dateObj = selectedDate ? new Date(selectedDate) : null;
        const dateFormatted = dateObj
            ? dateObj.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
            : '';
        const floor = floorsData.find((f) => f.id === primaryTable.floorId);

        setTableReservation({
            ...primaryTable,
            tables: selectedTables,
            floor: floor?.name ?? primaryTable.zone,
            date: dateFormatted || '—',
            time: selectedTime,
            guests: `${guests} Người lớn`,
            reservationDateTimeISO: selectedDate ? `${selectedDate}T${selectedTime}:00` : null,
            createdAt: now.toISOString(),
            createdAtFormatted: now.toLocaleString('vi-VN', {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
            }),
        });

        message.success(`Đã chọn thành công ${selectedTables.length} bàn!`);
        navigate('/checkout');
    };

    const selectedTables = allTables.filter((t) => selectedTableIds.includes(t.id));

    return (
        <div className="font-body-md bg-[#FAF9F6] w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Đặt bàn trực tuyến</h1>
                <p className="text-gray-500">Tận hưởng trải nghiệm ẩm thực tinh tế. Vui lòng hoàn tất các bước bên dưới.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sơ đồ bàn */}
                <div className="lg:w-2/3 bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Sơ đồ bàn ăn</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-3 bg-slate-100 border-y border-slate-200 text-sm">
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-medium">Toàn bộ nhà hàng:</span>{' '}
                            Trống {stats.freeAll}/{allTables.length} bàn · {stats.totalSeats} ghế
                            <span className="mx-2 text-gray-400 hidden sm:inline">›</span>
                            <br className="sm:hidden" />
                            <span className="font-semibold text-[#C25E30]">
                                {activeFloor
                                    ? `${activeFloor.name}: Trống ${stats.freeFloor}/${activeFloor.tables.length} bàn · ${stats.seatsFloor} ghế`
                                    : 'Đang tải...'}
                            </span>
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-4 shrink-0">
                            {Object.entries(TABLE_STATUS).map(([key, v]) => (
                                <span key={key} className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
                                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: v.fill }} />
                                    {v.label}
                                </span>
                            ))}
                            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
                                <span className="w-3 h-3 rounded-sm ring-2 ring-green-600 bg-white" />
                                Đang chọn
                            </span>
                        </div>
                    </div>

                    <div className="flex min-h-[420px]">
                        <aside className="w-28 sm:w-36 shrink-0 bg-slate-50 border-r border-slate-200 py-3">
                            {floorsData.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setActiveFloorId(f.id)}
                                    className={`w-full px-3 sm:px-4 py-3 text-left text-xs sm:text-sm flex items-center gap-2 transition-colors
                                        ${f.id === activeFloorId
                                            ? 'bg-white text-[#C25E30] font-bold border-l-4 border-[#C25E30] shadow-sm'
                                            : 'text-gray-600 hover:bg-white/80 border-l-4 border-transparent'}
                                    `}
                                >
                                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 shrink-0" />
                                    <span>
                                        {f.name}
                                        <span className="text-gray-400 font-normal"> ({f.tables.length})</span>
                                    </span>
                                </button>
                            ))}
                        </aside>

                        <div className="flex-1 p-4 sm:p-6 bg-white overflow-auto max-h-[520px]">
                            {isMapLoading ? (
                                <div className="flex flex-col items-center justify-center min-h-[320px] gap-3">
                                    <Spin size="large" />
                                    <p className="text-sm text-gray-500">Đang tải sơ đồ bàn ăn...</p>
                                </div>
                            ) : mapError ? (
                                <div className="flex flex-col items-center justify-center min-h-[320px] gap-3 text-center">
                                    <p className="text-sm text-red-600">{mapError}</p>
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="text-sm font-semibold text-[#C25E30] hover:underline"
                                    >
                                        Tải lại
                                    </button>
                                </div>
                            ) : activeFloor ? (
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2">
                                    {activeFloor.tables.map((table) => (
                                        <TableSeatIcon
                                            key={table.id}
                                            label={table.label}
                                            status={table.status}
                                            selected={selectedTableIds.includes(table.id)}
                                            onClick={() => handleTableClick(table)}
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Tóm tắt */}
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

                        {selectedTables.length > 0 ? (
                            <div className="bg-[#FDF0E9] rounded-xl p-4 flex gap-4 items-center mb-8 border border-[#F2E3D8]">
                                <LayoutTemplate className="text-[#C25E30] shrink-0" size={24} />
                                <div>
                                    <p className="text-sm text-[#C25E30] font-medium mb-1">Bàn đang chọn ({selectedTables.length})</p>
                                    <p className="font-bold text-[#8B3A00]">
                                        {selectedTables.map((table) => table.label).join(", ")}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-4 flex gap-4 items-center mb-8 border border-gray-200">
                                <LayoutTemplate className="text-gray-400 shrink-0" size={24} />
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Chưa chọn bàn</p>
                                    <p className="font-medium text-gray-400 text-sm">Vui lòng click vào sơ đồ</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={isMapLoading}
                                className="w-full bg-[#C25E30] hover:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                Tiếp tục Xác nhận <ArrowRight size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-full bg-white border border-[#C25E30] text-[#C25E30] hover:bg-orange-50 py-3.5 rounded-lg font-bold transition-colors"
                            >
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
