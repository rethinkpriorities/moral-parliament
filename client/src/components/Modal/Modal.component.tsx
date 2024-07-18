import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

import { ModalBox, CloseButton, Screen } from "./Modal.styles";

export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const domNode = document.querySelector("#modal");
  if (!domNode) return null;
  return ReactDOM.createPortal(
    <>
      <Screen onClick={onClose} />
      <div style={{ position: "relative" }}>
        <ModalBox>
          <CloseButton onClick={onClose}>
            <IoClose />
          </CloseButton>
          {children}
        </ModalBox>
      </div>
    </>,
    domNode
  );
};
