import { storeService } from "@/services/storeService";
import CoworkingClient from "@/components/section/coworking/CoworkingClient";

export default async function CoworkingPage() {
  const data = await storeService.getInitialData();

  return <CoworkingClient spaces={data.coworking} />;
}