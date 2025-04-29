import React from "react";
import { FormSection } from "../types/form";

interface FormProgressProps {
  sections: FormSection[];
  currentSectionIndex: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ sections, currentSectionIndex }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {sections.map((section, index) => {
          const isCompleted = index < currentSectionIndex;
          const isCurrent = index === currentSectionIndex;
          
          return (
            <React.Fragment key={section.sectionId}>
              {/* Section circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`mt-1 text-xs ${isCurrent ? "text-indigo-600 font-medium" : "text-gray-500"}`}>
                  {section.title.length > 15 ? `${section.title.substring(0, 15)}...` : section.title}
                </span>
              </div>
              
              {/* Connector line */}
              {index < sections.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    index < currentSectionIndex ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;