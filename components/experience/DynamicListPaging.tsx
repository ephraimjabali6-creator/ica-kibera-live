import React, { useState } from 'react';

interface DynamicListPagingProps<T> {
  items: T[];
  pageSize?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  filterKey?: (item: T) => string;
  filterOptions?: string[];
  gridClassName?: string;
  emptyMessage?: string;
}

export function DynamicListPaging<T>({
  items,
  pageSize = 6,
  renderItem,
  filterKey,
  filterOptions,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  emptyMessage = 'No items found.',
}: DynamicListPagingProps<T>) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (activeFilter === 'ALL' || !filterKey) return true;
    return filterKey(item) === activeFilter;
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Filter Tabs if available */}
      {filterOptions && filterOptions.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleFilterChange('ALL')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({items.length})
          </button>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleFilterChange(opt)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeFilter === opt
                  ? 'bg-[#D90077] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Items */}
      {displayedItems.length > 0 ? (
        <div className={gridClassName}>
          {displayedItems.map((item, idx) => renderItem(item, startIndex + idx))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 rounded-full ${
                  currentPage === i + 1
                    ? 'bg-[#D90077] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
