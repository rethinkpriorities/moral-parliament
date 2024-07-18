import React, { ReactNode } from "react";
import { NavMenu } from "./NavMenu";
import { BackgroundContent } from "./BackgroundContent";
import { ModalContent } from "./ModalContent";
import { WalkthroughModal } from "./WalkthroughModal";

interface LayoutProps {
  children: ReactNode;
  includePanel: Boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ModalContent />
      <WalkthroughModal />
      <NavMenu />
      <BackgroundContent fullWidth={true}>{children}</BackgroundContent>
    </div>
  );
};
