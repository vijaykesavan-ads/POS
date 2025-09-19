import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';

const TAX_PERCENT = 5;
const MENU = [
    {
        id: '1',
        name: 'Pizza',
        price: 200,
        image: require('../../../assets/Images/pizza.jpeg'),
    },
    {
        id: '2',
        name: 'Burger',
        price: 100,
        image: require('../../../assets/Images/Burgur.jpeg'),
    },
    {
        id: '3',
        name: 'Coke',
        price: 50,
        image: require('../../../assets/Images/coke.jpeg'),
    },
];
const formatCurrency = (num: any) => `₹${Number(num).toFixed(2)}`;

export default function POSScreen({
    user,
    setScreen,
    setCurrentInvoice,
    setOrders,
    orders,
    setUser,
}: any) {
    const [cart, setCart] = useState([]);
    const [discountPercent, setDiscountPercent] = useState('0');

    const addToCart = (item: any) => {
        setCart((prev: any) => {
            const existing = prev.find((p: any) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const changeQty = (id: any, qty: any) => {
        if (qty <= 0) return setCart((prev) => prev.filter((p) => p.id !== id));
        setCart((prev: any) =>
            prev.map((p: any) => (p.id === id ? { ...p, qty } : p))
        );
    };

    const subTotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
    const discountValue = (subTotal * Number(discountPercent)) / 100;
    const taxed = ((subTotal - discountValue) * TAX_PERCENT) / 100;
    const total = subTotal - discountValue + taxed;

    const placeOrder = () => {
        const order = {
            id: `ORD-${Date.now()}`,
            user: user.username,
            items: cart,
            subTotal,
            discountPercent: Number(discountPercent),
            discountValue,
            taxPercent: TAX_PERCENT,
            taxValue: taxed,
            total,
        };
        setOrders([order, ...orders]);
        setCurrentInvoice(order);
        setScreen('Invoice');
    };

    return (
        <ImageBackground
            source={require('../../../assets/Images/bg.jpeg')}
            style={styles.bg}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>👋 Welcome, {user.username}</Text>

                {/* Menu List */}
                <Text style={[styles.sectionTitle, { color: '#FFF', }]}>Menu</Text>
                <FlatList
                    data={MENU}
                    keyExtractor={(i) => i.id}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            <Image source={item?.image} style={styles.foodImage} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.menuText}>
                                    {item.name} — {formatCurrency(item.price)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => addToCart(item)}
                            >
                                <Text style={styles.addBtnText}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* Cart */}
                <View style={styles.cartBox}>
                    <Text style={styles.sectionTitle}>🛒 Cart</Text>
                    <ScrollView style={{ maxHeight: 150 }}>
                        {cart.length === 0 ? (
                            <Text style={styles.emptyCart}>Your cart is empty</Text>
                        ) : (
                            cart.map((c) => (
                                <View key={c.id} style={styles.cartRow}>
                                    <Text style={styles.cartItem}>{c.name}</Text>
                                    <View style={styles.qtyBox}>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => changeQty(c.id, c.qty - 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{c.qty}</Text>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => changeQty(c.id, c.qty + 1)}
                                        >
                                            <Text style={styles.qtyBtnText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>

                    {/* Summary */}
                    <View style={styles.summaryBox}>
                        <Text>Subtotal: {formatCurrency(subTotal)}</Text>
                        <TextInput
                            value={discountPercent}
                            onChangeText={setDiscountPercent}
                            placeholder="Discount %"
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <Text>Total: {formatCurrency(total)}</Text>
                    </View>

                    {/* Actions */}
                    <TouchableOpacity style={styles.btnPrimary} onPress={placeOrder}>
                        <Text style={styles.btnText}>Place Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnSecondary}
                        onPress={() => setScreen('Login')}
                    >
                        <Text style={styles.btnText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { flex: 1, padding: 16 },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        color: '#FFF',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 6,
        color: '#333',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    foodImage: { width: 50, height: 50, borderRadius: 8 },
    menuText: { fontSize: 16, color: '#333' },
    addBtn: {
        backgroundColor: '#28a745',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addBtnText: { color: '#fff', fontWeight: '600' },
    cartBox: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    emptyCart: { textAlign: 'center', color: '#888', marginVertical: 20 },
    cartRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    cartItem: { fontSize: 16, color: '#333' },
    qtyBox: { flexDirection: 'row', alignItems: 'center' },
    qtyBtn: {
        backgroundColor: '#007bff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    qtyBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    qtyText: { marginHorizontal: 10, fontSize: 16, fontWeight: '600' },
    summaryBox: { marginTop: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
    },
    btnPrimary: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
    },
    btnSecondary: {
        backgroundColor: '#6c757d',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
