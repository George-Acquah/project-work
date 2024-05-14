import { useRef, useEffect } from "react";

function useDebounce<T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function debouncedCallback(...args: T) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return debouncedCallback;
}

export default useDebounce;

// import { useState, useEffect } from "react";

// const useDebounce = <
//   F extends (...args: any[]) => any,
//   T extends ReturnType<F>
// >(
//   func: F,
//   delay: number
// ): ((...args: Parameters<F>) => T) => {
//   const [debouncedFunc, setDebouncedFunc] = useState(func);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedFunc(func);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [func, delay]);

//   return (...args: Parameters<F>) => {
//     return debouncedFunc(...args);
//   };
// };

// export default useDebounce;

