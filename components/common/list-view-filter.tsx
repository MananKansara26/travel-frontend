'use client'

import { useState, useMemo, ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Search } from 'lucide-react'
import { Pagination } from './pagination'

export interface FilterOption {
  id: string
  label: string
}

interface ListViewFilterProps<T> {
  items: T[]
  searchField: keyof T
  filterField?: keyof T
  filterOptions?: FilterOption[]
  itemsPerPage?: number
  renderItem: (item: T, index: number) => ReactNode
  renderEmpty?: () => ReactNode
  className?: string
}

export function ListViewFilter<T>({
  items,
  searchField,
  filterField,
  filterOptions = [],
  itemsPerPage = 10,
  renderItem,
  renderEmpty,
  className = '',
}: ListViewFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search items
  const filteredItems = useMemo(() => {
    let result = items

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((item) => {
        const fieldValue = String(item[searchField]).toLowerCase()
        return fieldValue.includes(query)
      })
    }

    // Apply filter
    if (selectedFilter && filterField) {
      result = result.filter((item) => {
        const fieldValue = String(item[filterField])
        return fieldValue === selectedFilter
      })
    }

    return result
  }, [items, searchQuery, selectedFilter, searchField, filterField])

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedFilter(null)
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery.trim() !== '' || selectedFilter !== null

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`Search by ${String(searchField)}...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        {/* Filter Buttons */}
        {filterOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedFilter === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedFilter(
                    selectedFilter === option.id ? null : option.id
                  )
                  setCurrentPage(1)
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredItems.length === 0 ? 0 : startIndex + 1} to{' '}
        {Math.min(endIndex, filteredItems.length)} of {filteredItems.length} results
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {paginatedItems.length === 0 ? (
          renderEmpty ? (
            renderEmpty()
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No items found
            </div>
          )
        ) : (
          paginatedItems.map((item, index) => (
            <div key={startIndex + index}>{renderItem(item, startIndex + index)}</div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
