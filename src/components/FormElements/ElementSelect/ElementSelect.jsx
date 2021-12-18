import React, { memo } from 'react';
import Select from 'react-select';
import { useField, ErrorMessage } from 'formik';

import { BoxSelect } from './ElementSelect.styles';

const ElementSelect = ({ label, options, placeholder,setRoleMini,setValueMajor, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const classError = meta.touched && meta.error;
  const valueSelected = options.find((option) => option.value === field.value);

  const handleSelect = (selected) => {
    const option = selected ? selected.value : selected;
    if(field.name ==="type"){
      if(option === 4){
        setRoleMini(false)
        setValueMajor(" ")
      } else{
      setRoleMini(true)
     
      }
    }
    setValueMajor(option)
    
    const valueOption = {
      target: {
        name: field.name,
        value: option,
      },
    };
    field.onChange(valueOption);

  };
  return (
    <BoxSelect className={classError ? 'error-group' : ''}>
      {label && (
        <label htmlFor="" className="label-field">
          {label}
        </label>
      )}
      <Select
        {...field}
        {...props}
        className="select-option"
        options={options}
        placeholder={placeholder}
        name={field.name}
        value={valueSelected || null}
        onChange={handleSelect}
        onBlur={() => helpers.setTouched(true)}
      />

      <ErrorMessage name={field.name} component="span" className="err-msg" />
    </BoxSelect>
  );
};

export default memo(ElementSelect);
