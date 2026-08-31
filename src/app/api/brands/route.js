import { getBrands } from "@/services/catalogService";

export async function GET() {
  return Response.json(getBrands());
}
