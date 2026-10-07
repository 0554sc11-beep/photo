import { AppTheme, AppFont } from '../types/slideshow';

export interface ThemeColors {
  bg: string;
  panel: string;
  panelSubtle: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
  accentText: string;
  tagBg: string;
  tagText: string;
}

export const THEME_CONFIGS: Record<AppTheme, ThemeColors> = {
  essential: {
    bg: 'bg-slate-50',
    panel: 'bg-white',
    panelSubtle: 'bg-slate-100/70',
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    border: 'border-slate-200',
    accent: 'bg-blue-600 hover:bg-blue-700 text-white',
    accentHover: 'hover:bg-blue-700',
    accentSoft: 'bg-blue-50 text-blue-700 border-blue-200',
    accentText: 'text-blue-600',
    tagBg: 'bg-blue-500/10 border-blue-500/20',
    tagText: 'text-blue-700'
  },
  grid: {
    bg: 'bg-slate-950',
    panel: 'bg-slate-900',
    panelSubtle: 'bg-slate-800/80',
    text: 'text-slate-100',
    textMuted: 'text-slate-400',
    border: 'border-slate-800',
    accent: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    accentHover: 'hover:bg-indigo-500',
    accentSoft: 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60',
    accentText: 'text-indigo-400',
    tagBg: 'bg-indigo-500/15 border-indigo-500/30',
    tagText: 'text-indigo-300'
  },
  round: {
    bg: 'bg-rose-50/50',
    panel: 'bg-white',
    panelSubtle: 'bg-rose-50/70',
    text: 'text-stone-900',
    textMuted: 'text-stone-500',
    border: 'border-rose-200',
    accent: 'bg-rose-600 hover:bg-rose-700 text-white',
    accentHover: 'hover:bg-rose-700',
    accentSoft: 'bg-rose-50 text-rose-700 border-rose-200',
    accentText: 'text-rose-600',
    tagBg: 'bg-rose-500/10 border-rose-500/25',
    tagText: 'text-rose-700'
  },
  forest: {
    bg: 'bg-emerald-50/40',
    panel: 'bg-white',
    panelSubtle: 'bg-emerald-50/70',
    text: 'text-emerald-950',
    textMuted: 'text-emerald-700/80',
    border: 'border-emerald-200/80',
    accent: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    accentHover: 'hover:bg-emerald-800',
    accentSoft: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentText: 'text-emerald-700',
    tagBg: 'bg-emerald-500/10 border-emerald-500/25',
    tagText: 'text-emerald-800'
  }
};

export function getFontClass(font: AppFont): string {
  switch (font) {
    case 'serif':
      return 'font-serif-kr';
    case 'mono':
      return 'font-mono-kr';
    case 'sans':
    default:
      return 'font-sans-kr';
  }
}
