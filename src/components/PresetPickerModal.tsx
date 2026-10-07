import React from 'react';
import { X, Sparkles, Check, FlaskConical } from 'lucide-react';
import { PRESET_IMAGES } from '../data/presetImages';
import { THEME_CONFIGS } from '../utils/themeStyles';
import { SlideShowSettings } from '../types/slideshow';

interface PresetPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, title: string) => void;
  currentImageUrl: string;
  settings: SlideShowSettings;
}

export const PresetPickerModal: React.FC<PresetPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentImageUrl,
  settings
}) => {
  if (!isOpen) return null;

  const currentTheme = THEME_CONFIGS[settings.theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto scrollbar-thin rounded-2xl border ${currentTheme.border} ${currentTheme.panel} shadow-2xl p-6 ${currentTheme.text}`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">과학 실험 고화질 사진 갤러리</h2>
              <p className="text-xs text-slate-500">슬라이드에 어울리는 대표 과학 탐구 실험 사진을 선택하세요.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
          {PRESET_IMAGES.map((img) => {
            const isSelected = currentImageUrl === img.url;

            return (
              <div
                key={img.id}
                onClick={() => {
                  onSelectImage(img.url, img.title);
                  onClose();
                }}
                className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] shadow-md flex flex-col ${
                  isSelected
                    ? 'border-blue-600 ring-4 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'
                }`}
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md">
                    {img.category}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-blue-600 text-white shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight">{img.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{img.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      선택하기 →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-5 mt-5 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
