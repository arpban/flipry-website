'use client';

import { useEffect, useRef, useCallback } from 'react';

interface FlipbookIframeProps {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FlipbookIframe({
  src,
  title,
  className = '',
  style
}: FlipbookIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    if (!iframeRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await iframeRef.current.requestFullscreen();
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, []);

  // Listen for postMessage from iframe to trigger fullscreen
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages from this specific iframe
      if (event.source === iframeRef.current?.contentWindow && event.data === 'fullscreen') {
        toggleFullscreen();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toggleFullscreen]);

  // Listen for fullscreen changes and notify iframe
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (iframeRef.current?.contentWindow) {
        const message = document.fullscreenElement ? 'fullscreen:enter' : 'fullscreen:exit';
        iframeRef.current.contentWindow.postMessage(message, '*');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={style}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full border-0 rounded-lg"
        allowFullScreen
        allow='fullscreen'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
