import { useState, useRef, useContext } from "preact/hooks";
import { deleteOrder } from "src/client/api/order/deleteOrder";
import { doneOrder } from "src/client/api/order/doneOrder";
import { isError } from "../types/typeGuards/isError";
import { AlertContext } from "../model/alertContext";

export function useOrderActions<Container extends HTMLElement>(
  id: number,
  refreshItems: () => void
) {
  const { setAction } = useContext(AlertContext);
  const [isDeleted, setDeleted] = useState(false);
  const [isDone, setDone] = useState(false);
  const ref = useRef<Container>(null);
  async function handleCheck() {
    if (!ref.current) return;
    try {
      await doneOrder(id);
      setDone(true);
      ref.current.addEventListener("transitionend", refreshItems, {
        once: true,
      });
    } catch (error) {
      setDone(false);
      if (isError(error) || error instanceof Error) {
        setAction({
          type: "add",
          payload: { type: "error", message: error.message },
        });
      } else throw error;
    }
  }

  async function handleDelete() {
    if (!ref.current) return;
    try {
      setDeleted(true);
      await deleteOrder(id);
      ref.current.addEventListener("transitionend", refreshItems, {
        once: true,
      });
    } catch (error) {
      setDeleted(false);
      if (isError(error) || error instanceof Error) {
        setAction({
          type: "add",
          payload: { type: "error", message: error.message },
        });
      } else throw error;
    }
  }
  return { ref, handleCheck, handleDelete, isDone, isDeleted };
}
