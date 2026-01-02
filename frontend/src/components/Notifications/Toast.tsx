import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-500 dark:text-green-400',
      textColor: 'text-green-800 dark:text-green-200',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-500 dark:text-red-400',
      textColor: 'text-red-800 dark:text-red-200',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      textColor: 'text-yellow-800 dark:text-yellow-200',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-500 dark:text-blue-400',
      textColor: 'text-blue-800 dark:text-blue-200',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${bgColor} ${borderColor}`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${iconColor}`} />
      <p className={`flex-1 text-sm font-medium ${textColor}`}>{message}</p>
      <button
        onClick={handleClose}
        className={`flex-shrink-0 ${textColor} hover:opacity-70 transition-opacity`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
