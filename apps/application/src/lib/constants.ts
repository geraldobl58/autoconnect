/**
 * Constantes de cores centralizadas para Material-UI e Tailwind CSS
 * Evita duplicação e garante consistência entre os dois sistemas
 */

export const COLORS = {
  // Cores primárias (azul)
  primary: {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3",
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },

  // Cores secundárias (rosa)
  secondary: {
    50: "#fce4ec",
    100: "#f8bbd9",
    200: "#f48fb1",
    300: "#f06292",
    400: "#ec407a",
    500: "#e91e63",
    600: "#d81b60",
    700: "#c2185b",
    800: "#ad1457",
    900: "#880e4f",
    main: "#e91e63",
    light: "#f06292",
    dark: "#c2185b",
    contrastText: "#ffffff",
  },

  // Cores de erro (vermelho)
  error: {
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#ffffff",
  },

  // Cores de aviso (laranja)
  warning: {
    50: "#fff3e0",
    100: "#ffe0b2",
    200: "#ffcc80",
    300: "#ffb74d",
    400: "#ffa726",
    500: "#ff9800",
    600: "#fb8c00",
    700: "#f57c00",
    800: "#ef6c00",
    900: "#e65100",
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#ffffff",
  },

  // Cores de informação (azul claro)
  info: {
    50: "#e1f5fe",
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
    main: "#0288d1",
    light: "#03dac6",
    dark: "#018786",
    contrastText: "#ffffff",
  },

  // Cores de sucesso (verde)
  success: {
    50: "#e8f5e8",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#ffffff",
  },

  // Escala de cinzas
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Cores de texto
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },

  // Cores de fundo
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },

  // Cores de divider
  divider: "rgba(0, 0, 0, 0.12)",
} as const;

/**
 * Gradientes predefinidos usando as cores da paleta
 */
export const GRADIENTS = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  warning: "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)",
  error: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  info: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
  sunset: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
  ocean: "linear-gradient(135deg, #667db6 0%, #0082c8 35%, #0082c8 100%)",
  forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  royal: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
} as const;

/**
 * Breakpoints do Material-UI
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * Espaçamentos baseados no sistema do Material-UI (múltiplos de 8px)
 */
export const SPACING = {
  xs: 4, // 0.5rem
  sm: 8, // 1rem
  md: 16, // 2rem
  lg: 24, // 3rem
  xl: 32, // 4rem
  xxl: 48, // 6rem
} as const;

/**
 * Sombras do Material Design
 */
export const SHADOWS = {
  none: "none",
  sm: "0 1px 3px rgba(0,0,0,0.1)",
  md: "0 2px 6px rgba(0,0,0,0.1)",
  lg: "0 3px 12px rgba(0,0,0,0.1)",
  xl: "0 4px 16px rgba(0,0,0,0.15)",
  "2xl": "0 8px 24px rgba(0,0,0,0.12)",
  hover: "0 8px 24px rgba(0,0,0,0.12)",
} as const;

/**
 * Transições suaves
 */
export const TRANSITIONS = {
  fast: "all 0.15s ease-in-out",
  normal: "all 0.2s ease-in-out",
  slow: "all 0.3s ease-in-out",
  spring: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
