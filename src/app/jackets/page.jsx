import { redirect } from "next/navigation";

export default function JacketsRedirect() {
  redirect("/products?category=jackets");
}
