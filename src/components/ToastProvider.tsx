import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, message, type, duration };

    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} className="text-white flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={20} className="text-white flex-shrink-0" />;
      case 'info':
        return <Info size={20} className="text-white flex-shrink-0" />;
    }
  };

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-rose-600';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 400, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className={`${getBackgroundColor(toast.type)} rounded-2xl px-6 py-4 mb-3 shadow-xl backdrop-blur-sm border border-white/20 flex items-center gap-4 pointer-events-auto max-w-md`}
          >
            {getIcon(toast.type)}
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{toast.message}</p>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-white/80 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastProvider;
