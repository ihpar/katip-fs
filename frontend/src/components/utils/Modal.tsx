import { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";

import "./Modal.scss";

const Modal: React.FC<{ show: boolean; kill: boolean; onClose: () => void; }> = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.show) {
      modalContentRef.current?.classList.remove("opening");
      overlayRef.current?.classList.remove("opening");
    }
    else {
      modalContentRef.current?.classList.add("closing");
      overlayRef.current?.classList.add("closing");
    }
  }, [props.show]);

  if (props.kill) {
    return null;
  }

  return createPortal(
    (
      <Fragment>
        <div ref={overlayRef} className="overlay opening" onClick={props.onClose}></div>
        <div ref={modalContentRef} className="modal-content-wrapper opening">
          <Card>
            {props.children}
          </Card>
        </div>
      </Fragment>
    ),
    document.getElementById("overlay-root")!
  );
};

export default Modal;