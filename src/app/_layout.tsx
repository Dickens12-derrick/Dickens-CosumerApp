import { Stack } from "expo-router";
import { CartProvider } from "../services/CartContext";
import Home from "./home";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{title: Home}}/>
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="home" />
        <Stack.Screen name="discover" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="search" />
        <Stack.Screen name="orders/index" />
        <Stack.Screen name="orders/confirmation" />
        <Stack.Screen name="orders/[id]" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="onboarding/phone" />
        <Stack.Screen name="onboarding/otp" />
        <Stack.Screen name="onboarding/address" />
        <Stack.Screen name="onboarding/preferences" />
        <Stack.Screen name="payment-methods" />
      </Stack>
    </CartProvider>
  );
}
