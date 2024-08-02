export const lerp = (start: number, end: number, time: number) => {
  return (1 - time) * start + time * end;
}