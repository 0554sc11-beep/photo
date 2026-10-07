import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  Printer, 
  FileJson, 
  Check, 
  Copy, 
  FlaskConical,
  FileText
} from 'lucide-react';
import { SlideDeck, SlideShowSettings } from '../types/slideshow';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDeck: SlideDeck;
  onImportDeck: (deck: SlideDeck) => void;
  settings: SlideShowSettings;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  currentDeck,
  onImportDeck,
  settings
}) => {
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const themeColors = THEME_CONFIGS[settings.theme];

  if (!isOpen) return null;

  const jsonString = JSON.stringify(currentDeck, null, 2);

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.title.replace(/[^a-zA-Z0-9가-힣]/g, '_')}_slideshow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && Array.isArray(parsed.slides) && parsed.title) {
            onImportDeck(parsed);
            onClose();
          } else {
            setImportError('유효하지 않은 슬라이드쇼 데이터 형식입니다.');
          }
        } catch {
          setImportError('JSON 파일을 파싱하는 데 실패했습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto scrollbar-thin rounded-2xl border ${themeColors.border} ${themeColors.panel} shadow-2xl p-6 ${themeColors.text}`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Download className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">슬라이드 자료 내보내기 / 보관</h2>
              <p className="text-xs text-slate-500">슬라이드쇼를 파일로 저장하거나 탐구 보고서로 인쇄하세요.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 pt-5">
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Download JSON */}
            <button
              onClick={handleDownloadJson}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-left transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 w-fit group-hover:scale-105 transition-transform">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">JSON 파일 다운로드</h3>
                <p className="text-xs text-slate-500 mt-0.5">슬라이드 및 실험 관찰 데이터를 파일로 저장합니다.</p>
              </div>
            </button>

            {/* Print Report */}
            <button
              onClick={handlePrint}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 w-fit group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">실험 탐구 보고서 인쇄 (PDF)</h3>
                <p className="text-xs text-slate-500 mt-0.5">모든 슬라이드 사진과 메모를 한눈에 인쇄합니다.</p>
              </div>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-blue-600" />
              기존 슬라이드쇼 파일(JSON) 불러오기
            </h3>
            <p className="text-[11px] text-slate-500">
              이전에 저장해 둔 `.json` 슬라이드쇼 파일을 업로드하여 바로 이어 작업할 수 있습니다.
            </p>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>JSON 파일 선택</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {importError && (
              <p className="text-xs text-red-500 font-medium pt-1">{importError}</p>
            )}
          </div>

          {/* Copy JSON Code Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">데이터 미리보기</span>
              <button
                onClick={handleCopyJson}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '클립보드에 복사'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[10px] font-mono max-h-36 overflow-y-auto scrollbar-thin">
              {jsonString}
            </pre>
          </div>
        </div>

        <div className="pt-4 mt-5 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
