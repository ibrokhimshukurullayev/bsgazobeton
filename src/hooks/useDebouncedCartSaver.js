import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSaveOrderItemsMutation } from "../context/orderApi";
import { api as rootApi } from "../context/api";

export default function useDebouncedCartSaver({
  token,
  debounceMs = 600,
} = {}) {
  const dispatch = useDispatch();
  const [saveOrderItems] = useSaveOrderItemsMutation();

  const queueRef = useRef(new Map());
  const timerRef = useRef(null);
  const inflightRef = useRef(null);
  const needsFlushRef = useRef(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const flush = useCallback(() => {
    if (!token || queueRef.current.size === 0) return;

    const items = Array.from(queueRef.current.values());
    queueRef.current.clear();

    const send = async () => {
      setIsSyncing(true);
      try {
        await saveOrderItems(items).unwrap();
        // GET /orders/cart ni avtomatik qayta chaqirish:
        dispatch(rootApi.util.invalidateTags(["Orders"]));
      } finally {
        setIsSyncing(false);
      }
    };

    if (inflightRef.current) {
      needsFlushRef.current = true;
      return;
    }

    inflightRef.current = send()
      .catch(() => {})
      .finally(() => {
        inflightRef.current = null;
        if (needsFlushRef.current) {
          needsFlushRef.current = false;
          setTimeout(flush, 0);
        }
      });
  }, [token, saveOrderItems, dispatch]);

  const scheduleFlush = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flush, debounceMs);
  }, [flush, debounceMs]);

  const saveLater = useCallback(
    (productId, quantity, state) => {
      queueRef.current.set(productId, { productId, quantity, state });
      scheduleFlush();
    },
    [scheduleFlush]
  );

  useEffect(() => {
    if (token && queueRef.current.size) flush();
  }, [token, flush]);

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  return { saveLater, isSyncing, flushNow: flush };
}
