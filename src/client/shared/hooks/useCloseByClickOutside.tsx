import { useCallback, useId } from "preact/hooks";

export function useCloseByClickOutside<
  Outside extends HTMLElement,
  Inside extends HTMLElement
>(
  outsideRef: React.RefObject<Outside>,
  insideRef: React.RefObject<Inside>,
  closeFunction: () => void
) {
  const id = useId();

  const setIsInside = useCallback(
    (e: { _isInside?: string[] } & MouseEvent) => {
      if (!e._isInside) {
        e._isInside = [id];
      } else if (!e._isInside.includes(id)) {
        e._isInside.push(id);
      }
    },
    [id]
  );

  const closeByClickOutside = useCallback(
    (e: { _isInside?: string[] } & MouseEvent) => {
      if (!e._isInside || !e._isInside.includes(id)) closeFunction();
    },
    [id, closeFunction]
  );

  const onContentMount = useCallback(() => {
    const inside = insideRef.current;
    const outside = outsideRef.current;
    if (inside && outside) {
      inside.addEventListener("click", setIsInside);
      outside.addEventListener("click", closeByClickOutside);
    }
    return () => {
      if (inside && outside) {
        inside.removeEventListener("click", setIsInside);
        outside.removeEventListener("click", closeByClickOutside);
      }
    };
  }, [outsideRef, insideRef, closeByClickOutside, setIsInside]);
  return { onContentMount, setIsInside };
}
