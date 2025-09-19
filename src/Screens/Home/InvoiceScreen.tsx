import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from 'react-native';

const formatCurrency = (num: any) => `₹${Number(num).toFixed(2)}`;

export default function InvoiceScreen({ order, setScreen }: any) {
    if (!order) return null;

    return (
        <ImageBackground
            source={require('../../../assets/Images/bg.jpeg')}
            style={styles.bg}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Invoice</Text>

                <View style={styles.card}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {order.items.map((it: any) => (
                            <View key={it.id} style={styles.row}>
                                <Text style={styles.itemText}>
                                    {it.name} × {it.qty}
                                </Text>
                                <Text style={styles.priceText}>
                                    {formatCurrency(it.price * it.qty)}
                                </Text>
                            </View>
                        ))}

                        <View style={styles.divider} />

                        <View style={styles.row}>
                            <Text style={styles.label}>Subtotal</Text>
                            <Text style={styles.value}>{formatCurrency(order.subTotal)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Discount</Text>
                            <Text style={[styles.value, { color: '#d9534f' }]}>
                                -{formatCurrency(order.discountValue)}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tax</Text>
                            <Text style={styles.value}>{formatCurrency(order.taxValue)}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.row}>
                            <Text style={styles.totalLabel}>TOTAL</Text>
                            <Text style={styles.totalValue}>
                                {formatCurrency(order.total)}
                            </Text>
                        </View>
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => setScreen('POS')}>
                    <Text style={styles.btnText}>Back to POS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,{marginTop:20,backgroundColor: 'gray'}]} onPress={() => setScreen('History')}>
                    <Text style={styles.btnText}>History</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    bg: { flex: 1 },
    header: {
        fontSize: 26,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    itemText: {
        fontSize: 16,
        color: '#000',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    label: {
        fontSize: 15,
        color: '#666',
    },
    value: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007bff',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    btn: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
