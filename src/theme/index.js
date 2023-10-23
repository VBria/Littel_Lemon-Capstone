import { extendTheme, theme as base } from "@chakra-ui/react";
import { inputTheme } from "./input";
import { textareaTheme } from "./textArea";

const theme = extendTheme({
    breakpoints: {
        base: "0px",
        sm: "320px",
        md: "740px",
        lg: "960px",
        xl: "1280px",
        "2xl": "1536px"
    },
    styles: {
        global: {
            body: {
                bg: "transparent",
                color: "#333333",
                lineHeight: "none"
            }
        }
    },
    colors: {
        brand: {
            primary: {
                green: '#495E57',
                yellow: '#F4CE14'
            },
            secondary: {
                darkSalmon: '#EE9972',
                peachPuff: '#FBDABB',
                brightGray: '#EDEFEE',
                darkCharcoal: '#333333'
            }
        }
    },
    fonts: {
        heading: `Markazi Text, ${base.fonts.heading}`,
        body: `Karla, ${base.fonts.body}`,
    },
    components: {
        Input: inputTheme,
        Textarea: textareaTheme
    }
});

export default theme;