import { VStack, Box, Text } from "@chakra-ui/react";

const CardHelperInfo = ({ infoFor, ...props }) => {

    const tooltipText = (infoFor) => {
        switch (infoFor) {
            case "card-number":
                return "A 15 or 16 digit number on front of the card"
            case "card-expiration":
                return "MM/YYYY"
            case "card-holder-name":
                return "Card holder's name, as it appears on the card"
            default:
                return "3 digits on back, Amex 4 digits on front"
        }
    }

    return (
        <VStack
            spacing={4}
            fontSize="18px"
            fontWeight={500}
        >
            <Text
                color="brand.secondary.darkCharcoal"
            >
                {tooltipText(infoFor)}
            </Text>
            <VStack
                spacing={2}
                bg="brand.primary.green"
                w="240px"
                h="160px"
                align="start"
                px={8}
                pt={8}
                pb={4}
                borderRadius="8px"
            >
                {
                    infoFor === "card-security-code"
                        ? <>
                            <Box
                                bg="brand.secondary.brightGray"
                                w="240px"
                                h="36px"
                                pos="relative"
                                left="-32px"
                            />
                            <Text
                                w="full"
                                color="brand.primary.yellow"
                                textAlign="end"
                            >
                                123
                            </Text>
                        </>
                        : <>
                            <Box
                                bg="brand.secondary.brightGray"
                                w="48px"
                                h="32px"
                                borderRadius="8px"
                            />
                            <Text
                                color={infoFor === "card-number" && "brand.primary.yellow"}
                            >
                                1234 5678 9012 3456
                            </Text>
                            <Text
                                w="full"
                                color={infoFor === "card-expiration" && "brand.primary.yellow"}
                                textAlign="end"
                            >
                                10/2026
                            </Text>
                            <Text
                                color={infoFor === "card-holder-name" && "brand.primary.yellow"}
                            >
                                JOHN DOE
                            </Text>
                        </>
                }
            </VStack>
        </VStack>
    )
}

export default CardHelperInfo;