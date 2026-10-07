/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SlideStage } from './components/SlideStage';
import { SlideEditor } from './components/SlideEditor';
import { Timeline } from './components/Timeline';
import { PresentationMode } from './components/PresentationMode';
import { SettingsModal } from './components/SettingsModal';
import { ExportModal } from './components/ExportModal';
import { PresetPickerModal } from './components/PresetPickerModal';
import { PrintableReport } from './components/PrintableReport';

import { Slide, SlideDeck, SlideShowSettings } from './types/slideshow';
import { DEFAULT_DECKS } from './data/defaultDecks';
import { PRESET_IMAGES } from './data/presetImages';
import { audioEngine, extractYouTubeId } from './utils/audioEngine';
import { THEME_CONFIGS, getFontClass } from './utils/themeStyles';
import { Edit2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const DEFAULT_SETTINGS: SlideShowSettings = {
  theme: 'essential',
  font: 'sans',
  transition: 'fade',
  defaultDuration: 5,
  autoplay: false,
  loop: false,
  bgmType: 'synth',
  synthPreset: 'peaceful',
  youtubeId: '',
  bgmVolume: 0.5,
  playTransitionSfx: true,
  showCaptions: true,
  showTimerProgress: true
};

export default function App() {
  const [availableDecks, setAvailableDecks] = useState<SlideDeck[]>(() => {
    try {
      const saved = localStorage.getItem('science_slideshow_decks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_DECKS;
  });

  const [currentDeckId, setCurrentDeckId] = useState<string>(availableDecks[0].id);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [settings, setSettings] = useState<SlideShowSettings>(DEFAULT_SETTINGS);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Modals & Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isPresetPickerOpen, setIsPresetPickerOpen] = useState<boolean>(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState<boolean>(false);

  // Current active deck
  const currentDeck = availableDecks.find((d) => d.id === currentDeckId) || availableDecks[0];
  const slides = currentDeck.slides;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('science_slideshow_decks', JSON.stringify(availableDecks));
    } catch {
      // ignore
    }
  }, [availableDecks]);

  // Handle Autoplay & Timer progress
  useEffect(() => {
    if (!isPlaying || isFinished) {
      setProgressPercent(0);
      return;
    }

    const durationSeconds = currentSlide.duration || settings.defaultDuration;
    const intervalMs = 50;
    const stepPercent = (intervalMs / (durationSeconds * 1000)) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        const next = prev + stepPercent;
        if (next >= 100) {
          // Slide completed, go to next
          handleNextSlide();
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlideIndex, slides.length, settings.defaultDuration, isFinished]);

  // Next Slide Handler
  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgressPercent(0);
      if (settings.playTransitionSfx) {
        audioEngine.playSlideChime();
      }
    } else {
      // Reached end of presentation
      if (settings.loop) {
        setCurrentSlideIndex(0);
        setProgressPercent(0);
        if (settings.playTransitionSfx) {
          audioEngine.playSlideChime();
        }
      } else {
        setIsPlaying(false);
        setIsFinished(true);
        audioEngine.playCelebrationFanfare();
      }
    }
  };

  // Prev Slide Handler
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgressPercent(0);
      if (settings.playTransitionSfx) {
        audioEngine.playSlideChime();
      }
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isFinished) {
      setIsFinished(false);
      setCurrentSlideIndex(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  // Toggle BGM
  const handleToggleBgm = () => {
    if (isBgmPlaying) {
      audioEngine.stopSynthBgm();
      setIsBgmPlaying(false);
    } else {
      if (settings.bgmType === 'synth') {
        audioEngine.startSynthBgm(settings.synthPreset);
        setIsBgmPlaying(true);
      } else if (settings.bgmType === 'youtube') {
        setIsBgmPlaying(true);
      }
    }
  };

  // Volume change
  const handleVolumeChange = (vol: number) => {
    setSettings((prev) => ({ ...prev, bgmVolume: vol }));
    audioEngine.setVolume(vol);
  };

  // Deck operations
  const handleUpdateDeckTitle = (newTitle: string) => {
    setAvailableDecks((prev) =>
      prev.map((d) => (d.id === currentDeck.id ? { ...d, title: newTitle } : d))
    );
  };

  const handleSelectDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
    setIsFinished(false);
  };

  const handleCreateNewDeck = () => {
    const newId = `deck-${Date.now()}`;
    const newDeck: SlideDeck = {
      id: newId,
      title: '🧪 새로운 과학 실험 탐구',
      subject: '자유 탐구',
      date: new Date().toLocaleDateString('ko-KR'),
      slides: [
        {
          id: `s-${Date.now()}-1`,
          title: '새로운 과학 실험 시작하기',
          subtitle: '탐구 주제와 가설을 입력하세요',
          stepTag: '1단계: 가설 설정',
          teamName: '우리 모둠',
          notes: '실험 목적과 탐구 가설을 자유롭게 작성해보세요.',
          materials: ['기본 실험 도구'],
          keyFindings: [],
          imageUrl: PRESET_IMAGES[0].url,
          duration: 5,
          layout: 'fullscreen'
        }
      ]
    };
    setAvailableDecks((prev) => [newDeck, ...prev]);
    setCurrentDeckId(newId);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
    setIsFinished(false);
  };

  // Slide CRUD
  const handleUpdateCurrentSlide = (updated: Slide) => {
    setAvailableDecks((prev) =>
      prev.map((d) => {
        if (d.id !== currentDeck.id) return d;
        const newSlides = [...d.slides];
        newSlides[currentSlideIndex] = updated;
        return { ...d, slides: newSlides };
      })
    );
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `s-${Date.now()}`,
      title: `관찰 단계 ${slides.length + 1}`,
      subtitle: '실험 과정 및 측정',
      stepTag: `${slides.length + 1}단계: 관찰 및 반응 측정`,
      teamName: currentSlide.teamName || '',
      notes: '실험 도중 관찰된 변화나 측정 결과를 입력하세요.',
      materials: [],
      keyFindings: [],
      imageUrl: PRESET_IMAGES[slides.length % PRESET_IMAGES.length].url,
      duration: settings.defaultDuration,
      layout: 'split-left'
    };

    setAvailableDecks((prev) =>
      prev.map((d) => {
        if (d.id !== currentDeck.id) return d;
        return { ...d, slides: [...d.slides, newSlide] };
      })
    );
    setCurrentSlideIndex(slides.length);
  };

  const handleDuplicateSlide = () => {
    const duplicated: Slide = {
      ...currentSlide,
      id: `s-${Date.now()}`,
      title: `${currentSlide.title} (복사본)`
    };

    setAvailableDecks((prev) =>
      prev.map((d) => {
        if (d.id !== currentDeck.id) return d;
        const newSlides = [...d.slides];
        newSlides.splice(currentSlideIndex + 1, 0, duplicated);
        return { ...d, slides: newSlides };
      })
    );
    setCurrentSlideIndex((prev) => prev + 1);
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 1) {
      alert('슬라이드는 최소 1장 이상이어야 합니다.');
      return;
    }

    setAvailableDecks((prev) =>
      prev.map((d) => {
        if (d.id !== currentDeck.id) return d;
        const newSlides = d.slides.filter((_, idx) => idx !== currentSlideIndex);
        return { ...d, slides: newSlides };
      })
    );
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleReorderSlides = (startIndex: number, endIndex: number) => {
    setAvailableDecks((prev) =>
      prev.map((d) => {
        if (d.id !== currentDeck.id) return d;
        const result = Array.from(d.slides);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { ...d, slides: result };
      })
    );
    setCurrentSlideIndex(endIndex);
  };

  // Select Preset Image
  const handleSelectPresetImage = (url: string, title: string) => {
    handleUpdateCurrentSlide({
      ...currentSlide,
      imageUrl: url,
      imageCaption: title
    });
  };

  // Import JSON Deck
  const handleImportDeck = (deck: SlideDeck) => {
    setAvailableDecks((prev) => [deck, ...prev]);
    setCurrentDeckId(deck.id);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
  };

  const themeColors = THEME_CONFIGS[settings.theme];
  const fontClass = getFontClass(settings.font);
  const ytVideoId = extractYouTubeId(settings.youtubeId);

  return (
    <div 
      id="app-container"
      className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-300 ${themeColors.bg} ${fontClass} overflow-hidden`}
    >
      {/* Background Hidden YouTube Player (matches user snippet <div id="youtube-player"></div>) */}
      <div id="youtube-player" style={{ display: 'none' }}>
        {isBgmPlaying && settings.bgmType === 'youtube' && ytVideoId && (
          <iframe
            width="200"
            height="200"
            src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&loop=1&playlist=${ytVideoId}`}
            title="Background Audio"
            allow="autoplay"
          />
        )}
      </div>

      {/* Printable Report Component (visible only when printing) */}
      <PrintableReport deck={currentDeck} />

      {/* Main Top Header */}
      <div className="print:hidden">
        <Header
          currentDeck={currentDeck}
          onUpdateDeckTitle={handleUpdateDeckTitle}
          availableDecks={availableDecks}
          onSelectDeck={handleSelectDeck}
          onCreateNewDeck={handleCreateNewDeck}
          onStartPresentation={() => {
            setIsPresentationMode(true);
            setIsPlaying(true);
            setIsFinished(false);
            if (!isBgmPlaying && settings.bgmType !== 'none') {
              handleToggleBgm();
            }
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
          settings={settings}
          isBgmPlaying={isBgmPlaying}
          onToggleBgm={handleToggleBgm}
          onVolumeChange={handleVolumeChange}
        />
      </div>

      {/* Main Workspace (Stage + Side Editor) */}
      <main className="flex-1 w-full flex overflow-hidden relative print:hidden">
        {/* Left: Interactive Slide Stage */}
        <div className="flex-1 h-full flex flex-col overflow-hidden relative">
          <SlideStage
            slide={currentSlide}
            currentIndex={currentSlideIndex}
            totalSlides={slides.length}
            settings={settings}
            isPlaying={isPlaying}
            progressPercent={progressPercent}
            onNext={handleNextSlide}
            onPrev={handlePrevSlide}
            onTogglePlay={handleTogglePlay}
            onEnterFullscreen={() => setIsPresentationMode(true)}
            isPreview={true}
          />
        </div>

        {/* Collapsible toggle button */}
        <button
          onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-1 rounded-l-lg border-y border-l ${themeColors.border} ${themeColors.panel} shadow-md text-slate-500 hover:${themeColors.text} hidden md:flex`}
          style={{ right: isEditorCollapsed ? 0 : '360px' }}
          title={isEditorCollapsed ? '편집창 열기' : '편집창 접기'}
        >
          {isEditorCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Right: Slide Editor Inspector */}
        {!isEditorCollapsed && (
          <aside className={`w-full md:w-[360px] h-full border-l ${themeColors.border} ${themeColors.panel} shrink-0 z-20 flex flex-col transition-all duration-300 shadow-sm`}>
            <SlideEditor
              slide={currentSlide}
              onUpdateSlide={handleUpdateCurrentSlide}
              onDuplicateSlide={handleDuplicateSlide}
              onDeleteSlide={handleDeleteSlide}
              onOpenPresetPicker={() => setIsPresetPickerOpen(true)}
              settings={settings}
            />
          </aside>
        )}
      </main>

      {/* Bottom Timeline Filmstrip */}
      <footer className="print:hidden">
        <Timeline
          slides={slides}
          currentIndex={currentSlideIndex}
          onSelectSlide={(idx) => {
            setCurrentSlideIndex(idx);
            setProgressPercent(0);
          }}
          onAddSlide={handleAddSlide}
          onReorderSlides={handleReorderSlides}
          settings={settings}
        />
      </footer>

      {/* Fullscreen Presentation Mode Overlay */}
      {isPresentationMode && (
        <PresentationMode
          slides={slides}
          currentIndex={currentSlideIndex}
          settings={settings}
          isPlaying={isPlaying}
          progressPercent={progressPercent}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onTogglePlay={handleTogglePlay}
          onClose={() => {
            setIsPresentationMode(false);
            setIsPlaying(false);
          }}
          onSelectSlide={(idx) => {
            setCurrentSlideIndex(idx);
            setProgressPercent(0);
          }}
          isBgmPlaying={isBgmPlaying}
          onToggleBgm={handleToggleBgm}
          isFinished={isFinished}
          onRestart={() => {
            setIsFinished(false);
            setCurrentSlideIndex(0);
            setProgressPercent(0);
            setIsPlaying(true);
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
      />

      {/* Export / Import Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        currentDeck={currentDeck}
        onImportDeck={handleImportDeck}
        settings={settings}
      />

      {/* Preset Image Picker Modal */}
      <PresetPickerModal
        isOpen={isPresetPickerOpen}
        onClose={() => setIsPresetPickerOpen(false)}
        onSelectImage={handleSelectPresetImage}
        currentImageUrl={currentSlide.imageUrl}
        settings={settings}
      />
    </div>
  );
}
