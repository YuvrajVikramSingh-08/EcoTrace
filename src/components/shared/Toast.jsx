import { useToast } from '../../hooks/useToast.js';

function Toast() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  const borderColors = {
    success: 'border-eco-500/40',
    error: 'border-red-500/40',
    info: 'border-blue-500/40',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2" aria-live="assertive">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`glass-card px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-sm animate-slide-up border ${borderColors[toast.type] || borderColors.info}`}
        >
          <span className="text-lg" aria-hidden="true">
            {icons[toast.type] || icons.info}
          </span>
          <p className="text-sm text-gray-200 flex-1">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

Toast.propTypes = {};

export default Toast;
