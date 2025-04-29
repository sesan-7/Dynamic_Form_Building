import React from "react";
import { FormField as FieldType } from "../types/form";

interface FormFieldProps {
  field: FieldType;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = field.type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    onChange(field.fieldId, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "tel":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            id={field.fieldId}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            data-testid={field.dataTestId}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        );
      
      case "textarea":
        return (
          <textarea
            id={field.fieldId}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            data-testid={field.dataTestId}
            rows={4}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        );
      
      case "dropdown":
        return (
          <select
            id={field.fieldId}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
            data-testid={field.dataTestId}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                  data-testid={option.dataTestId}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label
                  htmlFor={`${field.fieldId}-${option.value}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.fieldId}
              checked={!!value}
              onChange={handleChange}
              required={field.required}
              data-testid={field.dataTestId}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={field.fieldId}
              className="ml-2 block text-sm text-gray-700"
            >
              {field.label}
            </label>
          </div>
        );
      
      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="mb-4">
      {field.type !== "checkbox" && (
        <label
          htmlFor={field.fieldId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid={`error-${field.dataTestId}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;