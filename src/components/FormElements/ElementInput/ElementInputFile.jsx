import React, { memo } from 'react';
import { useFormikContext } from 'formik';
import { Label } from './ElementInput.styles';

const ElementInputFile = ({ className, name, value, id,title, ...props }) => {
  const { setFieldValue, setTouched } = useFormikContext();

  const handleFile = (e) => {
    console.log("vô đây ")
  };

  return (
    <>
    <Label htmlFor={id} className="labelFile">
       <input
        type="file"
        className={className}
        id={id}
        onChange={handleFile}
        {...props}
        value={value}
        hidden
        onBlur={() => setTouched(true)}
         />
        {title}
    </Label>
    
    </>
  );
};

export default memo(ElementInputFile);
