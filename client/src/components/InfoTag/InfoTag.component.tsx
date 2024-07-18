import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";

import { Modal } from "../Modal";

export const InfoTag = ({ children }: { children: React.ReactNode }) => {
  const [showBody, setShowBody] = React.useState(false);
  return (
    <>
      <span
        className="info"
        onClick={() => setShowBody(!showBody)}
        style={{ cursor: "pointer" }}
      >
        <HiQuestionMarkCircle />
      </span>
      {showBody && <Modal onClose={() => setShowBody(false)}>{children}</Modal>}
    </>
  );
};
