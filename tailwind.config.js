/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_includes/**/*.{md,markdown,liquid,html}",
    "./_layouts/**/*.{md,markdown,liquid,html}",
    "./_pages/**/*.{md,markdown,liquid,html}",
    "./_posts/**/*.{md,markdown,liquid,html}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          75: "#f6f7f8",
          450: "#969ea7",
          650: "#3f4955",
          750: "#36404b",
          775: "#2c343d"
        }
      },
      spacing: {
        18: "4.5rem"
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"]
    },
    fontSize: {
      "2xs": "0.8125rem", // 13px
      xs: "0.875rem", // 14px
      sm: "0.9375rem", // 15px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.5rem", // 24px
      "2xl": "1.75rem", // 28px
      "3xl": "2rem" // 32px
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        xxl: "2.5rem"
      }
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px"
    }
  }
};
