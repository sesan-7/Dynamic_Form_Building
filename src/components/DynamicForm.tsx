import React, { useState, useEffect } from "react";
import { FormSection as SectionType, FormField, FormState, ValidationErrors, FormResponse } from "../types/form";
import FormSection from "./FormSection";
import FormProgress from "./FormProgress";
import { getFormStructure } from "../services/api";
import { validateField, validateSection } from "../utils/validation";

interface DynamicFormProps {
  rollNumber: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ rollNumber }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormResponse | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormState>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const data = await getFormStructure(rollNumber);
        setFormData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [rollNumber]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    
    // Validate the field as user types
    const currentSection = formData?.form.sections[currentSectionIndex];
    const field = currentSection?.fields.find((f) => f.fieldId === fieldId);
    
    if (field) {
      const fieldError = validateField(field, value);
      
      setErrors((prev) => ({
        ...prev,
        [fieldId]: fieldError,
      }));
    }
  };

  const handleNext = () => {
    const currentSection = formData?.form.sections[currentSectionIndex];
    
    if (!currentSection) return;
    
    // Validate all fields in current section
    const sectionErrors = validateSection(currentSection, formValues);
    
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      return;
    }
    
    // Clear errors and proceed to next section
    setErrors({});
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentSectionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    const currentSection = formData?.form.sections[currentSectionIndex];
    
    if (!currentSection) return;
    
    // Validate all fields in the last section
    const sectionErrors = validateSection(currentSection, formValues);
    
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      return;
    }
    
    // All sections validated, display form data
    console.log("Form submission data:", formValues);
    
    // You could show a success message or redirect here
    alert("Form submitted successfully! Check console for form data.");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
        {error || "Could not load form data"}
      </div>
    );
  }

  const currentSection = formData.form.sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === formData.form.sections.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700">{formData.form.formTitle}</h2>
        <p className="text-gray-600 text-center mt-1">Form ID: {formData.form.formId} | Version: {formData.form.version}</p>
      </div>
      
      {formData.form.sections.length > 1 && (
        <FormProgress 
          sections={formData.form.sections} 
          currentSectionIndex={currentSectionIndex} 
        />
      )}
      
      <FormSection
        section={currentSection}
        formValues={formValues}
        onChange={handleFieldChange}
        errors={errors}
        isFirst={isFirstSection}
        isLast={isLastSection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DynamicForm;