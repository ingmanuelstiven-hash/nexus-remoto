import DashboardClient from "@/components/section/dashboard/DashboardClient";
import { storeService } from "@/services/storeService";

export default async function DashboardPage() {

  const data = await storeService.getInitialData(1);

  const totalLibros = data.libros?.length || 0;
  const espaciosDisponibles =
    data.coworking?.filter((s) => !s.ocupado).length || 0;

  return (
    <DashboardClient
      totalLibros={totalLibros}
      espaciosDisponibles={espaciosDisponibles}
    />
  );
}