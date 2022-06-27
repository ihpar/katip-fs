import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useLanguage from "hooks/use-language";
import Card from "./Card";

import "./Modal.scss";

const Modal: React.FC<{ show: boolean; kill: boolean; onClose: () => void; }> = ({
  show,
  kill,
  onClose,
  children,
}) => {
  const { t } = useLanguage("utils");
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      modalContentRef.current?.classList.remove("opening");
      overlayRef.current?.classList.remove("opening");
    } else {
      modalContentRef.current?.classList.add("closing");
      overlayRef.current?.classList.add("closing");
    }
  }, [show]);

  if (kill) {
    return null;
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    (
      <>
        <div role="button" aria-label={t.close_modal} tabIndex={0} onClick={onClose} onKeyDown={keyDownHandler} ref={overlayRef} className="overlay opening" />
        <div ref={modalContentRef} data-testid="modal-content-wrapper" className="modal-content-wrapper opening">
          <Card>
            {children}
          </Card>
        </div>
      </>
    ),
    document.getElementById("overlay-root")!,
  );
};

export default Modal;
