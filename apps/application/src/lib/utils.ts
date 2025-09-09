import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS, GRADIENTS, SHADOWS, TRANSITIONS } from "./constants";

/**
 * Utilitário para combinar classes do Tailwind CSS com classes do Material-UI
 * Resolve conflitos entre as classes automaticamente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Re-exporta as constantes para fácil acesso
 */
export const colorPalette = COLORS;
export const gradients = GRADIENTS;
export const materialShadows = SHADOWS;
export const materialTransitions = TRANSITIONS;

/**
 * Breakpoints do Material-UI em formato Tailwind
 */
export const muiBreakpoints = {
  xs: "0px",
  sm: "600px", // Material-UI sm
  md: "900px", // Material-UI md
  lg: "1200px", // Material-UI lg
  xl: "1536px", // Material-UI xl
};

/**
 * Classes utilitárias otimizadas para combinar Material-UI com Tailwind CSS
 */
export const muiTailwindClasses = {
  // Espaçamentos baseados no sistema Material-UI (múltiplos de 8px)
  spacing: {
    xs: "p-1", // 4px
    sm: "p-2", // 8px
    md: "p-4", // 16px
    lg: "p-6", // 24px
    xl: "p-8", // 32px
    xxl: "p-12", // 48px
  },

  // Margens correspondentes
  margin: {
    xs: "m-1", // 4px
    sm: "m-2", // 8px
    md: "m-4", // 16px
    lg: "m-6", // 24px
    xl: "m-8", // 32px
    xxl: "m-12", // 48px
  },

  // Sombras Material Design customizadas
  shadows: {
    none: "shadow-none",
    sm: "shadow-material-1",
    md: "shadow-material-2",
    lg: "shadow-material-3",
    xl: "shadow-material-4",
    hover: "shadow-material-hover",
  },

  // Transições suaves otimizadas
  transitions: {
    fast: "transition-all duration-150 ease-in-out",
    normal: "transition-all duration-200 ease-in-out",
    slow: "transition-all duration-300 ease-in-out",
    spring: "transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Efeitos de hover que funcionam bem com Material-UI
  hover: {
    scale: "hover:scale-105 active:scale-95 transition-transform duration-200",
    lift: "hover:shadow-material-hover hover:-translate-y-1 transition-all duration-200",
    glow: "hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300",
    subtle: "hover:bg-gray-50 transition-colors duration-200",
    card: "hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ease-out",
  },

  // Bordas arredondadas consistentes com Material-UI
  rounded: {
    none: "rounded-none",
    sm: "rounded", // 4px - padrão MUI
    md: "rounded-md", // 6px
    lg: "rounded-lg", // 8px - padrão theme.shape.borderRadius
    xl: "rounded-xl", // 12px
    xxl: "rounded-2xl", // 16px
    full: "rounded-full",
  },

  // Animações predefinidas
  animations: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    bounce: "animate-bounce-gentle",
  },

  // Layout helpers
  layout: {
    center: "flex items-center justify-center",
    centerX: "flex justify-center",
    centerY: "flex items-center",
    spaceBetween: "flex justify-between items-center",
    column: "flex flex-col",
    row: "flex flex-row",
  },

  // Responsividade otimizada para Material-UI
  responsive: {
    hide: {
      mobile: "hidden sm:block",
      tablet: "hidden md:block",
      desktop: "hidden lg:block",
    },
    show: {
      mobile: "block sm:hidden",
      tablet: "block md:hidden",
      desktop: "block lg:hidden",
    },
  },
};
