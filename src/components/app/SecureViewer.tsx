import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecureViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
}

export function SecureViewer({ open, onOpenChange, title, images }: SecureViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opened
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex, images.length]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] h-[100vh] w-screen m-0 p-0 rounded-none bg-black/95 border-none flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 text-white z-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="text-xs text-white/50">Leitura Protegida Anti-Download</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
              Página {currentIndex + 1} de {images.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Viewer */}
        <div 
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          // Bloqueia botão direito do mouse
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Imagem Principal */}
          {images.length > 0 && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={images[currentIndex]}
                alt={`Página ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-300 select-none pointer-events-none"
                draggable={false}
              />
              {/* Camada invisível por cima para impedir arrastar/salvar */}
              <div className="absolute inset-0 z-10" />
            </div>
          )}

          {/* Botões de Navegação */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/50 transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/50 transition z-20 backdrop-blur-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
