export type SlideLayout = 'fullscreen' | 'split-left' | 'split-right' | 'card' | 'photo-top';

export type AppTheme = 'essential' | 'grid' | 'round' | 'forest';

export type AppFont = 'sans' | 'serif' | 'mono';

export type TransitionEffect = 'fade' | 'slide' | 'zoom' | 'flip';

export type BgmType = 'synth' | 'youtube' | 'none';

export type SynthPreset = 'peaceful' | 'curious' | 'space' | 'energetic';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  stepTag: string; // e.g., '1단계: 가설 설정', '2단계: 실험 준비', '3단계: 관찰 및 반응', '4단계: 결론'
  teamName?: string; // e.g., '3모둠 (김민준, 박서연)'
  notes: string;
  materials?: string[];
  keyFindings?: string[];
  imageUrl: string;
  imageCaption?: string;
  duration: number; // in seconds
  layout: SlideLayout;
}

export interface SlideDeck {
  id: string;
  title: string;
  subject: string; // e.g., '물리', '화학', '생명과학', '지구과학', '융합탐구'
  date: string;
  slides: Slide[];
}

export interface SlideShowSettings {
  theme: AppTheme;
  font: AppFont;
  transition: TransitionEffect;
  defaultDuration: number;
  autoplay: boolean;
  loop: boolean;
  bgmType: BgmType;
  synthPreset: SynthPreset;
  youtubeId: string;
  bgmVolume: number;
  playTransitionSfx: boolean;
  showCaptions: boolean;
  showTimerProgress: boolean;
}
