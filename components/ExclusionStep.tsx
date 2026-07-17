import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface ExclusionStepProps {
  score: number;
  onPass: () => void;
  onFail: (reason: string) => void;
}

export const ExclusionStep: React.FC<ExclusionStepProps> = ({ score, onPass, onFail }) => {
  
  // Calculate severity for display
  let severity = '轻度症状';
  if (score >= 21) severity = '中度症状';
  if (score >= 46) severity = '重度症状';

  const handleFail = () => {
    onFail("部分基本筛选条件未满足（如年龄范围、隐形眼镜史、眼部手术史、眼表炎症、其他眼部或全身疾病、备孕/孕期/哺乳期或行动不便等）");
  };

  const handlePass = () => {
    onPass();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 shadow-sm">
         <h3 className="text-lg font-bold text-green-800 flex items-center gap-2 mb-1">
            <CheckCircle2 className="text-green-600" />
            符合初步入组条件
         </h3>
         <p className="text-green-700 leading-relaxed">
            您的OSDI为 <span className="font-bold text-lg">{score}</span> 分，
            考虑有 <span className="font-bold">{severity}</span> 的干眼，符合入组条件，接下来进行基本情况筛查。
         </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-500" />
          快速筛查
        </h2>
        <p className="text-slate-600">
          为了确保您的安全和研究的准确性，请确认您是否<strong>完全符合</strong>以下所有基本要求：
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-4 text-slate-800 text-sm sm:text-base">
        <ol className="list-decimal pl-5 space-y-2.5 marker:text-brand-600 font-medium">
          <li>年龄为 <span className="font-bold">18-65</span> 岁</li>
          <li>近2周<span className="font-bold text-brand-700">未佩戴</span>隐形眼镜，且未来3个月无佩戴计划</li>
          <li>过去12个月<span className="font-bold text-brand-700">无</span>眼部手术史（如LASIK、SMILE等）或有过眼外伤</li>
          <li>过去3个月<span className="font-bold text-brand-700">无</span>急性过敏性结膜炎、感染或眼表炎症</li>
          <li><span className="font-bold text-brand-700">无</span>青光眼、眼睑功能异常、神经系统或精神类疾病</li>
          <li><span className="font-bold text-brand-700">不处于</span>备孕、孕期、哺乳期或行动不便</li>
        </ol>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 flex items-start gap-2 border border-yellow-100">
        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-yellow-600" />
        <p>必须<strong>完全符合上述所有条件</strong>，方可继续参与本研究。</p>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-4">
        <button
          onClick={handleFail}
          className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600 font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <XCircle className="text-slate-400" />
          我不符合上述条件之一（退出筛选）
        </button>
        
        <button
          onClick={handlePass}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 />
          我完全符合上述所有条件（继续）
        </button>
      </div>
    </div>
  );
};
