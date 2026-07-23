import { Stack } from "expo-router";
import { CartProvider } from "../services/CartContext";
import { ThemeProvider } from "../services/ThemeContext";
import { LanguageProvider } from "../services/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="search" />
          <Stack.Screen name="orders/index" />
          <Stack.Screen name="orders/confirmation" />
          <Stack.Screen name="orders/[id]" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="onboarding/phone" />
          <Stack.Screen name="onboarding/otp" />
          <Stack.Screen name="onboarding/address" />
          <Stack.Screen name="onboarding/preferences" />
          <Stack.Screen name="onboarding/almost-done" />
          <Stack.Screen name="payment-methods" />
        </Stack>
      </CartProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
}
