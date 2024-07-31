import { useEffect, useState } from 'react';
import { Vector2 } from 'three';

export const useMouse = () => {
  const [mouse, setMouse] = useState(new Vector2(0, 0));

  const updateMouse = (e: MouseEvent) => {
    const center = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
    const client = new Vector2(e.clientX, -e.clientY);
    setMouse(
      new Vector2(
        (client.x - center.x) / center.x,
        (client.y + center.y) / center.y
      )
    );
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMouse);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
    }
  }, []);

  return mouse;
};
