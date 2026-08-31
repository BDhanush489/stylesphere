import { redirect } from "next/navigation";

export default function TShirtsRedirect() {
  redirect("/products?category=tshirts");
}
