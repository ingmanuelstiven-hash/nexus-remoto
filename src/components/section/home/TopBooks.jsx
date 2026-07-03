"use client";

import BookCard from "@/components/ui/library/BookCard";
import { useI18n } from "@/context/TranslationsProvider";

export default function TopBooks({ books }) {
  const t = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12 space-y-3">
        <h2 className="title-h2">
          {t.home.topbooks_title}
        </h2>
        <p className="text-slate-600">
          {t.home.topbooks_subtitle}
        </p>
      </header>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="h-full">
              <BookCard libro={book} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500">
            {t.home.topbooks_empty}
          </div>
        )}
      </div>
    </section>
  );
}
