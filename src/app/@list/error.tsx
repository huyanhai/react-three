'use client'
export default function ListError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>发生错误!</h2>
      <button onClick={() => reset()}>再试一次</button>
    </div>
  );
}
