import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Bell, X, Check, AlertTriangle, Info, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'New Booking Confirmed',
    message: 'Villa booking for Lotus Villas has been confirmed',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Inventory Alert',
    message: '3 properties need maintenance review',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Report Generated',
    message: 'Monthly analytics report is ready',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Revenue Milestone',
    message: 'You've reached 80% of monthly target!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
];

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <TrendingUp className="h-5 w-5 text-purple-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute right-0 mt-2 w-96 max-h-[32rem] overflow-hidden rounded-lg bg-white dark:bg-neutral-800 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Notifications
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                You have {unreadCount} unread messages
              </p>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Bell className="h-12 w-12 text-neutral-300 dark:text-neutral-600 mb-3" />
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative px-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50 ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <span className="block h-2 w-2 rounded-full bg-blue-500"></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3">
            <button className="w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      </Transition>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
