import React from 'react'
import EmptyState from '../components/EmptyState'

export default function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-primary-700 mb-6">AI Reports</h1>
      <div className="card">
        <EmptyState
          title="No reports generated"
          description="Generate AI-powered reports to get insights and recommendations for your store."
          actionText="Generate Report"
          onAction={() => alert('Trigger AI report generation (not implemented)')}
        />
      </div>
    </div>
  )
}
