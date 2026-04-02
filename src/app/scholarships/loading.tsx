export default function Loading() {
  return (
    <div>
      <div className="page-header">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-gray-100 rounded mt-2 animate-pulse" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-10">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="w-20 space-y-2 shrink-0">
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                    <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
