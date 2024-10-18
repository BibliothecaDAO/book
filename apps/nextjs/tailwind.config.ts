import type { Config } from "tailwindcss";
import baseConfig from "@realms-world/tailwind-config/web";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../ui/src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {},
  },
} satisfies Config;
module.exports = require("@realms-world/tailwind-config/web");
