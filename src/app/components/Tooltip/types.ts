import { JSX } from "react";

export interface TooltipProps {
    content: string | JSX.Element;
    children: React.ReactNode;
}