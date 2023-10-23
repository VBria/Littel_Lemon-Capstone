import { HStack, IconButton, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ReservationReviewItem = ({ item, desc, goToPreviousFormStep, formStepNum, editable }) => {
    return (
        <HStack
            spacing={1}
            fontSize="16px"
            fontWeight={400}
            lineHeight="150%"
            w="full"
        >
            <Text
                fontSize="18px"
                fontWeight={500}
                lineHeight="none"
            >
                {item}
            </Text>
            <Text>
                :
            </Text>
            <HStack
                spacing={2}
                w="min"
                flexGrow={1}
            >
                <Text>
                    {desc}
                </Text>
                {
                    editable
                    &&
                    <IconButton
                        aria-label={`Edit ${item}`}
                        icon={<FontAwesomeIcon
                            icon={faPenToSquare}
                        />}
                        isRound
                        color="brand.primary.green"
                        variant="link"
                        onClick={e => goToPreviousFormStep(e, formStepNum)}
                    />}
            </HStack>
        </HStack >
    )
}

export default ReservationReviewItem;