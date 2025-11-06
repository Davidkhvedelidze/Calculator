export default function Loading() {
  return (
    <div className="container space-y-12">
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-12 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-6 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
