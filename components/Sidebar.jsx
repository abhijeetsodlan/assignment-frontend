export default function Sidebar({ children }) {
  return (
    <aside className="self-start xl:w-[320px]">
      <div className="scrollbar-hidden space-y-6 xl:fixed xl:top-24 xl:right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] xl:max-h-[calc(100vh-7rem)] xl:w-[320px] xl:overflow-y-auto xl:pr-1">
        {children}
      </div>
    </aside>
  );
}
