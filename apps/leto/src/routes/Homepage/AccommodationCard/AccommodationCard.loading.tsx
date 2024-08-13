function AccommodationCardLoading() {
  return (
    <article 
      className="bg-white rounded-lg transition border border-slate-200 animate-pulse"
    >
      <div className="bg-slate-200 rounded-t-lg h-60" />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="bg-slate-200 h-7 w-44 rounded-lg"></div>
          <div className="bg-slate-200 h-5 w-9 rounded-lg"></div>
        </div>
        <div className="flex gap-1 items-baseline">
          <div className="bg-slate-200 h-9 w-20 rounded-lg"></div>
          <div className="bg-slate-200 h-5 w-10 rounded-lg"></div>
        </div>
      </div>
    </article>
  )
}

export default AccommodationCardLoading;
