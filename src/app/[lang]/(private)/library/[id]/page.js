import { storeService } from "@/services/storeService";
import BookDetailClient from "@/components/section/library/BookDetailClient";

export default async function BookDetailPage({ params }) {

  const { id } = await params; // 🔥 CLAVE

  const book = await storeService.getLibroById(id);

  return <BookDetailClient book={book} />;
}