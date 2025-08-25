import { useEffect, useRef } from "react";
import { useSaveOrderItemsMutation } from "../context/orderApi";
import { useDispatch } from "react-redux";
import { api as rootApi } from "../context/api";

const LS_CART = "carts";
const LS_SYNC_FLAG = "cart_synced_for";

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(LS_CART) || "[]");
  } catch {
    return [];
  }
}

function buildPayloadFromLocal(localItems) {
  const map = new Map();
  for (const it of Array.isArray(localItems) ? localItems : []) {
    const pid = it?.productid ?? it?.productId ?? it?.id;
    const qty = Number(it?.quantity) || 0;
    if (!pid || qty <= 0) continue;

    const prev = map.get(pid)?.quantity || 0;
    map.set(pid, {
      productId: pid,
      quantity: prev + qty,
      state: "Update",
    });
  }
  return Array.from(map.values());
}

export default function useLoginCartSync(token) {
  const [saveOrderItems] = useSaveOrderItemsMutation();
  const syncingRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    if (syncingRef.current) return;

    const alreadyFor = localStorage.getItem(LS_SYNC_FLAG);
    if (alreadyFor && alreadyFor === token) return;

    const localItems = readLocalCart();
    const payload = buildPayloadFromLocal(localItems);
    if (payload.length === 0) {
      localStorage.setItem(LS_SYNC_FLAG, token);
      return;
    }

    syncingRef.current = true;
    (async () => {
      try {
        await saveOrderItems(payload).unwrap();
        localStorage.setItem(LS_SYNC_FLAG, token);

        dispatch(rootApi.util.invalidateTags(["Orders"]));

        window.dispatchEvent(
          new CustomEvent("cart:server-synced", {
            detail: { count: payload.length },
          })
        );
      } catch (e) {
        console.error("Login cart sync failed:", e);
      } finally {
        syncingRef.current = false;
      }
    })();
  }, [token, saveOrderItems, dispatch]);
}
