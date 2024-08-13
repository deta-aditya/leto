function UnitCardLoading() {
  return (
    <article className="bg-white rounded-lg border border-gray-200 flex">
      <div className="bg-slate-200 size-52 rounded-l-lg animate-pulse" />
      <div className="flex flex-col justify-between gap-10 flex-grow p-6">
        <div className="flex flex-col gap-2">
          <div className="bg-slate-200 h-5 w-52 rounded-lg animate-pulse" />
          <div className="flex gap-1 items-baseline">
            <div className="bg-slate-200 h-6 w-36 rounded-lg animate-pulse" />
            <div className="bg-slate-200 h-4 w-16 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-lg  text-white py-3 px-8 border border-gray-200">
            <div className="bg-slate-200 h-6 w-24 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default UnitCardLoading;
