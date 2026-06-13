import { useCallback, useEffect, useState } from "react";
import {
  getQuotes,
  updateQuoteStatus,
  deleteQuote,
} from "../services/quotesService";
import type { Quote } from "../types/quote";

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const changeStatus = async (id: string, status: string) => {
    await updateQuoteStatus(id, status);
    setQuotes((prev) =>
      prev.map((q) => (q._id === id ? { ...q, status } : q))
    );
  };

  const removeQuote = async (id: string) => {
    await deleteQuote(id);
    setQuotes((prev) => prev.filter((q) => q._id !== id));
  };

  return {
    quotes,
    loading,
    fetchQuotes,
    changeStatus,
    removeQuote,
  };
};