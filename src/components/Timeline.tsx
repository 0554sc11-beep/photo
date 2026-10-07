import React, { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  GripVertical, 
  FlaskConical,
  Clock
} from 'lucide-react';
import { Slide, SlideShowSettings } from '../types/slideshow';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface TimelineProps {
  slides: Slide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onReorderSlides: (startIndex: number, endIndex: number) => void;
  settings: SlideShowSettings;
}

export const Timeline: React.FC<TimelineProps> = ({
  slides,
  currentIndex,
  onSelectSlide,
  onAddSlide,
  onReorderSlides,
  settings
}) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const themeColors = THEME_CONFIGS[settings.theme];

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== targetIndex) {
      onReorderSlides(draggedIdx, targetIndex);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const moveSlideLeft = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index > 0) {
      onReorderSlides(index, index - 1);
    }
  };

  const moveSlideRight = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < slides.length - 1) {
      onReorderSlides(index, index + 1);
    }
  };

  return (
    <div className={`w-full p-3 border-t ${themeColors.border} ${themeColors.panel} flex items-center gap-3 overflow-x-auto scrollbar-thin transition-colors duration-300`}>
      <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          슬라이드 목록 ({slides.length})
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isDragging = draggedIdx === idx;
          const isDragOver = dragOverIdx === idx;

          return (
            <div
              key={slide.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, idx)}
              onClick={() => onSelectSlide(idx)}
              className={`group relative shrink-0 w-36 h-24 rounded-xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                isDragging ? 'opacity-40 scale-95' : ''
              } ${
                isDragOver ? 'scale-105 border-blue-500 border-dashed ring-2 ring-blue-400' : ''
              } ${
                isActive
                  ? 'border-blue-600 shadow-md ring-2 ring-blue-500/30'
                  : `${themeColors.border} hover:border-slate-400 dark:hover:border-slate-600`
              }`}
            >
              {/* Background preview */}
              {slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-slate-400" />
                </div>
              )}

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Top badges */}
              <div className="relative z-10 p-1.5 flex items-center justify-between text-white text-[10px]">
                <span className="px-1.5 py-0.5 rounded bg-black/60 font-mono font-bold backdrop-blur-sm">
                  #{idx + 1}
                </span>
                <span className="px-1 py-0.5 rounded bg-black/60 font-mono flex items-center gap-0.5 backdrop-blur-sm">
                  <Clock className="w-2.5 h-2.5" />
                  {slide.duration}s
                </span>
              </div>

              {/* Title & Quick arrow controls */}
              <div className="relative z-10 p-1.5 flex items-center justify-between text-white">
                <span className="text-[11px] font-medium leading-tight truncate drop-shadow max-w-[85px]">
                  {slide.title}
                </span>

                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 bg-black/70 rounded p-0.5 backdrop-blur-sm transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => moveSlideLeft(idx, e)}
                    disabled={idx === 0}
                    className="p-0.5 hover:text-blue-400 disabled:opacity-30"
                    title="앞으로 이동"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => moveSlideRight(idx, e)}
                    disabled={idx === slides.length - 1}
                    className="p-0.5 hover:text-blue-400 disabled:opacity-30"
                    title="뒤로 이동"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add slide button */}
        <button
          onClick={onAddSlide}
          className={`shrink-0 w-28 h-24 rounded-xl border-2 border-dashed ${themeColors.border} hover:border-blue-500 bg-slate-100/60 dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:text-blue-600 transition-all active:scale-95`}
          title="새 슬라이드 추가"
        >
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold">슬라이드 추가</span>
        </button>
      </div>
    </div>
  );
};
