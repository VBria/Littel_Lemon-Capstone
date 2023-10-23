import { FocusOn } from "react-focus-on";
import { AspectRatio, Image, Text, VStack, Box, HStack } from "@chakra-ui/react";
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SuccessMessage = ({ title, message, focusLockShards, handleFormOverlay }) => {

    const [scope, animate] = useAnimate();

    const handleAnimation = async () => {
        focusLockShards[0].current.disabled = true;
        focusLockShards[0].current.style.cursor = "not-allowed";
        await animate("img", {
            transform: "scale(1)"
        }, {
            ease: "backOut",
            duration: 1.74
        });
        await animate([
            [".img-top-line", { transform: "scaleX(1)" }],
            ["h3", { transform: "translateY(0px) rotateZ(0deg)" }, { at: `-${1 / 2 * 1.74}` }],
            [".img-right-line", { transform: "scaleY(1)" }],
        ], {
            ease: "easeInOut",
            duration: 2 * 1.74
        });
        await animate([
            [".img-bottom-line", { transform: "scaleX(1)" }],
            ["p", { transform: "translateY(0px) rotateZ(0deg)" }, { at: "<" }],
            [".img-left-line", { transform: "scaleY(1)" }],
        ], {
            ease: "easeInOut",
            duration: 2 * 1.74
        });
        focusLockShards[0].current.disabled = false;
        focusLockShards[0].current.style.cursor = "pointer";
        setIsClosable(true);
    }

    const [isClosable, setIsClosable] = useState(false);

    useEffect(() => {
        handleAnimation();
        //eslint-disable-next-line
    }, [])

    return (
        <FocusOn
            shards={focusLockShards}
            onEscapeKey={isClosable && handleFormOverlay}
            style={{
                width: "100%",
                height: "100%"
            }}
        >
            <VStack
                ref={scope}
                w="full"
                maxW="container.xl"
                h="full"
                px={{ base: "20px", md: "70px" }}
                color="brand.primary.yellow"
                fontSize={{ base: "32px", md: "40px" }}
                textAlign="center"
                spacing={1}
                mx="auto"
                pt={{ base: 8, md: 16 }}
            >

                {/* success heading */}
                <Box
                    overflow="hidden"
                    py={1}
                >
                    <Text
                        as={motion.h3}
                        transformOrigin="left top"
                        initial={{ transform: "translateY(110%) rotateZ(15deg)" }}
                    >
                        {title}
                    </Text>
                </Box>
                <VStack
                    w={{ base: "full", xl: "74%" }}
                    spacing={{ base: 4, md: 8 }}
                >
                    <Box
                        as={motion.div}
                        bg="brand.primary.yellow"
                        w="full"
                        h="4px"
                        borderRadius="2px"
                        className="img-top-line"
                        transformOrigin="left center"
                        initial={{ transform: "scaleX(0)" }}
                    />
                    {/* success image */}
                    <HStack
                        w="full"
                        spacing={{ base: 4, md: 8 }}
                    >
                        <Box
                            as={motion.div}
                            bg="brand.primary.yellow"
                            w="4px"
                            h="full"
                            borderRadius="2px"
                            pos="relative"
                            bottom={{ base: "calc(-16px - 2px)", md: "calc(-32px - 2px)" }}
                            className="img-left-line"
                            transformOrigin="center bottom"
                            initial={{ transform: "scaleY(0)" }}
                        />
                        <AspectRatio
                            ratio={16 / 9}
                            w={{ base: "calc(100% - 32px)", md: "calc(100% - 64px)" }}
                        >
                            <Image
                                as={motion.img}
                                alt="Image for a successful Table Reservation"
                                src={require("../../assets/images/success-img.jpg")}
                                fit="scale-down"
                                borderRadius="16px"
                                initial={{ transform: "scale(0)" }}
                            />
                        </AspectRatio>
                        <Box
                            as={motion.div}
                            bg="brand.primary.yellow"
                            w="4px"
                            h="full"
                            borderRadius="2px"
                            pos="relative"
                            top={{ base: "calc(-16px - 2px)", md: "calc(-32px - 2px)" }}
                            className="img-right-line"
                            transformOrigin="center top"
                            initial={{ transform: "scaleY(0)" }}
                        />
                    </HStack>
                    <Box
                        as={motion.div}
                        bg="brand.primary.yellow"
                        w="full"
                        h="4px"
                        borderRadius="2px"
                        className="img-bottom-line"
                        transformOrigin="right center"
                        initial={{ transform: "scaleX(0)" }}
                    />
                </VStack>
                {/* success message */}
                <Box
                    overflow="hidden"
                    // border="1px"
                    py={1}
                >
                    <Text
                        as={motion.p}
                        transformOrigin="left top"
                        initial={{ transform: "translateY(-110%) rotateZ(-15deg)" }}
                    >
                        {message}
                    </Text>
                </Box>

            </VStack>
        </FocusOn>
    )
}

export default SuccessMessage;