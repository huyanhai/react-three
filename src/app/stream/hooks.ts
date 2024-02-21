import { useEffect, useRef, useState } from "react";

export const useCallbackState = (state: any) => {
  const [value, setValue] = useState(state);
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [
    value,
    (v: any) => {
      setValue(v);
    },
  ];
};
