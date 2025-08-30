import { Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export default function LoadingOverlay({ 
  message = 'Loading...', 
  className = '' 
}: LoadingOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const overlayContent = (
    <div className="loading-overlay-highest bg-black/30 flex items-center justify-center">
      <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-2 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
} 