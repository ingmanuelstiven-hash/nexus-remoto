"use client";

import { createContext, useContext } from 'react';

const TranslationsContext = createContext({});

export function TranslationsProvider({ dictionary, children }) {
  return (
    <TranslationsContext.Provider value={dictionary}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useI18n() {
  const dictionary = useContext(TranslationsContext);
  if (dictionary === undefined) {
    throw new Error('useI18n must be used within a TranslationsProvider');
  }
  return dictionary;
}
