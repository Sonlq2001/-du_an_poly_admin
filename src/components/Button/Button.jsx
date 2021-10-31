import React from 'react';

import { ButtonCustom } from './Buttons.styles';

export const Button = ({
  children,
  color,
  href,
  onClick,
  disabled,
  size,
  icon,
  type,
  loading = false,
}) => {
  let colorButton = '';
  switch (color) {
    case 'warning':
      colorButton = '#FBB837';
      break;
    case 'danger':
      colorButton = '#E54B3C';
      break;
    case 'info':
      colorButton = '#17a2b8';
      break;
    case 'success':
      colorButton = '#04aa6d';
      break;
    case 'primary':
      colorButton = '#3498DB';
      break;
    default:
      colorButton = '#fff';
  }

  let sizeButton = { fontSize: '', padding: '' };
  switch (size) {
    case 'small':
      sizeButton = { fontSize: '1.4rem', padding: '8px 10px' };
      break;
    case 'large':
      sizeButton = { fontSize: '1.6rem', padding: '12px 14px' };
      break;
    default:
      sizeButton = { fontSize: '1.5rem', padding: '10px 12px' };
  }
  const isLink = href === undefined ? true : false;
  return isLink ? (
    <ButtonCustom
      color={colorButton}
      onClick={!disabled ? onClick : () => {}}
      size={sizeButton}
      disabled={disabled}
      type={type}
    >
      {icon &&
        (loading ? (
          <span className="loader"></span>
        ) : (
          <span className={`icon-btn ${children ? '' : 'active'}`}>{icon}</span>
        ))}

      {children && <span className="text-btn">{children}</span>}
    </ButtonCustom>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className="text-btn">
      <ButtonCustom color={colorButton} size={sizeButton}>
        <span className="icon-btn">{icon}</span>
        {children}
      </ButtonCustom>
    </a>
  );
};
