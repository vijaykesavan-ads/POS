import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';


const formatCurrency = (num: any) => `₹${Number(num).toFixed(2)}`;


export default function HistoryScreen({ orders, setCurrentInvoice, setScreen }: any) {
    return (
        <ImageBackground
            source={require('../../../assets/Images/bg.jpeg')}
            style={styles.bg}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Order History</Text>
                <FlatList
                    data={orders}
                    keyExtractor={(o) => o.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => { setCurrentInvoice(item); setScreen('Invoice'); }}
                        >
                            <View>
                                <Text style={{ fontWeight: '700', color: '#FFF' }}>{item.id}</Text>
                                <Text style={{ color: '#FFF' }}>{item.items.length} items</Text>
                            </View>
                            <Text style={{ color: '#FFF' }}>{formatCurrency(item.total)}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.btn} onPress={() => setScreen('POS')}>
                    <Text style={{ color: '#fff' }}>Back to POS</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { flex: 1, padding: 30 },
    title: { fontSize: 20, fontWeight: '700', color: '#FFF' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6, padding: 8, borderBottomWidth: 1, borderColor: '#fff' },
    btn: { backgroundColor: 'gray', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
});