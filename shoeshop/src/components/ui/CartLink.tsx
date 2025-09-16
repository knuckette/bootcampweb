"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartLink() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return <Link href="/cart">Panier ({count})</Link>;
}
