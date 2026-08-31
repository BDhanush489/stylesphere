import { getCollections } from "@/services/catalogService";

export async function GET() {
  return Response.json(getCollections());
}
