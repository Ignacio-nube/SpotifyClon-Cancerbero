import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Rojo sangre apagado para el branding de "Muerte"
        blood: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#8B0000" },  // Rojo sangre principal
          600: { value: "#7a0000" },
          700: { value: "#5c0000" },
          800: { value: "#450000" },
          900: { value: "#2d0000" },
          950: { value: "#1a0000" },
        },
        // Fondos oscuros estilo Spotify
        surface: {
          50: { value: "#404040" },
          100: { value: "#353535" },
          200: { value: "#282828" },
          300: { value: "#1e1e1e" },
          400: { value: "#181818" },
          500: { value: "#121212" },  // Fondo principal
          600: { value: "#0a0a0a" },
          700: { value: "#050505" },
          800: { value: "#030303" },
          900: { value: "#000000" },  // Negro puro
          950: { value: "#000000" },
        },
      },
    },
    semanticTokens: {
      colors: {
        blood: {
          solid: { value: "{colors.blood.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.blood.500}" },
          muted: { value: "{colors.blood.900}" },
          subtle: { value: "{colors.blood.800}" },
          emphasized: { value: "{colors.blood.400}" },
          focusRing: { value: "{colors.blood.500}" },
        },
        // Override del fondo para dark mode
        bg: {
          value: { _light: "{colors.white}", _dark: "{colors.surface.500}" },
        },
        "bg.subtle": {
          value: { _light: "{colors.gray.50}", _dark: "{colors.surface.400}" },
        },
        "bg.muted": {
          value: { _light: "{colors.gray.100}", _dark: "{colors.surface.300}" },
        },
        "bg.emphasized": {
          value: { _light: "{colors.gray.200}", _dark: "{colors.surface.200}" },
        },
      },
    },
  },
  globalCss: {
    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    "html, body": {
      bg: "surface.900",
      color: "white",
      minHeight: "100vh",
    },
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "{colors.surface.200} transparent",
    },
  },
})

export const system = createSystem(defaultConfig, config)
