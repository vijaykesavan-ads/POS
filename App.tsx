import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import POSScreen from './src/Screens/Home/POSScreen';
import InvoiceScreen from './src/Screens/Home/InvoiceScreen';
import HistoryScreen from './src/Screens/Home/HistoryScreen';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [user, setUser] = useState(null);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [orders, setOrders] = useState([]);


  return (
    <View style={{ flex: 1 }}>
      {screen === 'Login' && (
        <LoginScreen setScreen={setScreen} setUser={setUser} />
      )}
      {screen === 'POS' && (
        <POSScreen
          user={user}
          setScreen={setScreen}
          setCurrentInvoice={setCurrentInvoice}
          setOrders={setOrders}
          orders={orders}
          setUser={setUser}
        />
      )}
      {screen === 'Invoice' && (
        <InvoiceScreen
          setScreen={setScreen}
          order={currentInvoice}
        />
      )}
      {screen === 'History' && (
        <HistoryScreen
          setScreen={setScreen}
          orders={orders}
          setCurrentInvoice={setCurrentInvoice}
        />
      )}
    </View>
  );
}