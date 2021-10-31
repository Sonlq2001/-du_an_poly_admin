import React from 'react';

const CheckboxSingle = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange ? onChange : () => {}}
    />
  );
};

export default CheckboxSingle;
