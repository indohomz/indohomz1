import React from 'react';

export default function SecurityLock() {
  return (
    <span title="Secure site" className="inline-flex items-center text-green-600 dark:text-green-400 ml-2">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 2a4 4 0 0 1 4 4v2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1V6a4 4 0 0 1 4-4zm2 6V6a2 2 0 1 0-4 0v2h4zm-6 2v6h8v-6H6z" />
      </svg>
      <span className="ml-1 text-xs font-semibold">Secure</span>
    </span>
  );
}
