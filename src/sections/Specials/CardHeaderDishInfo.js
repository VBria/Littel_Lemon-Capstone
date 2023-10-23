import { HStack, Text } from "@chakra-ui/react";

const CardHeaderDishInfo = ({ title, price }) => {
    return (
        <HStack
            as="header"
            w="full"
            justify="space-between"
            fontSize="18px"
            fontWeight={700}
        >
            <Text
                as="h3"
                color="brand.secondary.darkCharcoal"
            >
                {title}
            </Text>
            <Text
                color="brand.primary.green"
            >
                {price}
            </Text>
        </HStack>
    )
}

export default CardHeaderDishInfo;