
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Job Details' },
    { num: 2, label: 'Compensation' },
    { num: 3, label: 'Settings' },
    { num: 4, label: 'Review' },
  ];

  return (
    <div className="mb-16 w-full relative">
      {/* Background connecting line */}
      <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-[1px] bg-[#E2E8F0] z-0"></div>
      
      <div className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const isFuture = step.num > currentStep;

          return (
            <div key={step.num} className="flex flex-col items-center w-1/4">
              <div className="bg-white dark:bg-slate-900 px-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-[#2563EB] text-[#2563EB] bg-white'
                      : isCompleted
                      ? 'border-[#2563EB] bg-[#2563EB] text-white'
                      : 'border-transparent bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B]'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                  ) : (
                    step.num
                  )}
                </div>
              </div>
              
              <div className="mt-3 text-center">
                <span
                  className={`text-[13px] font-medium transition-colors duration-300 ${
                    isActive || isCompleted
                      ? 'text-[#64748B] dark:text-slate-300'
                      : 'text-[#94A3B8] dark:text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
