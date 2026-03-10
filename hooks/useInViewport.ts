import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewportReturn {
  ref: RefObject<HTMLElement | null>;
  isInView: boolean;
}

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInViewport(
  options: IntersectionObserverOptions = {},
): UseInViewportReturn {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isInView };
}