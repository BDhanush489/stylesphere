import { redirect } from "next/navigation";

export default function ShirtsRedirect() {
  redirect("/products?category=shirts");
}
