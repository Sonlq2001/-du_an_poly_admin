import React, { memo } from 'react';
import { useFormikContext } from 'formik';

import { BoxCheckbox } from './ElementCheckbox.styles';

const ElementCheckbox = ({ id, data, name, ...props }) => {
  const { setFieldValue, values } = useFormikContext(props);

  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFieldValue(
        name,
        Array.from(new Set([...values[name], Number(value)]))
      );
    } else {
      setFieldValue(
        name,
        values[name].filter((item) =>
          item?.id ? item.id !== Number(value) : item !== Number(value)
        )
      );
    }
  };

  let mixArray = [];
  if (values !== null && values) {
    mixArray = Array.from(
      new Set(values[name].map((item) => (item?.id ? item.id : item)))
    );
  }

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <BoxCheckbox key={item.id}>
              <label htmlFor={item.id} className="label-filed label-checkbox">
                {item.name}
              </label>
              <input
                type="checkbox"
                className="checkbox-field"
                id={item.id}
                name={name}
                value={item.id}
                checked={mixArray.includes(item.id)}
                onChange={handleChange}
              />
            </BoxCheckbox>
          );
        })}
    </>
  );
};

export default memo(ElementCheckbox);
