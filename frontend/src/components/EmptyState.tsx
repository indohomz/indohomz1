import React from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ title = 'No items yet', description = 'There is nothing to show here at the moment.', actionText = 'Add item', onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="mb-6">
        <rect x="0" y="0" width="160" height="120" rx="12" fill="#f8fafc" />
        <path d="M30 80 L70 40 L110 80" stroke="#c7d2fe" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 text-center max-w-xs">{description}</p>
      {onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
