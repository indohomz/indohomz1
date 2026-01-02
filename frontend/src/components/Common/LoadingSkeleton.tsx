import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = 'rectangular', width, height, className = '' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700';
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <Skeleton variant="rectangular" height={200} className="w-full" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="40%" height={16} />
        <div className="flex gap-2 mt-4">
          <Skeleton variant="rectangular" width={60} height={32} />
          <Skeleton variant="rectangular" width={60} height={32} />
          <Skeleton variant="rectangular" width={60} height={32} />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="rectangular" width={60} height={24} />
      </div>
      <Skeleton variant="text" width="40%" height={16} className="mb-2" />
      <Skeleton variant="text" width="60%" height={32} />
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, idx) => (
            <Skeleton key={idx} variant="text" height={16} />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="border-b border-neutral-200 dark:border-neutral-700 p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={colIdx} variant="text" height={16} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width={200} height={32} className="mb-2" />
          <Skeleton variant="text" width={300} height={16} />
        </div>
        <Skeleton variant="rectangular" width={120} height={40} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton variant="card" height={300} />
        <Skeleton variant="card" height={300} />
      </div>

      {/* Table */}
      <TableSkeleton rows={5} columns={5} />
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4">
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="80%" height={16} />
            </div>
            <Skeleton variant="rectangular" width={80} height={32} />
          </div>
        </div>
      ))}
    </div>
  );
}
