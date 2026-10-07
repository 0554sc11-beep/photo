import React, { useState } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Layout, 
  Clock, 
  Layers, 
  Users, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Copy, 
  Upload, 
  Sparkles,
  Columns,
  Maximize,
  Rows
} from 'lucide-react';
import { Slide, SlideLayout, SlideShowSettings } from '../types/slideshow';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface SlideEditorProps {
  slide: Slide;
  onUpdateSlide: (updated: Slide) => void;
  onDuplicateSlide: () => void;
  onDeleteSlide: () => void;
  onOpenPresetPicker: () => void;
  settings: SlideShowSettings;
}

const STEP_PRESETS = [
  '1단계: 가설 설정',
  '2단계: 준비 및 과정',
  '3단계: 관찰 및 반응 측정',
  '4단계: 결론 및 핵심 원리',
  '탐구 Q&A 및 생각할 점'
];

export const SlideEditor: React.FC<SlideEditorProps> = ({
  slide,
  onUpdateSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onOpenPresetPicker,
  settings
}) => {
  const [newMaterial, setNewMaterial] = useState('');
  const [newFinding, setNewFinding] = useState('');
  const themeColors = THEME_CONFIGS[settings.theme];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateSlide({ ...slide, imageUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.trim()) return;
    const mats = slide.materials || [];
    onUpdateSlide({ ...slide, materials: [...mats, newMaterial.trim()] });
    setNewMaterial('');
  };

  const handleRemoveMaterial = (index: number) => {
    const mats = (slide.materials || []).filter((_, i) => i !== index);
    onUpdateSlide({ ...slide, materials: mats });
  };

  const handleAddFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFinding.trim()) return;
    const findings = slide.keyFindings || [];
    onUpdateSlide({ ...slide, keyFindings: [...findings, newFinding.trim()] });
    setNewFinding('');
  };

  const handleRemoveFinding = (index: number) => {
    const findings = (slide.keyFindings || []).filter((_, i) => i !== index);
    onUpdateSlide({ ...slide, keyFindings: findings });
  };

  return (
    <div className={`w-full h-full flex flex-col p-4 overflow-y-auto scrollbar-thin space-y-5 text-xs ${themeColors.text}`}>
      {/* Top action row */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <span className="font-bold text-sm tracking-tight flex items-center gap-1.5">
          <Type className="w-4 h-4 text-blue-600" />
          슬라이드 상세 편집
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onDuplicateSlide}
            className={`p-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} hover:${themeColors.panelSubtle} transition-colors`}
            title="슬라이드 복제"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDeleteSlide}
            className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition-colors"
            title="슬라이드 삭제"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. Stage tag & Team */}
      <div className="space-y-2">
        <label className={`font-semibold block ${themeColors.textMuted}`}>탐구 단계 (태그)</label>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {STEP_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onUpdateSlide({ ...slide, stepTag: preset })}
              className={`px-2 py-1 rounded text-[11px] transition-colors border ${
                slide.stepTag === preset
                  ? `${themeColors.accentSoft} font-semibold`
                  : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
              }`}
            >
              {preset.split(':')[0]}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={slide.stepTag}
          onChange={(e) => onUpdateSlide({ ...slide, stepTag: e.target.value })}
          placeholder="단계 직접 입력 (예: 1단계: 가설 설정)"
          className={`w-full px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} focus:ring-2 focus:ring-blue-500 outline-none`}
        />
      </div>

      {/* 2. Slide Title & Subtitle */}
      <div className="space-y-2">
        <label className={`font-semibold block ${themeColors.textMuted}`}>슬라이드 제목</label>
        <input
          type="text"
          value={slide.title}
          onChange={(e) => onUpdateSlide({ ...slide, title: e.target.value })}
          placeholder="예: 화산 분출 시뮬레이션 관찰"
          className={`w-full px-2.5 py-2 font-medium text-sm rounded-lg border ${themeColors.border} ${themeColors.panel} focus:ring-2 focus:ring-blue-500 outline-none`}
        />
        <input
          type="text"
          value={slide.subtitle || ''}
          onChange={(e) => onUpdateSlide({ ...slide, subtitle: e.target.value })}
          placeholder="소제목 / 핵심 요약 (선택 사항)"
          className={`w-full px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} focus:ring-2 focus:ring-blue-500 outline-none`}
        />
      </div>

      {/* 3. Team & Authors */}
      <div className="space-y-1.5">
        <label className={`font-semibold flex items-center gap-1.5 ${themeColors.textMuted}`}>
          <Users className="w-3.5 h-3.5" />
          모둠 / 실험자 이름
        </label>
        <input
          type="text"
          value={slide.teamName || ''}
          onChange={(e) => onUpdateSlide({ ...slide, teamName: e.target.value })}
          placeholder="예: 3모둠 (김민준, 박서연, 이도현)"
          className={`w-full px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} focus:ring-2 focus:ring-blue-500 outline-none`}
        />
      </div>

      {/* 4. Observation Notes */}
      <div className="space-y-1.5">
        <label className={`font-semibold block ${themeColors.textMuted}`}>실험 관찰 일지 및 내용</label>
        <textarea
          rows={4}
          value={slide.notes}
          onChange={(e) => onUpdateSlide({ ...slide, notes: e.target.value })}
          placeholder="실험 과정에서 일어난 현상, 변화, 측정값, 주의점을 기록하세요."
          className={`w-full p-2.5 rounded-lg border ${themeColors.border} ${themeColors.panel} focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed`}
        />
      </div>

      {/* 5. Key Findings list */}
      <div className="space-y-2">
        <label className={`font-semibold flex items-center gap-1.5 ${themeColors.textMuted}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          핵심 관찰 결과 / 수치
        </label>
        <div className="space-y-1">
          {(slide.keyFindings || []).map((finding, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 p-1.5 rounded bg-slate-100 dark:bg-slate-800">
              <span className="truncate flex-1">{finding}</span>
              <button
                type="button"
                onClick={() => handleRemoveFinding(idx)}
                className="text-slate-400 hover:text-red-500 p-0.5"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddFinding} className="flex gap-1.5">
          <input
            type="text"
            value={newFinding}
            onChange={(e) => setNewFinding(e.target.value)}
            placeholder="결과 추가 (예: 반응 전후 온도 2.5도 하강)"
            className={`flex-1 px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} outline-none`}
          />
          <button
            type="submit"
            className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shrink-0 flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            추가
          </button>
        </form>
      </div>

      {/* 6. Image Management */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <label className={`font-semibold flex items-center justify-between ${themeColors.textMuted}`}>
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            실험 사진 관리
          </span>
          <button
            type="button"
            onClick={onOpenPresetPicker}
            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3 h-3" />
            과학 사진 갤러리 선택
          </button>
        </label>

        {/* Thumbnail Preview */}
        {slide.imageUrl && (
          <div className="relative h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <img 
              src={slide.imageUrl} 
              alt={slide.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Upload file & URL */}
        <div className="flex gap-2">
          <label className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>내 사진 업로드</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <input
          type="text"
          value={slide.imageUrl}
          onChange={(e) => onUpdateSlide({ ...slide, imageUrl: e.target.value })}
          placeholder="또는 이미지 URL 직접 입력"
          className={`w-full px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} outline-none text-[11px] font-mono`}
        />

        <input
          type="text"
          value={slide.imageCaption || ''}
          onChange={(e) => onUpdateSlide({ ...slide, imageCaption: e.target.value })}
          placeholder="사진 캡션 (예: 현미경 400배율 관찰)"
          className={`w-full px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panel} outline-none`}
        />
      </div>

      {/* 7. Layout Choice */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <label className={`font-semibold flex items-center gap-1.5 ${themeColors.textMuted}`}>
          <Layout className="w-3.5 h-3.5" />
          슬라이드 레이아웃
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => onUpdateSlide({ ...slide, layout: 'fullscreen' })}
            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
              slide.layout === 'fullscreen'
                ? `${themeColors.accentSoft} font-semibold ring-2 ring-blue-500`
                : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
            }`}
          >
            <Maximize className="w-4 h-4" />
            <span className="text-[10px]">전체 화면</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSlide({ ...slide, layout: 'split-left' })}
            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
              slide.layout === 'split-left'
                ? `${themeColors.accentSoft} font-semibold ring-2 ring-blue-500`
                : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
            }`}
          >
            <Columns className="w-4 h-4" />
            <span className="text-[10px]">사진 좌측</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSlide({ ...slide, layout: 'split-right' })}
            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
              slide.layout === 'split-right'
                ? `${themeColors.accentSoft} font-semibold ring-2 ring-blue-500`
                : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
            }`}
          >
            <Columns className="w-4 h-4 rotate-180" />
            <span className="text-[10px]">사진 우측</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSlide({ ...slide, layout: 'card' })}
            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
              slide.layout === 'card'
                ? `${themeColors.accentSoft} font-semibold ring-2 ring-blue-500`
                : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px]">중앙 카드</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSlide({ ...slide, layout: 'photo-top' })}
            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
              slide.layout === 'photo-top'
                ? `${themeColors.accentSoft} font-semibold ring-2 ring-blue-500`
                : `${themeColors.border} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`
            }`}
          >
            <Rows className="w-4 h-4" />
            <span className="text-[10px]">사진 상단</span>
          </button>
        </div>
      </div>

      {/* 8. Duration */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between">
          <label className={`font-semibold flex items-center gap-1.5 ${themeColors.textMuted}`}>
            <Clock className="w-3.5 h-3.5" />
            슬라이드 노출 시간
          </label>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            {slide.duration}초
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="30"
          step="1"
          value={slide.duration}
          onChange={(e) => onUpdateSlide({ ...slide, duration: parseInt(e.target.value) })}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>
    </div>
  );
};
