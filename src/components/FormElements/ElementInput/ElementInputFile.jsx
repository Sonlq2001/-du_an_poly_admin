import React, { memo } from 'react';
import { useFormikContext } from 'formik';

const ElementInputFile = ({ className, id, ...props }) => {
  const { values, setFieldValue, handleBlur } = useFormikContext();
  const handleFile = (e) => {
    setFieldValue('file', e.target.files[0]);
  };
  return (
    <>
      <input
        type="file"
        className={className}
        id={id}
        {...values}
        onChange={handleFile}
        {...props}
        onBlur={handleBlur}
      />
    </>
  );
};

export default memo(ElementInputFile);
