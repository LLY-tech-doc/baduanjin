import React from 'react';
import { CalendarClock, ChevronRight } from 'lucide-react';

interface CommitmentStepProps {
  onPass: () => void;
  onFail: () => void;
}

export const CommitmentStep: React.FC<CommitmentStepProps> = ({ onPass, onFail }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
          <CalendarClock className="text-brand-600" />
          时间评估
        </h2>
      </div>

      <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 shadow-sm">
        <p className="text-slate-700 leading-relaxed text-base">
          为了确保疗效评估和方案实施的完整性，<span className="font-semibold text-brand-700">在您顺利入组后，将获得：</span>
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <span className="inline-block bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">治疗指导</span>
            <p className="text-slate-700 text-sm">为期 <span className="font-bold text-brand-700">3个月</span> 的免费治疗指导</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-block bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5 shrink-0">项目周期</span>
            <p className="text-slate-700 text-sm">共计 <span className="font-bold text-brand-700">8次</span>、总计为期 <span className="font-bold text-brand-700">48周</span> 的专业评估与随访</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm text-slate-500">
        请确认您是否有足够的时间和精力配合本次研究所要求的治疗指导和后续的随访安排。
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={onPass}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          我时间充裕，愿意配合
          <ChevronRight size={20} />
        </button>
        <button
          onClick={onFail}
          className="w-full text-slate-400 hover:text-slate-600 py-3 text-sm transition-colors text-center"
        >
          我可能无法保证时间配合
        </button>
      </div>
    </div>
  );
};
