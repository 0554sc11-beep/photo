import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Users, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Image as ImageIcon
} from 'lucide-react';
import { Slide, SlideShowSettings, TransitionEffect } from '../types/slideshow';
import { THEME_CONFIGS, getFontClass } from '../utils/themeStyles';

interface SlideStageProps {
  slide: Slide;
  currentIndex: number;
  totalSlides: number;
  settings: SlideShowSettings;
  isPlaying: boolean;
  progressPercent: number;
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  onEnterFullscreen: () => void;
  isPreview?: boolean;
}

export const SlideStage: React.FC<SlideStageProps> = ({
  slide,
  currentIndex,
  totalSlides,
  settings,
  isPlaying,
  progressPercent,
  onNext,
  onPrev,
  onTogglePlay,
  onEnterFullscreen,
  isPreview = true
}) => {
  const [imageError, setImageError] = useState(false);
  const themeColors = THEME_CONFIGS[settings.theme];
  const fontClass = getFontClass(settings.font);

  // Transition variants based on settings.transition
  const getMotionVariants = (effect: TransitionEffect) => {
    switch (effect) {
      case 'slide':
        return {
          initial: { opacity: 0, x: 60 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -60 }
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.08 }
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: 45 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: -45 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const variants = getMotionVariants(settings.transition);

  // Fallback image rendering
  const renderImage = (extraClasses: string = '') => {
    if (imageError || !slide.imageUrl) {
      return (
        <div className={`w-full h-full min-h-[280px] bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 flex flex-col items-center justify-center p-6 text-center text-slate-300 ${extraClasses}`}>
          <FlaskConical className="w-16 h-16 text-blue-400 mb-3 animate-pulse-slow" />
          <p className="font-semibold text-lg">{slide.title}</p>
          <span className="text-xs opacity-75 mt-1">{slide.stepTag}</span>
        </div>
      );
    }

    return (
      <div className={`relative w-full h-full overflow-hidden ${extraClasses}`}>
        <img
          src={slide.imageUrl}
          alt={slide.title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {slide.imageCaption && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-white/90 max-w-[80%] truncate">
            {slide.imageCaption}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-none ${fontClass} ${themeColors.bg}`}>
      {/* Top Slide Progress Bar */}
      {settings.showTimerProgress && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/10 dark:bg-white/10 z-30 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Main Slide Content Animation Box */}
      <div className="relative flex-1 w-full h-full p-4 md:p-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center"
          >
            {/* Layout Mode 1: Fullscreen Bleed with Glassmorphism Overlays */}
            {slide.layout === 'fullscreen' && (
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                {renderImage('absolute inset-0 z-0')}
                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />

                <div className="relative z-20 w-full h-full p-6 md:p-10 flex flex-col justify-between text-white">
                  {/* Top Bar inside slide */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/80 backdrop-blur-md text-white shadow-sm flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" />
                        {slide.stepTag}
                      </span>
                      {slide.teamName && (
                        <span className="text-xs text-white/80 flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2.5 py-1 rounded-full">
                          <Users className="w-3.5 h-3.5" />
                          {slide.teamName}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/70 font-mono">
                      {currentIndex + 1} / {totalSlides}
                    </span>
                  </div>

                  {/* Bottom Text Card */}
                  <div className="max-w-3xl space-y-3">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="text-sm md:text-base text-blue-200 font-medium drop-shadow">
                        {slide.subtitle}
                      </p>
                    )}
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 whitespace-pre-line">
                      {slide.notes}
                    </p>

                    {slide.keyFindings && slide.keyFindings.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {slide.keyFindings.map((finding, idx) => (
                          <div 
                            key={idx} 
                            className="text-xs bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                            <span>{finding}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Layout Mode 2: Split Left (Image Left, Notes Right) */}
            {slide.layout === 'split-left' && (
              <div className={`w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border ${themeColors.border} ${themeColors.panel} shadow-xl grid grid-cols-1 md:grid-cols-2`}>
                <div className="relative h-64 md:h-full bg-slate-900">
                  {renderImage()}
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${themeColors.tagBg} ${themeColors.tagText}`}>
                        {slide.stepTag}
                      </span>
                      <span className={`text-xs font-mono ${themeColors.textMuted}`}>
                        {currentIndex + 1} / {totalSlides}
                      </span>
                    </div>

                    <h2 className={`text-xl md:text-3xl font-bold tracking-tight ${themeColors.text} mb-2`}>
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className={`text-xs md:text-sm font-medium ${themeColors.accentText} mb-4`}>
                        {slide.subtitle}
                      </p>
                    )}

                    <div className={`text-xs md:text-sm leading-relaxed ${themeColors.text} whitespace-pre-line bg-black/5 dark:bg-white/5 p-4 rounded-xl mb-4 border ${themeColors.border}`}>
                      {slide.notes}
                    </div>

                    {slide.materials && slide.materials.length > 0 && (
                      <div className="mb-4">
                        <div className={`text-xs font-semibold ${themeColors.textMuted} mb-1.5 flex items-center gap-1`}>
                          <Layers className="w-3.5 h-3.5" />
                          준비물 및 시약
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {slide.materials.map((mat, idx) => (
                            <span key={idx} className={`text-xs px-2 py-0.5 rounded border ${themeColors.border} bg-slate-100 dark:bg-slate-800 ${themeColors.text}`}>
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.keyFindings && slide.keyFindings.length > 0 && (
                      <div>
                        <div className={`text-xs font-semibold ${themeColors.textMuted} mb-1.5 flex items-center gap-1`}>
                          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                          주요 관찰 결과
                        </div>
                        <div className="space-y-1">
                          {slide.keyFindings.map((finding, idx) => (
                            <div key={idx} className={`text-xs flex items-center gap-1.5 ${themeColors.text}`}>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{finding}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {slide.teamName && (
                    <div className={`pt-4 border-t ${themeColors.border} flex items-center gap-2 text-xs ${themeColors.textMuted}`}>
                      <Users className="w-3.5 h-3.5" />
                      <span>{slide.teamName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Layout Mode 3: Split Right (Notes Left, Image Right) */}
            {slide.layout === 'split-right' && (
              <div className={`w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border ${themeColors.border} ${themeColors.panel} shadow-xl grid grid-cols-1 md:grid-cols-2`}>
                <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto scrollbar-thin order-2 md:order-1">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${themeColors.tagBg} ${themeColors.tagText}`}>
                        {slide.stepTag}
                      </span>
                      <span className={`text-xs font-mono ${themeColors.textMuted}`}>
                        {currentIndex + 1} / {totalSlides}
                      </span>
                    </div>

                    <h2 className={`text-xl md:text-3xl font-bold tracking-tight ${themeColors.text} mb-2`}>
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className={`text-xs md:text-sm font-medium ${themeColors.accentText} mb-4`}>
                        {slide.subtitle}
                      </p>
                    )}

                    <div className={`text-xs md:text-sm leading-relaxed ${themeColors.text} whitespace-pre-line bg-black/5 dark:bg-white/5 p-4 rounded-xl mb-4 border ${themeColors.border}`}>
                      {slide.notes}
                    </div>

                    {slide.keyFindings && slide.keyFindings.length > 0 && (
                      <div className="space-y-1.5">
                        {slide.keyFindings.map((finding, idx) => (
                          <div key={idx} className={`text-xs flex items-center gap-1.5 ${themeColors.text} bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{finding}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {slide.teamName && (
                    <div className={`pt-4 border-t ${themeColors.border} flex items-center gap-2 text-xs ${themeColors.textMuted}`}>
                      <Users className="w-3.5 h-3.5" />
                      <span>{slide.teamName}</span>
                    </div>
                  )}
                </div>

                <div className="relative h-64 md:h-full bg-slate-900 order-1 md:order-2">
                  {renderImage()}
                </div>
              </div>
            )}

            {/* Layout Mode 4: Centered Lab Card */}
            {slide.layout === 'card' && (
              <div className={`w-full max-w-4xl mx-auto rounded-2xl md:rounded-3xl border ${themeColors.border} ${themeColors.panel} p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center`}>
                <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
                  {renderImage()}
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${themeColors.tagBg} ${themeColors.tagText}`}>
                        {slide.stepTag}
                      </span>
                    </div>
                    <h2 className={`text-2xl font-bold tracking-tight ${themeColors.text} mb-1`}>
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className={`text-xs font-semibold ${themeColors.accentText} mb-3`}>
                        {slide.subtitle}
                      </p>
                    )}
                    <p className={`text-xs md:text-sm ${themeColors.text} leading-relaxed whitespace-pre-line mb-4`}>
                      {slide.notes}
                    </p>

                    {slide.keyFindings && (
                      <div className="space-y-1 mb-3">
                        {slide.keyFindings.map((finding, idx) => (
                          <div key={idx} className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{finding}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {slide.teamName && (
                    <div className={`text-xs ${themeColors.textMuted} flex items-center gap-1.5`}>
                      <Users className="w-3.5 h-3.5" />
                      {slide.teamName}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Layout Mode 5: Photo Top, Findings Bottom */}
            {slide.layout === 'photo-top' && (
              <div className={`w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border ${themeColors.border} ${themeColors.panel} shadow-xl flex flex-col`}>
                <div className="relative h-1/2 bg-slate-900">
                  {renderImage()}
                </div>
                <div className="p-6 h-1/2 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${themeColors.tagBg} ${themeColors.tagText}`}>
                        {slide.stepTag}
                      </span>
                      <span className={`text-xs font-mono ${themeColors.textMuted}`}>
                        {currentIndex + 1} / {totalSlides}
                      </span>
                    </div>
                    <h2 className={`text-xl font-bold tracking-tight ${themeColors.text}`}>
                      {slide.title}
                    </h2>
                    <p className={`text-xs md:text-sm mt-2 ${themeColors.text} leading-relaxed whitespace-pre-line`}>
                      {slide.notes}
                    </p>
                  </div>
                  {slide.teamName && (
                    <div className={`text-xs ${themeColors.textMuted} pt-2 border-t ${themeColors.border}`}>
                      {slide.teamName}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Control Bar (Only when in preview mode) */}
      {isPreview && (
        <div className="p-3 flex items-center justify-between z-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>슬라이드 {currentIndex + 1}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 hover:bg-slate-100 transition-all text-slate-700 dark:text-slate-200"
              title="이전 슬라이드 (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="p-2 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 transition-all"
              title={isPlaying ? '일시 정지 (Space)' : '슬라이드쇼 자동 재생 (Space)'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={onNext}
              disabled={currentIndex === totalSlides - 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 hover:bg-slate-100 transition-all text-slate-700 dark:text-slate-200"
              title="다음 슬라이드 (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onEnterFullscreen}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 transition-all text-slate-700 dark:text-slate-200 flex items-center gap-1 text-xs"
            title="전체화면 프레젠테이션 (F)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">전체화면</span>
          </button>
        </div>
      )}
    </div>
  );
};
