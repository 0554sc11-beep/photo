import React, { useState } from 'react';
import { 
  Play, 
  Settings as SettingsIcon, 
  Music, 
  Volume2, 
  VolumeX, 
  Download, 
  PlusCircle, 
  FolderOpen, 
  Sparkles,
  FlaskConical,
  Edit3,
  Check
} from 'lucide-react';
import { SlideDeck, SlideShowSettings } from '../types/slideshow';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface HeaderProps {
  currentDeck: SlideDeck;
  onUpdateDeckTitle: (newTitle: string) => void;
  availableDecks: SlideDeck[];
  onSelectDeck: (deckId: string) => void;
  onCreateNewDeck: () => void;
  onStartPresentation: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
  settings: SlideShowSettings;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  onVolumeChange: (vol: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDeck,
  onUpdateDeckTitle,
  availableDecks,
  onSelectDeck,
  onCreateNewDeck,
  onStartPresentation,
  onOpenSettings,
  onOpenExport,
  settings,
  isBgmPlaying,
  onToggleBgm,
  onVolumeChange
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(currentDeck.title);
  const [isDeckDropdownOpen, setIsDeckDropdownOpen] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const themeColors = THEME_CONFIGS[settings.theme];

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput.trim()) {
      onUpdateDeckTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header 
      id="main-header" 
      className={`px-5 py-3 border-b ${themeColors.border} ${themeColors.panel} flex flex-wrap items-center justify-between gap-3 z-20 relative transition-colors duration-300 shadow-sm`}
    >
      {/* Left: Brand & Deck Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <FlaskConical className="w-5 h-5" />
          </span>
          
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="flex items-center gap-1.5">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                autoFocus
                onBlur={handleTitleSubmit}
                className={`text-lg font-bold tracking-tight px-2 py-0.5 rounded border ${themeColors.border} ${themeColors.panel} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                title="확인"
              >
                <Check className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <h1 
                id="app-title-display" 
                onClick={() => {
                  setTitleInput(currentDeck.title);
                  setIsEditingTitle(true);
                }}
                className={`text-lg md:text-xl font-bold tracking-tight ${themeColors.text} flex items-center gap-2 cursor-pointer group hover:opacity-85 transition-opacity`}
                title="클릭하여 제목 수정"
              >
                {currentDeck.title}
                <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </h1>
            </div>
          )}
        </div>

        {/* Deck Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDeckDropdownOpen(!isDeckDropdownOpen)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border ${themeColors.border} ${themeColors.panelSubtle} ${themeColors.textMuted} hover:${themeColors.text} flex items-center gap-1.5 transition-colors`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">예시 주제 변경</span>
          </button>

          {isDeckDropdownOpen && (
            <div className={`absolute top-full left-0 mt-1.5 w-72 rounded-xl border ${themeColors.border} ${themeColors.panel} shadow-xl p-2 z-50`}>
              <div className="text-xs font-semibold px-2 py-1 text-slate-400">과학 실험 템플릿</div>
              <div className="space-y-1 mt-1">
                {availableDecks.map((deck) => (
                  <button
                    key={deck.id}
                    onClick={() => {
                      onSelectDeck(deck.id);
                      setIsDeckDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      deck.id === currentDeck.id 
                        ? `${themeColors.accentSoft} font-medium` 
                        : `hover:${themeColors.panelSubtle} ${themeColors.text}`
                    }`}
                  >
                    <span className="truncate">{deck.title}</span>
                    <span className="text-[10px] opacity-60 ml-2 shrink-0">{deck.slides.length}장</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1.5 pt-1.5">
                <button
                  onClick={() => {
                    onCreateNewDeck();
                    setIsDeckDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-medium transition-colors`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  새 슬라이드쇼 만들기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* BGM Toggle & Volume Control */}
        <div className="relative">
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 p-0.5">
            <button
              onClick={onToggleBgm}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isBgmPlaying 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : `${themeColors.textMuted} hover:${themeColors.text}`
              }`}
              title={isBgmPlaying ? '배경음악 끄기' : '배경음악 켜기 (잔잔한 연구실 앰비언트)'}
            >
              <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce' : ''}`} />
              <span className="hidden md:inline">{isBgmPlaying ? 'BGM 켜짐' : 'BGM'}</span>
            </button>
            <button
              onClick={() => setShowVolumePopup(!showVolumePopup)}
              className={`p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200`}
              title="음량 조절"
            >
              {settings.bgmVolume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showVolumePopup && (
            <div className={`absolute top-full right-0 mt-2 p-3 w-48 rounded-xl border ${themeColors.border} ${themeColors.panel} shadow-xl z-50`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={themeColors.textMuted}>배경음악 볼륨</span>
                <span className={`font-mono font-medium ${themeColors.text}`}>
                  {Math.round(settings.bgmVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.bgmVolume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Export / Print */}
        <button
          onClick={onOpenExport}
          className={`p-2 rounded-xl border ${themeColors.border} ${themeColors.panel} ${themeColors.textMuted} hover:${themeColors.text} hover:scale-105 active:scale-95 transition-all shadow-sm`}
          title="저장 및 내보내기 / 탐구보고서 인쇄"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Settings button */}
        <button
          id="btn-settings"
          onClick={onOpenSettings}
          className={`p-2 rounded-xl border ${themeColors.border} ${themeColors.panel} ${themeColors.textMuted} hover:${themeColors.text} hover:scale-105 active:scale-95 transition-all shadow-sm`}
          title="슬라이드쇼 설정 (테마, 폰트, 전환효과, 배경음악)"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Play / Present Button */}
        <button
          onClick={onStartPresentation}
          className={`px-4 py-2 rounded-xl ${themeColors.accent} font-semibold text-xs md:text-sm flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>발표 시작</span>
        </button>
      </div>
    </header>
  );
};
