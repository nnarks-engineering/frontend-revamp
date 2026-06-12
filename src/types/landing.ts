import type React from "react";

export interface NavSubItem {
    labelKey: string;
    descriptionKey?: string;
    href: string;
    icon: React.ElementType;
}

export interface NavMainItem {
    labelKey: string;
    href?: string;
    items?: NavSubItem[];
}

export interface NavbarProps {
    signInText?: string;
    ctaText?: string;
}
