import { VStack, AspectRatio, Image, Box } from "@chakra-ui/react";
import { forwardRef } from "react";

const OwnerImageFrame = forwardRef(({
    src, alt, ratio, align, transform,
    scrollAnimation = false,
    fit = "cover",
    boxShadow = "0px 0px 0px 0px #33333380",
    borderRadius = "16px",
    ...props }, ref) => {
    return (
        <VStack
            ref={ref}
            h="full"
            w="full"
            {...props}
        >
            <AspectRatio
                w="full"
                ratio={ratio}
            >
                <Box
                    overflow="hidden"
                    borderRadius={borderRadius}
                    boxShadow={boxShadow}
                >
                    <Image
                        w="full"
                        h="full"
                        src={src()}
                        alt={alt}
                        objectFit={fit}
                        align={align}
                        transform={transform}
                    />
                </Box>
            </AspectRatio>
        </VStack>
    )
})

export default OwnerImageFrame;