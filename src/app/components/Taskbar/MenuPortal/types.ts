import { ReactNode } from "react";

export interface MenuPortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}