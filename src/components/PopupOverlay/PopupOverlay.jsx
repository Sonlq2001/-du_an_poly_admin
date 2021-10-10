import React from 'react';

import {
  GroupPopupOverlay,
  ContentPopupOverlay,
  ActionPopup,
  ContentPopup,
} from './PopupOverlay.styles';
import { Button } from './../../components/Button/Button';

const PopupOverlay = ({
  open,
  setOpen,
  children,
  title,
  scroll = false,
  isAction = false,
  size,
  textOk,
}) => {
  let sizePopup = '';
  switch (size) {
    case 'xxl':
      sizePopup = '1000px';
      break;
    case 'lg':
      sizePopup = '800px';
      break;
    case 'md':
      sizePopup = '600px';
      break;
    default:
      sizePopup = '450px';
  }

  return (
    <div>
      <GroupPopupOverlay
        className={`${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <ContentPopupOverlay
          className={`${open ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
          size={sizePopup}
        >
          {title && <h3 className="title-popup">{title}</h3>}

          <ContentPopup scroll={scroll}>{children}</ContentPopup>

          {isAction && (
            <ActionPopup>
              <Button onClick={() => setOpen(!open)} size="medium">
                Hủy
              </Button>
              <Button type="submit" size="medium" color="primary">
                {textOk ? textOk : 'Lưu'}
              </Button>
            </ActionPopup>
          )}
        </ContentPopupOverlay>
      </GroupPopupOverlay>
    </div>
  );
};

export default PopupOverlay;
