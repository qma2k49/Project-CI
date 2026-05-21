import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

const PROMO_CATALOG = [
    { code: 'WEEKEND20', title: 'Cuối tuần sang trọng', type: 'percent', value: 20, minSpend: 500000 },
    { code: 'COMBO2', title: 'Combo đôi tinh tế', type: 'fixed', value: 80000, minSpend: 400000 },
    { code: 'HAPPY30', title: 'Happy Hour 14h–17h', type: 'percent', value: 30, minSpend: 0 },
    { code: 'NEWHOST15', title: 'Chào thực khách mới', type: 'percent', value: 15, minSpend: 300000 },
    { code: 'EARLY10', title: 'Đặt bàn sớm', type: 'percent', value: 10, minSpend: 0 },
    { code: 'BIRTHDAY', title: 'Sinh nhật đặc biệt', type: 'gift', value: 0, minSpend: 0 },
];

const calcPromoDiscount = (subtotal, promo) => {
    if (!promo || subtotal < promo.minSpend) return 0;
    if (promo.type === 'gift') return 0;
    if (promo.type === 'percent') return Math.floor(subtotal * promo.value / 100);
    if (promo.type === 'fixed') return Math.min(promo.value, subtotal);
    return 0;
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('cartItems');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [tableReservation, setTableReservation] = useState(() => {
        try {
            const stored = localStorage.getItem('tableReservation');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [appliedPromo, setAppliedPromo] = useState(() => {
        try {
            const stored = localStorage.getItem('appliedPromo');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Failed to save cartItems to localStorage', e);
        }
    }, [cartItems]);

    useEffect(() => {
        try {
            if (tableReservation) {
                localStorage.setItem('tableReservation', JSON.stringify(tableReservation));
            } else {
                localStorage.removeItem('tableReservation');
            }
        } catch (e) {
            console.error('Failed to save tableReservation to localStorage', e);
        }
    }, [tableReservation]);

    useEffect(() => {
        try {
            if (appliedPromo) {
                localStorage.setItem('appliedPromo', JSON.stringify(appliedPromo));
            } else {
                localStorage.removeItem('appliedPromo');
            }
        } catch (e) {
            console.error('Failed to save appliedPromo to localStorage', e);
        }
    }, [appliedPromo]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id, amount) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + amount;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearReservation = () => {
        setTableReservation(null);
    };

    const clearPromo = () => {
        setAppliedPromo(null);
    };

    const applyPromoCode = useCallback((rawCode) => {
        const code = String(rawCode || '').trim().toUpperCase();
        if (!code) {
            return { ok: false, message: 'Vui lòng nhập mã khuyến mãi.' };
        }
        const promo = PROMO_CATALOG.find((p) => p.code === code);
        if (!promo) {
            return { ok: false, message: 'Mã khuyến mãi không hợp lệ.' };
        }
        setAppliedPromo(promo);
        return { ok: true, promo };
    }, []);

    const clearCart = () => {
        setCartItems([]);
        setAppliedPromo(null);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        tableReservation,
        setTableReservation,
        clearReservation,
        appliedPromo,
        applyPromoCode,
        clearPromo,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { calcPromoDiscount, useCart, CartProvider, PROMO_CATALOG }