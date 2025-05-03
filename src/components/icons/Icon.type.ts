import React from "react";

export interface IconType extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fill?: string;
  width?: string | number;  // Width of the SVG
  height?: string | number; // Height of the SVG
}
