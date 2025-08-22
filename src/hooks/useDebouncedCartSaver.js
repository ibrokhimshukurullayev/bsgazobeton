// hooks/useDebouncedCartSaver.js
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSaveOrderItemsMutation } from "../context/orderApi";
import { api as rootApi } from "../context/api"; // createApi() exporti

// Backendga yuboriladigan elementlar: [{ productId, quantity, state }]
// state: "Create" | "Update" | "Delete"
export default function useDebouncedCartSaver({
  token,
  debounceMs = 600,
} = {}) {
  const dispatch = useDispatch();
  const [saveOrderItems] = useSaveOrderItemsMutation();

  const queueRef = useRef(new Map()); // productId -> { productId, quantity, state }
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
        await saveOrderItems(items).unwrap(); // POST /orders/save
        // GET /orders/cart ni avtomatik qayta chaqirish:
        dispatch(rootApi.util.invalidateTags(["Orders"]));
      } finally {
        setIsSyncing(false);
      }
    };

    if (inflightRef.current) {
      // Hozir request ketayotgan bo‘lsa, tugagach yana flush qilamiz
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

  // UI dagi o‘zgarishni navbatga qo‘shish (coalesce — oxirgi qiymat saqlanadi)
  const saveLater = useCallback(
    (productId, quantity, state) => {
      queueRef.current.set(productId, { productId, quantity, state });
      scheduleFlush();
    },
    [scheduleFlush]
  );

  // Token paydo bo‘lsa navbatni yuborish
  useEffect(() => {
    if (token && queueRef.current.size) flush();
  }, [token, flush]);

  // Cleanup
  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  // Ixtiyoriy: tashqaridan qo‘lda darhol yuborish uchun
  return { saveLater, isSyncing, flushNow: flush };
}

// // hooks/useDebouncedCartSaver.js
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useSaveOrderItemsMutation } from "../context/orderApi";

// // Backend kutiladigan maydonlar: [{ productId, quantity, state }]
// // state: "Create" | "Update" | "Delete"
// export default function useDebouncedCartSaver({
//   token,
//   debounceMs = 600,
// } = {}) {
//   const [saveOrderItems] = useSaveOrderItemsMutation();

//   const queueRef = useRef(new Map()); // productId -> { productId, quantity, state }
//   const timerRef = useRef(null);
//   const inflightRef = useRef(null);
//   const needsFlushRef = useRef(false);
//   const [isSyncing, setIsSyncing] = useState(false);

//   const flush = useCallback(() => {
//     if (!token || queueRef.current.size === 0) return;

//     const items = Array.from(queueRef.current.values());
//     queueRef.current.clear();

//     const send = async () => {
//       setIsSyncing(true);
//       try {
//         await saveOrderItems(items).unwrap(); // RTK Query mutation
//       } finally {
//         setIsSyncing(false);
//       }
//     };

//     if (inflightRef.current) {
//       // Hozir request ketayotgan bo‘lsa, flush tugagach takrorlash uchun flag
//       needsFlushRef.current = true;
//       return;
//     }

//     inflightRef.current = send()
//       .catch(() => {})
//       .finally(() => {
//         inflightRef.current = null;
//         if (needsFlushRef.current) {
//           needsFlushRef.current = false;
//           // navbatdagilarni darhol yuborish
//           setTimeout(flush, 0);
//         }
//       });
//   }, [token, saveOrderItems]);

//   const scheduleFlush = useCallback(() => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(flush, debounceMs);
//   }, [flush, debounceMs]);

//   // UI dagi o‘zgarishni navbatga qo‘shish (coalesce — oxirgi qiymat yutadi)
//   const saveLater = useCallback(
//     (productId, quantity, state) => {
//       queueRef.current.set(productId, { productId, quantity, state });
//       scheduleFlush();
//     },
//     [scheduleFlush]
//   );

//   // Token paydo bo‘lsa navbatni yuborish
//   useEffect(() => {
//     if (token && queueRef.current.size) flush();
//   }, [token, flush]);

//   useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

//   return { saveLater, isSyncing };
// }
