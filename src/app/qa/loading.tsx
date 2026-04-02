export default function Loading() {
  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-3 flex-wrap mb-6">
          <div className="h-10 flex-1 min-w-40 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 w-20 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="flex gap-3 mt-2">
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
