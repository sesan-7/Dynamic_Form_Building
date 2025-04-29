import React from "react";
import { FormSection as SectionType, FormField as FieldType, ValidationErrors } from "../types/form";
import FormField from "./FormField";

interface FormSectionProps {
  section: SectionType;
  formValues: { [key: string]: any };
  onChange: (fieldId: string, value: any) => void;
  errors: ValidationErrors;
  isFirst: boolean;
  isLast: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  formValues,
  onChange,
  errors,
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
        <p className="text-gray-600 mt-1">{section.description}</p>
      </div>

      <div className="space-y-4">
        {section.fields.map((field: FieldType) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={formValues[field.fieldId]}
            onChange={onChange}
            error={errors[field.fieldId]}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Previous
          </button>
        )}
        
        {isFirst && <div></div>}
        
        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSection;