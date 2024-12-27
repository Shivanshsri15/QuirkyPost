import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function Canvas({ show, placement, handleClose, children, title }) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement={placement} className="page-body h-75">
        <Offcanvas.Header closeButton className="page-body">
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Canvas;
