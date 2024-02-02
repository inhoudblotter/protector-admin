import { useCallback, useRef, useEffect, useState, useId } from "preact/hooks";
import { useCloseByClickOutside } from "./useCloseByClickOutside";

interface IUseModal {
  openStyle: string;
  onClose: () => void;
}

export function useModal<
  Background extends HTMLElement,
  Container extends HTMLElement
>({ openStyle, onClose }: IUseModal) {
  const backgroundRef = useRef<Background>(null);
  const containerRef = useRef<Container>(null);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    const bg = backgroundRef.current;
    if (bg) {
      bg.classList.add(openStyle);
      setOpen(true);
    }
  }, [backgroundRef, openStyle, setOpen]);
  const delayedClose = useCallback(
    (e: TransitionEvent) => {
      if (backgroundRef.current && e.target === backgroundRef.current) {
        setOpen(false);
        onClose();
        backgroundRef.current.removeEventListener(
          "transitionend",
          delayedClose
        );
      }
    },
    [backgroundRef, onClose, setOpen]
  );
  const close = useCallback(() => {
    const bg = backgroundRef.current;
    if (bg) {
      bg.classList.remove(openStyle);
      bg.addEventListener("transitionend", delayedClose);
    }
  }, [backgroundRef, delayedClose]);

  const { onContentMount } = useCloseByClickOutside(
    backgroundRef,
    containerRef,
    close
  );

  useEffect(() => {
    onContentMount();
    open();
    document.body.classList.add("stop-scroll");
    return () => {
      document.body.classList.remove("stop-scroll");
    };
  }, [open, onContentMount]);

  return { containerRef, backgroundRef, open, close, isOpen };
}
