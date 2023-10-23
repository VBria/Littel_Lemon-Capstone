import { Box } from "@chakra-ui/react";

const LineFrame = ({ ...props }) => {
    return (
        <Box
            pos="absolute"
            w="full"
            h="full"
            {...props}
        >
            {/* top line */}
            <Box
                bg="brand.primary.yellow"
                w="full"
                h="2px"
                pos="absolute"
                top="0px"
                borderRadius="1px"
            />
            {/* right line */}
            <Box
                bg="brand.primary.yellow"
                w="2px"
                h="full"
                pos="absolute"
                right="0px"
                borderRadius="1px"
            />
        </Box>
    )
}

export default LineFrame;