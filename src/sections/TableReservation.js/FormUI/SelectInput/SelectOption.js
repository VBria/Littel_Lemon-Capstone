import { HStack, Text, Box, VStack } from "@chakra-ui/react";
import { useAnimate, motion } from "framer-motion";


const SelectOption = ({ children, handleOptionSelection, isSelected, ...props }) => {

    const [scope, animate] = useAnimate();

    const handlePointerHover = e => {
        const enterSeq = [
            [scope.current, { paddingRight: "16px" }],
            [".option-arrow-shaft", { width: "32px" }, { at: "<" }]
        ]
        const leaveSeq = [
            [scope.current, { paddingRight: "32px" }],
            [".option-arrow-shaft", { width: "16px" }, { at: "<" }]
        ]
        switch (e.type) {
            case "pointerenter":
                animate(enterSeq, {
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                });
                break;
            default:
                animate(leaveSeq, {
                    ease: "easeOut",
                    duration: 1.74 / 4
                });
        }
    }

    const textArrowColor = isSelected ? "brand.secondary.brightGray" : "brand.primary.green";

    return (
        <HStack
            as={motion.div}
            w="full"
            justify="space-between"
            pl={4}
            pe={isSelected ? 4 : 8}
            py={2}
            color={textArrowColor}
            borderBottom="1px dashed"
            ref={scope}
            cursor="pointer"
            onPointerEnter={isSelected ? null : handlePointerHover}
            onPointerLeave={isSelected ? null : handlePointerHover}
            onClick={handleOptionSelection}
            onKeyDown={e => {
                if (e.code === "Enter") {
                    handleOptionSelection(e);
                }
            }}
            pos="relative"
            tabIndex={0}
            {...props}
        >
            <Text
                pos="relative"
                zIndex="hide"
                fontWeight={500}
                fontSize="18px"
            >
                {children}
            </Text>

            {/* option arrow */}
            <HStack
                as={motion.div}
                className="option-arrow-shaft"
                w={isSelected ? 8 : 4}
                h={2}
                pos="relative"
                zIndex="hide"
            >
                {/* arrow shaft */}
                <Box
                    h="1px"
                    w="full"
                    borderRadius="0.5px"
                    bg={textArrowColor}
                />
                {/* arrow point */}
                <VStack
                    w={2}
                    h="full"
                    pos="absolute"
                    right="0"
                    spacing={0}
                >
                    <VStack
                        w="full"
                        h="50%"
                        justify="end"
                        pos="relative"
                        top="0.5px"
                    >
                        <Box
                            h="1px"
                            w="full"
                            borderRadius="0.5px"
                            bg={textArrowColor}
                            transformOrigin="right center"
                            transform="rotateZ(45deg)"
                        />
                    </VStack>
                    <VStack
                        w="full"
                        h="50%"
                        justify="start"
                        pos="relative"
                        top="-0.5px"
                    >
                        <Box
                            h="1px"
                            w="full"
                            borderRadius="0.5px"
                            bg={textArrowColor}
                            transformOrigin="right center"
                            transform="rotateZ(-45deg)"
                        />
                    </VStack>
                </VStack>
            </HStack>

            {/* option bg */}
            <Box
                w="full"
                h="full"
                pos="absolute"
                left="0"
                zIndex="-10"
                bg={isSelected ? "brand.primary.green" : "brand.secondary.brightGray"}
            />
        </HStack >
    )
}

export default SelectOption;