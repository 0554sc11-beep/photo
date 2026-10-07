import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  X, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';
import { SlideStage } from './SlideStage';
import { Slide, SlideShowSettings } from '../types/slideshow';
import { audioEngine } from '../utils/audioEngine';

interface PresentationModeProps {
  slides: Slide[];
  currentIndex: number;
  settings: SlideShowSettings;
  isPlaying: boolean;
  progressPercent: number;
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  onClose: () => void;
  onSelectSlide: (idx: number) => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isFinished: boolean;
  onRestart: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  slides,
  currentIndex,
  settings,
  isPlaying,
  progressPercent,
  onNext,
  onPrev,
  onTogglePlay,
  onClose,
  onSelectSlide,
  isBgmPlaying,
  onToggleBgm,
  isFinished,
  onRestart
}) => {
  const [showHud, setShowHud] = useState(true);
  const hudTimeoutRef = useRef<number | null>(null);

  // Mouse idle detection to hide controls during presentation
  const handleMouseMove = () => {
    setShowHud(true);
    if (hudTimeoutRef.current !== null) {
      window.clearTimeout(hudTimeoutRef.current);
    }
    hudTimeoutRef.current = window.setTimeout(() => {
      setShowHud(false);
    }, 2800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        onPrev();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        onTogglePlay();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'm' || e.key === 'M') {
        onToggleBgm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    };
  }, [onNext, onPrev, onTogglePlay, onClose, onToggleBgm]);

  // If finished, show the celebration completion screen
  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
        <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-yellow-500/20 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                실험 발표 완료! 🎉
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                오늘의 탐구 기록과 실험 결과를 모두 확인했습니다. 멋진 과학자 여러분, 수고하셨습니다!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                처음부터 다시 보기
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <X className="w-4 h-4" />
                편집 모드로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-hidden cursor-default select-none"
    >
      {/* Slide Canvas */}
      <div className="relative flex-1 w-full h-full">
        <SlideStage
          slide={currentSlide}
          currentIndex={currentIndex}
          totalSlides={slides.length}
          settings={settings}
          isPlaying={isPlaying}
          progressPercent={progressPercent}
          onNext={onNext}
          onPrev={onPrev}
          onTogglePlay={onTogglePlay}
          onEnterFullscreen={() => {}}
          isPreview={false}
        />
      </div>

      {/* Floating Interactive HUD Controls (auto-fades when idle) */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          showHud ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl text-white">
          {/* Prev */}
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 transition-all text-white"
            title="이전 슬라이드 (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
            title={isPlaying ? '일시 정지 (Space)' : '재생 (Space)'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={currentIndex === slides.length - 1}
            className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-30 transition-all text-white"
            title="다음 슬라이드 (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-[1px] h-6 bg-white/20 mx-1" />

          {/* BGM Toggle */}
          <button
            onClick={onToggleBgm}
            className={`p-2 rounded-xl hover:bg-white/10 transition-colors ${isBgmPlaying ? 'text-blue-400' : 'text-slate-400'}`}
            title="음악 켜기/끄기 (M)"
          >
            {isBgmPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Slide counter */}
          <div className="px-2 text-xs font-mono font-medium text-slate-300">
            {currentIndex + 1} / {slides.length}
          </div>

          <div className="w-[1px] h-6 bg-white/20 mx-1" />

          {/* Exit Fullscreen / Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
            title="발표 종료 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
