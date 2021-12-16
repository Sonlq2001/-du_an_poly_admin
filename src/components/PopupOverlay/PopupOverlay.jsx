import React from 'react';

import {
  GroupPopupOverlay,
  ContentPopupOverlay,
  ActionPopup,
  ContentPopup,
} from './PopupOverlay.styles';
import { Button } from 'components/Button/Button';

const PopupOverlay = ({
  open,
  setOpen,
  children,
  title,
  scroll = false,
  isAction = false,
  size,
  textOk,
  onOk,
  loading = false,
  setDisableButton,
}) => {
  let sizePopup = '';
  switch (size) {
    case 'xl':
      sizePopup = '1100px';
      break;
    case 'lg':
      sizePopup = '900px';
      break;
    case 'md':
      sizePopup = '700px';
      break;
    default:
      sizePopup = '500px';
  }

  return (
    <div>
      <GroupPopupOverlay
        className={`${open ? 'active' : ''}`}
        onClick={() =>
          setOpen(!open) + setDisableButton && setDisableButton(false)
        }
      >
        <ContentPopupOverlay
          className={`${open ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
          size={sizePopup}
          scroll={scroll}
        >
          {title && <h3 className="title-popup">{title}</h3>}

          <ContentPopup scroll={scroll}>{children}</ContentPopup>

          {isAction && (
            <ActionPopup>
              <Button onClick={() => setOpen(!open)} size="medium">
                Hủy
              </Button>
              <Button
                type="submit"
                size="medium"
                color="primary"
                onClick={() => onOk()}
                loading={loading}
                disabled={loading}
              >
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
