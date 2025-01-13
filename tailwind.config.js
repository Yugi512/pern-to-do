/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html"],
  prefix: "tw-",
  important: true,
  corePlugins: {
      preflight: false,
  },
}

@config "./tailwindcss-config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;