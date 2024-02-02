import { useRef, useState, useCallback, useEffect } from "preact/hooks";
import { useCloseByClickOutside } from "./useCloseByClickOutside";

export function useDropdown<
  Dropdown extends HTMLElement,
  Trigger extends HTMLElement,
  Content extends HTMLElement
>(
  openClass: string,
  onClose?: () => void
): {
  triggerRef: React.RefObject<Trigger>;
  contentRef: React.RefObject<Content>;
  dropdownRef: React.RefObject<Dropdown>;
  isOpen: boolean;
  open: () => void;
  close: (callback?: () => void) => void;
  onContentMount: () => () => void;
  setIsInside: (
    e: {
      _isInside?: string[] | undefined;
    } & MouseEvent
  ) => void;
} {
  const dropdownRef = useRef<Dropdown>(null);
  const triggerRef = useRef<Trigger>(null);
  const contentRef = useRef<Content>(null);
  const [isOpen, setOpen] = useState(false);

  const close = useCallback(
    (callback: () => void = () => {}) => {
      const el = dropdownRef.current;
      if (el) {
        el.classList.remove(openClass);
        el.addEventListener(
          "transitionend",
          () => {
            setOpen(false);
            if (onClose) onClose();
            callback();
          },
          { once: true }
        );
      }
    },
    [dropdownRef, setOpen, onClose, openClass]
  );

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const outsideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!outsideRef.current)
      outsideRef.current = document.getElementById("root");
  }, [outsideRef]);

  const { onContentMount: closeByClickOutside, setIsInside } =
    useCloseByClickOutside(outsideRef, dropdownRef, close);

  const onContentMount = useCallback(() => {
    const el = dropdownRef.current;
    if (el) {
      window.requestAnimationFrame(() => {
        el.classList.add(openClass);
      });
    }
    return closeByClickOutside();
  }, [dropdownRef, openClass, closeByClickOutside]);

  const switchState = useCallback(() => {
    if (isOpen) {
      close();
    } else open();
  }, [isOpen, close, open]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) trigger.addEventListener("click", switchState);
    return () => {
      if (trigger) trigger.removeEventListener("click", switchState);
    };
  }, [triggerRef, switchState]);

  return {
    triggerRef,
    contentRef,
    dropdownRef,
    isOpen,
    open,
    close,
    onContentMount,
    setIsInside,
  };
}
