import React, { memo } from 'react';
import { useFormikContext } from 'formik';

const ElementInputFile = ({ className, name, id, ...props }) => {
  const { values, setFieldValue, setTouched } = useFormikContext();
  const handleFile = (e) => {
    setFieldValue(name, e.target.files[0]);
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
        onBlur={() => setTouched(true)}
      />
    </>
  );
};

export default memo(ElementInputFile);
