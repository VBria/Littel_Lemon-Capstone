import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const outline = definePartsStyle({
    field: {
        _hover: {
            borderColor: "brand.primary.yellow"
        },
        bg: "brand.secondary.brightGray",
    },
})

export const inputTheme = defineMultiStyleConfig({
    variants: { outline },
})