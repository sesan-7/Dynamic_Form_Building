import { FormSection, FormField, FormState, ValidationErrors } from "../types/form";

export const validateField = (field: FormField, value: any): string => {
  // Check required fields
  if (field.required && (value === undefined || value === null || value === "")) {
    return field.validation?.message || "This field is required";
  }

  // For text-based fields, check length constraints
  if (typeof value === "string" && (
    field.type === "text" || 
    field.type === "email" || 
    field.type === "tel" || 
    field.type === "textarea"
  )) {
    if (field.minLength && value.length < field.minLength) {
      return `Minimum length is ${field.minLength} characters`;
    }
    
    if (field.maxLength && value.length > field.maxLength) {
      return `Maximum length is ${field.maxLength} characters`;
    }
    
    // Email validation
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    
    // Phone validation (basic)
    if (field.type === "tel" && value && !/^\+?[0-9\s\-()]{7,}$/.test(value)) {
      return "Please enter a valid phone number";
    }
  }
  
  return "";
};

export const validateSection = (section: FormSection, formValues: FormState): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  section.fields.forEach((field) => {
    const value = formValues[field.fieldId];
    const error = validateField(field, value);
    
    if (error) {
      errors[field.fieldId] = error;
    }
  });
  
  return errors;
};