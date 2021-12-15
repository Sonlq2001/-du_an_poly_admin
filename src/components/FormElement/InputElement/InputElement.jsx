import React from 'react';
import { useField, ErrorMessage } from 'formik';

import { GroupForm } from './InputElement.styles';
const InputElement = ({
  label,
  type = 'text',
  placeholder,
  labelBlock = false,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <GroupForm labelBlock={labelBlock}>
      {label && (
        <label htmlFor="" className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="form-input loading"
        {...field}
        {...props}
      />

      <ErrorMessage component="div" name={field.name} className="error-msg" />
    </GroupForm>
  );
};

export default InputElement;
