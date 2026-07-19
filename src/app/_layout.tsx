import { Stack } from "expo-router";
import { CartProvider } from "../services/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack />
    </CartProvider>
  );
}
