const fs = require('fs');
const content = 
import React, { useEffect, useRef, useState } from 'react';
import { productsList } from '@/lib/data';
import { X, Camera } from 'lucide-react';

export default function Virtualizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState('');
  
  // Basic drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const urlParams = new URLSearchParams(window.location.search);
  const productSlug = urlParams.get('product');
  const product = productsList.find(p => p.slug === productSlug);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        setError('Camera access denied or not available. Please allow camera access to use the Virtualizer.');
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!product) return <div className="p-10 text-center font-sans">Product not found. Please go back.</div>;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col font-sans touch-none">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-burgundy-600 p-2 rounded-full">
            <Camera size={18} className="text-white" />
          </div>
          <h2 className="text-white font-medium text-lg shadow-black drop-shadow-md">AR Virtualizer</h2>
        </div>
        <button onClick={() => window.close()} className="bg-white/20 p-2 rounded-full text-white hover:bg-white/40 transition-colors backdrop-blur-sm">
          <X size={20} />
        </button>
      </div>

      {/* Camera View */}
      <div className="relative flex-1 bg-gray-950 overflow-hidden flex items-center justify-center">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6 z-10">
            <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl max-w-sm backdrop-blur-md">
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* AR Product Overlay */}
        {hasCamera && (
          <div 
            className="absolute z-20 cursor-move border-2 border-dashed border-white/40 rounded-lg overflow-hidden shadow-2xl shadow-black/60 bg-white/5 backdrop-blur-sm transition-transform duration-75"
            style={{ 
              transform: \\\	ranslate(\\\px, \\\px) scale(\\\)\\\,
              width: '280px'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img src={product.image} alt={product.title} className="w-full h-auto object-cover pointer-events-none" />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white/90 text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider backdrop-blur-md pointer-events-none">
              {product.title}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col items-center justify-center z-50 gap-4">
        <p className="text-white/90 text-sm font-medium text-center shadow-black drop-shadow-md">
          Drag the product to position it on your wall
        </p>
        
        <div className="flex items-center gap-4 bg-black/50 p-2 rounded-full backdrop-blur-md border border-white/10">
          <span className="text-white/60 text-xs uppercase tracking-wider px-2">Size</span>
          <input 
            type="range" 
            min="0.5" 
            max="2.5" 
            step="0.1" 
            value={scale} 
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-32 accent-burgundy-500"
          />
        </div>
      </div>
    </div>
  );
}
\;
fs.writeFileSync('src/pages/Virtualizer.tsx', content);
