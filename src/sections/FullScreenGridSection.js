import { SimpleGrid } from "@chakra-ui/react";

const FullScreenGridSection = ({ children, ...props }) => {
    return (
        <>
            <SimpleGrid
                as="section"
                h="full"
                maxW="container.xl"
                mx="auto"
                px={{ base: "20px", md: "70px" }}
                columns={{ base: 4, md: 8, xl: 12 }}
                columnGap={4}
                rowGap="0px"
                autoRows="4px"
                {...props}
            >
                {children}
            </SimpleGrid>
        </>
    )
}

export default FullScreenGridSection;