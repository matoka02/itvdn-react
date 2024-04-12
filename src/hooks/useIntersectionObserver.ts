import { useRef, useState, useEffect, MutableRefObject } from 'react';

interface Options {
  root?: Element;
  rootMargin?: string;
  threshold?: number;
  onIntersect?(): void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];


export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 1.0, root = null, rootMargin = '0px', onIntersect } = options;

  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  function callbackFn(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setEntry(entry);
  };

  useEffect(() => {
    // const observer = new IntersectionObserver(callbackFn, { root, rootMargin, threshold });
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect?.();
        }
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );
    const currentRef = targetRef.current;

    if (currentRef) observer.observe(currentRef);

    return function () {
      if (currentRef) observer.disconnect();
    }
  }, [onIntersect, root, rootMargin, threshold]);

  return [targetRef, entry];
}