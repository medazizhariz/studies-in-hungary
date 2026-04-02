export default function Loading() {
  return (
    <div>
      <div className="page-header">
        <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-gray-100 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-3 flex-wrap mb-6">
          <div className="h-10 flex-1 min-w-40 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 w-40 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 w-56 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 w-20 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
