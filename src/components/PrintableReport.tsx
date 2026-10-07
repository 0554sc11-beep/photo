import React from 'react';
import { SlideDeck } from '../types/slideshow';
import { FlaskConical, Users, CheckCircle2 } from 'lucide-react';

interface PrintableReportProps {
  deck: SlideDeck;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ deck }) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>과목: {deck.subject}</span>
          <span>작성일: {deck.date}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-black flex items-center gap-2">
          {deck.title}
        </h1>
        <p className="text-sm text-gray-700 mt-1">과학 수업 탐구 발표 슬라이드 요약 보고서</p>
      </div>

      {/* Slide cards */}
      <div className="space-y-6">
        {deck.slides.map((slide, idx) => (
          <div key={slide.id} className="border border-gray-300 rounded-lg p-4 page-break-inside-avoid">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
              <span className="font-bold text-sm bg-gray-100 px-2.5 py-0.5 rounded text-gray-800">
                #{idx + 1} {slide.stepTag}
              </span>
              {slide.teamName && (
                <span className="text-xs text-gray-600">
                  {slide.teamName}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {slide.imageUrl && (
                <div className="col-span-1 rounded overflow-hidden border border-gray-200 h-32">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`${slide.imageUrl ? 'col-span-2' : 'col-span-3'} space-y-2`}>
                <h3 className="font-bold text-base text-gray-900">{slide.title}</h3>
                {slide.subtitle && (
                  <p className="text-xs font-semibold text-blue-800">{slide.subtitle}</p>
                )}
                <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed">
                  {slide.notes}
                </p>

                {slide.keyFindings && slide.keyFindings.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-gray-700">핵심 관찰 결과:</span>
                    <ul className="list-disc list-inside text-xs text-gray-800 mt-0.5">
                      {slide.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx}>{finding}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
        과학 수업 슬라이드쇼 메이커 · 탐구 발표 보고서 출력물
      </div>
    </div>
  );
};
