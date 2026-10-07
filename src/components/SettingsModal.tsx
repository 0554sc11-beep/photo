import React from 'react';
import { 
  X, 
  Palette, 
  Type, 
  Sparkles, 
  Clock, 
  Music, 
  Volume2, 
  Check, 
  RotateCw,
  Sliders,
  Bell
} from 'lucide-react';
import { SlideShowSettings, AppTheme, AppFont, TransitionEffect, BgmType, SynthPreset } from '../types/slideshow';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SlideShowSettings;
  onUpdateSettings: (newSettings: Partial<SlideShowSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  const currentTheme = THEME_CONFIGS[settings.theme];

  const themes: { id: AppTheme; label: string; desc: string; previewColor: string }[] = [
    { id: 'essential', label: '연구소 화이트 (기본)', desc: '단정하고 깔끔한 백색 연구실 스타일', previewColor: 'bg-blue-600' },
    { id: 'grid', label: '우주 & 다크 그리드', desc: '몰입감 높은 천체/사이버 다크', previewColor: 'bg-indigo-600' },
    { id: 'round', label: '파스텔 핑크', desc: '부드럽고 친근한 웜톤 스타일', previewColor: 'bg-rose-500' },
    { id: 'forest', label: '에메랄드 사이언스', desc: '자연·생명과학 느낌의 그린 톤', previewColor: 'bg-emerald-600' }
  ];

  const fonts: { id: AppFont; label: string; sample: string }[] = [
    { id: 'sans', label: '고딕 (기본)', sample: '산과 염기의 중화 반응과 화학 원리' },
    { id: 'serif', label: '명조 (학술 논문)', sample: '식물 세포벽과 핵의 광학 현미경 관찰' },
    { id: 'mono', label: '코딩 모노 (데이터)', sample: 'T_start = 21.2°C; P_max = 65 psi;' }
  ];

  const transitions: { id: TransitionEffect; label: string }[] = [
    { id: 'fade', label: '부드러운 페이드' },
    { id: 'slide', label: '좌우 슬라이드' },
    { id: 'zoom', label: '줌 인 확대' },
    { id: 'flip', label: '3D 플립 회전' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto scrollbar-thin rounded-2xl border ${currentTheme.border} ${currentTheme.panel} shadow-2xl p-6 ${currentTheme.text}`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">슬라이드쇼 환경 설정</h2>
              <p className="text-xs text-slate-500">테마, 글꼴, 전환 효과 및 배경음악을 맞춤 설정하세요.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 pt-5">
          {/* 1. Theme Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-500" />
              배경 테마 스타일
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdateSettings({ theme: t.id })}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                    settings.theme === t.id
                      ? `${currentTheme.accentSoft} border-blue-500 shadow-sm ring-2 ring-blue-500/20`
                      : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${t.previewColor}`} />
                      <span className="text-xs font-semibold">{t.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">{t.desc}</p>
                  </div>
                  {settings.theme === t.id && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Font Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-blue-500" />
              글꼴 (타이포그래피)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ font: f.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    settings.font === f.id
                      ? `${currentTheme.accentSoft} border-blue-500 shadow-sm`
                      : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">{f.label}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{f.sample}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Transitions */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              슬라이드 전환 애니메이션
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {transitions.map((tr) => (
                <button
                  key={tr.id}
                  onClick={() => onUpdateSettings({ transition: tr.id })}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                    settings.transition === tr.id
                      ? `${currentTheme.accentSoft} border-blue-500 shadow-sm font-semibold`
                      : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Slideshow Timing & Options */}
          <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                기본 슬라이드 노출 시간
              </label>
              <span className="font-mono font-bold text-xs text-blue-600">
                {settings.defaultDuration}초
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={settings.defaultDuration}
              onChange={(e) => onUpdateSettings({ defaultDuration: parseInt(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold">슬라이드쇼 반복 재생 (Loop)</div>
                <div className="text-[11px] text-slate-500">마지막 슬라이드 후 다시 처음으로 순환</div>
              </div>
              <input
                type="checkbox"
                checked={settings.loop}
                onChange={(e) => onUpdateSettings({ loop: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold">슬라이드 타이머 진행 바 표시</div>
                <div className="text-[11px] text-slate-500">슬라이드 상단에 남은 시간 게이지 애니메이션</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showTimerProgress}
                onChange={(e) => onUpdateSettings({ showTimerProgress: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  슬라이드 전환 차임벨 효과음
                </div>
                <div className="text-[11px] text-slate-500">슬라이드가 넘어갈 때 산뜻한 종소리 재생</div>
              </div>
              <input
                type="checkbox"
                checked={settings.playTransitionSfx}
                onChange={(e) => onUpdateSettings({ playTransitionSfx: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* 5. BGM / Audio Settings */}
          <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-blue-500" />
              배경음악 (BGM) 오디오 소스
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ bgmType: 'synth' })}
                className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                  settings.bgmType === 'synth'
                    ? `${currentTheme.accentSoft} border-blue-500 font-semibold shadow-sm`
                    : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                }`}
              >
                내장 앰비언트 신스
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ bgmType: 'youtube' })}
                className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                  settings.bgmType === 'youtube'
                    ? `${currentTheme.accentSoft} border-blue-500 font-semibold shadow-sm`
                    : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                }`}
              >
                유튜브 BGM 링크
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ bgmType: 'none' })}
                className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                  settings.bgmType === 'none'
                    ? `${currentTheme.accentSoft} border-blue-500 font-semibold shadow-sm`
                    : `border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`
                }`}
              >
                배경음악 없음
              </button>
            </div>

            {settings.bgmType === 'synth' && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                <span className="text-[11px] font-semibold text-slate-500">신스 분위기 프리셋</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['peaceful', 'curious', 'space', 'energetic'] as SynthPreset[]).map((p) => {
                    const labels: Record<SynthPreset, string> = {
                      peaceful: '평온한 숲/물',
                      curious: '호기심 탐구',
                      space: '신비로운 우주',
                      energetic: '활기찬 실험'
                    };
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => onUpdateSettings({ synthPreset: p })}
                        className={`px-2 py-1.5 rounded-lg text-xs transition-all ${
                          settings.synthPreset === p
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {labels[p]}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {settings.bgmType === 'youtube' && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                <span className="text-[11px] font-semibold text-slate-500">유튜브 영상 ID 또는 URL</span>
                <input
                  type="text"
                  value={settings.youtubeId}
                  onChange={(e) => onUpdateSettings({ youtubeId: e.target.value })}
                  placeholder="예: https://www.youtube.com/watch?v=jfKfPfyJRdk"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono outline-none"
                />
                <p className="text-[10px] text-slate-500">유튜브 음악이 백그라운드에서 오디오로 재생됩니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            설정 저장 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
