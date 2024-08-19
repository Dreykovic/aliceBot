import { useState, useEffect, useRef, MutableRefObject } from 'react';

// Type pour le hook personnalisé
interface Rect {
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
  x: number;
  y: number;
}

function useBoundingClientRect<T extends HTMLElement>(): [
  Rect | undefined,
  MutableRefObject<T | null>,
] {
  const [rect, setRect] = useState<Rect | undefined>(undefined);
  const ref = useRef<T | null>(null);

  const updateRect = () => {
    if (ref.current) {
      const { width, height, top, left, bottom, right, x, y } =
        ref.current.getBoundingClientRect();
      setRect({ width, height, top, left, bottom, right, x, y });
    }
  };

  useEffect(() => {
    // Met à jour le rect lors du montage
    updateRect();

    // Ajoute l'événement de redimensionnement
    window.addEventListener('resize', updateRect);

    // Nettoie l'événement lors du démontage
    return () => {
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  return [rect, ref];
}

export default useBoundingClientRect;
