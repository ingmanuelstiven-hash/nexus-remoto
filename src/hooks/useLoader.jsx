// src/hooks/useLoader.js
import { useState, useRef, useCallback, useEffect } from "react";

export const useLoader = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const timeoutRef = useRef(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);

    // 🔥 limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 🔥 helper opcional: auto-stop (controlado)
  const startWithAutoStop = useCallback((ms) => {
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, ms);
  }, []);

  // 🔥 cleanup automático (importantísimo)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    startWithAutoStop, // opcional
  };
};