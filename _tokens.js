tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Primär (Weinrot) */
        "primary":                    "#914756",
        "primary-container":          "#ed93a3",
        "on-primary":                 "#ffffff",
        "on-primary-container":       "#6d2a39",
        "on-primary-fixed-variant":   "#74303f",
        /* Sekundär (Goldbraun) */
        "secondary-container":        "#fdd48d",
        "secondary-fixed":            "#ffdea7",
        "secondary-fixed-dim":        "#e8c17c",
        "on-secondary-fixed":         "#271900",
        "on-secondary-fixed-variant": "#5d4207",
        /* Surface (fast Weiß / Rosa) */
        "surface":                    "#fff8f7",
        "surface-container":          "#fbeaeb",
        "on-surface":                 "#22191a",
        "on-surface-variant":         "#534345",
        /* Layout */
        "nav-bg":                     "#77591f",
        "footer-bg":                  "#6b4f1b"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body":     ["Manrope", "sans-serif"],
        "label":    ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg":      "0px",
        "xl":      "0px",
        "full":    "9999px"
      },
    },
  },
}
