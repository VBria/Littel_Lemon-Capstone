import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const outline = defineStyle({
    _hover: {
        borderColor: "brand.primary.yellow"
    },
    bg: "brand.secondary.brightGray",
    borderRadius: "16px"
})

export const textareaTheme = defineStyleConfig({
    variants: { outline },
})