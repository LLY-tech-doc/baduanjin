import React, { useState, useEffect } from 'react';
import { Step, RecruitmentData, UserInfo } from './types';
import { IntroStep } from './components/IntroStep';
import { OSDIStep } from './components/OSDIStep';
import { ExclusionStep } from './components/ExclusionStep';
import { CommitmentStep } from './components/CommitmentStep';
import { InfoStep } from './components/InfoStep';
import { ResultStep } from './components/ResultStep';
import { RejectStep } from './components/RejectStep';
import { History } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [osdiScore, setOsdiScore] = useState<number>(0);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [savedData, setSavedData] = useState<RecruitmentData | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const data = localStorage.getItem('baduanjin_recruit_data');
    if (data) {
      setSavedData(JSON.parse(data));
    }
  }, []);

  const handleIntroNext = () => {
    setCurrentStep(Step.OSDI);
  };

  const handleOSDIComplete = (score: number) => {
    setOsdiScore(score);
    // Condition: 18-80 is eligible
    if (score >= 18 && score <= 80) {
      setCurrentStep(Step.EXCLUSION);
    } else {
      if (score < 18) {
        setRejectReason('您的OSDI评分低于18分，属于正常或极轻微干眼，暂时不符合本研究志愿者入组标准。建议您继续保持良好的用眼习惯！');
      } else {
        setRejectReason('您的OSDI评分高于80分，症状较重，建议您直接前往医院进行专业诊疗，本研究主要针对轻中度及部分重度干眼志愿者。');
      }
      setCurrentStep(Step.REJECT);
    }
  };

  const handleExclusionPass = () => {
    setCurrentStep(Step.COMMITMENT);
  };

  const handleExclusionFail = (reason: string) => {
    setRejectReason(`很遗憾，根据筛选标准：${reason}，您暂时无法作为志愿者参与本研究。感谢您的关注！`);
    setCurrentStep(Step.REJECT);
  };

  const handleCommitmentPass = () => {
    setCurrentStep(Step.INFO);
  };

  const handleCommitmentFail = () => {
    setRejectReason('本研究在您顺利入组后，需要您配合为期3个月的治疗指导与共8次、为期48周的随访评估。既然您暂时无法保证时间，遗憾无法纳入。谢谢您的关注！');
    setCurrentStep(Step.REJECT);
  };

  const handleInfoSubmit = (info: UserInfo) => {
    // Calculate severity based on user description boundaries
    // <=20 Mild, 21-45 Moderate, >=46 Severe
    let severity = '轻度症状';
    if (osdiScore >= 21) severity = '中度症状';
    if (osdiScore >= 46) severity = '重度症状';

    const finalData: RecruitmentData = {
      osdiScore,
      osdiSeverity: severity,
      userInfo: info,
      timestamp: new Date().toLocaleString()
    };

    localStorage.setItem('baduanjin_recruit_data', JSON.stringify(finalData));
    setSavedData(finalData);
    setCurrentStep(Step.RESULT);
  };

  const handleRestart = () => {
    setRejectReason('');
    setOsdiScore(0);
    setCurrentStep(Step.INTRO);
  };

  const handleViewSaved = () => {
    if (savedData) {
      setCurrentStep(Step.RESULT);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
        
        {/* Header */}
        <div className="bg-brand-600 p-6 text-white flex justify-between items-center">
          <div className="flex-1 pr-4">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">行为干预对比人工泪液治疗干眼的随机对照试验</h1>
            <p className="text-brand-100 text-sm mt-1">临床研究志愿者预筛选</p>
          </div>
          {currentStep === Step.INTRO && savedData && (
             <button 
               onClick={handleViewSaved}
               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs transition-colors shrink-0"
             >
               <History size={14} />
               查看上次结果
             </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {currentStep === Step.INTRO && <IntroStep onNext={handleIntroNext} />}
          {currentStep === Step.OSDI && <OSDIStep onComplete={handleOSDIComplete} />}
          {currentStep === Step.EXCLUSION && <ExclusionStep score={osdiScore} onPass={handleExclusionPass} onFail={handleExclusionFail} />}
          {currentStep === Step.COMMITMENT && <CommitmentStep onPass={handleCommitmentPass} onFail={handleCommitmentFail} />}
          {currentStep === Step.INFO && <InfoStep onSubmit={handleInfoSubmit} />}
          {currentStep === Step.RESULT && savedData && <ResultStep data={savedData} />}
          {currentStep === Step.REJECT && <RejectStep reason={rejectReason} onRestart={handleRestart} />}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 text-center text-slate-400 text-xs border-t border-slate-100">
          <p>本研究最终解释权归项目医生团队所有</p>
        </div>
      </div>
    </div>
  );
}
