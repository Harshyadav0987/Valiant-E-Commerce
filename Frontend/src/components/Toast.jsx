import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

// Toast Component
const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'text-emerald-600',
      text: 'text-emerald-900',
      progress: 'bg-emerald-500'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-900',
      progress: 'bg-red-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-900',
      progress: 'bg-blue-500'
    }
  }

  const style = styles[type] || styles.info

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl shadow-lg p-4 min-w-[320px] max-w-md backdrop-blur-sm animate-slideIn`}>
      <div className="flex items-start gap-3">
        <div className={`${style.icon} flex-shrink-0 mt-0.5`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          <p className={`${style.text} text-sm font-medium leading-relaxed`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`${style.icon} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className={`${style.progress} h-full rounded-full animate-progress`}></div>
      </div>
    </div>
  )
}

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <div key={toast.id} className="mb-3">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return {
    toasts,
    removeToast,
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    info: (message, duration) => addToast(message, 'info', duration)
  }
}