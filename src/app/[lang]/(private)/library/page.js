import { storeService } from "@/services/storeService";
import LibraryClient from "@/components/section/library/LibraryClient";

export default async function LibraryPage({ searchParams }) {

  const params = await searchParams;

  const libros = await storeService.getLibros(params);

  return <LibraryClient libros={libros} />;
}