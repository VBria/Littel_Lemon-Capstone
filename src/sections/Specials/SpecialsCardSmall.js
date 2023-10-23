import { AspectRatio, VStack, Image, Text, Box, Center } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import PressHoldGesture from "../../components/Gestures/PressHoldGesture";
import OrderDelivery from "./OrderDelivery";
import CardHeaderDishInfo from "./CardHeaderDishInfo";

const SpecialsCardSmall = ({ title, desc, price, imgSrc }) => {

    const [scope, animate] = useAnimate();
    const handleImgFocus = e => {
        const imgFocusSeq = [
            [".dishDesc", { bottom: "0px", opacity: 1 }],
            [".touchGesture", { opacity: 0 }, { at: "<" }],
            [".imageMask", { opacity: 0.8 }, { at: "<" }],
            [".dishImage", { transform: "scale(1.1)" }, { at: "<" }],
            [scope.current, { boxShadow: "0" }, { at: "<" }]
        ]

        const imgBlurSeq = [
            [".dishImage", { transform: "scale(1)" }],
            [".dishDesc", { bottom: "-50px" }, { at: "<" }],
            [".imageMask, .dishDesc", { opacity: 0 }, { at: "<" }],
            [".touchGesture", { opacity: 1 }, { at: "-0.2" }],
            [scope.current, { boxShadow: "0px 4px 4px 0px #33333380" }, { at: "<" }]
        ]

        if (e.type === "touchstart" || e.type === "focus") {
            animate(
                imgFocusSeq,
                {
                    ease: "easeOut",
                    duration: 2 * 0.435
                }
            )
        }
        else {
            animate(
                imgBlurSeq,
                {
                    // type: "spring",
                    // duration: 0.435
                    ease: "easeOut",
                    duration: 2 * 0.435
                }
            );
        }
    }

    return (
        <VStack
            as="article"
            bg="brand.secondary.brightGray"
            boxShadow="0px 4px 4px 0px #33333380"
            borderRadius="16px"
            overflow="hidden"
            ref={scope}
        >
            {/* image frame */}
            <Box
                pos="relative"
                onTouchStart={handleImgFocus}
                onFocus={handleImgFocus}
                onTouchEnd={handleImgFocus}
                onBlur={handleImgFocus}
                tabIndex={0}
            >
                <AspectRatio
                    // w={{ base: "calc(100vw - 40px)", md: "280px" }}
                    w="280px"
                    ratio={4 / 3}
                    overflow="hidden"
                >
                    <Image
                        as={motion.img}
                        src={imgSrc()}
                        alt={`Image of ${title} special dish`}
                        objectFit="cover"
                        className="dishImage"
                        initial={{ transform: "scale(1)" }}
                    />
                </AspectRatio>
                <Center
                    pos="absolute"
                    w="full"
                    h="full"
                    top="0"
                >
                    <Box
                        as={motion.div}
                        pos="absolute"
                        w="full"
                        h="full"
                        top="0"
                        bg="brand.secondary.darkCharcoal"
                        initial={{ opacity: 0 }}
                        className="imageMask"
                    />
                    <Text
                        as={motion.p}
                        mx={4}
                        color="brand.secondary.brightGray"
                        fontSize="16px"
                        fontWeight={400}
                        lineHeight="150%"
                        zIndex="docked"
                        pos="relative"
                        bottom="-50px"
                        initial={{ opacity: 0 }}
                        className="dishDesc"
                    >
                        {desc}
                    </Text>
                </Center>

                {/* press & hold gesture */}
                <PressHoldGesture
                    pos="absolute"
                    bottom="8px"
                    right="8px"
                />
            </Box>

            {/* body stack */}
            <VStack
                w="full"
                p={4}
                spacing={4}
                align="start"
            >
                {/* dish info */}
                <CardHeaderDishInfo title={title} price={price} />

                {/* deliver order */}
                <OrderDelivery />
            </VStack>
        </VStack >
    )
}

export default SpecialsCardSmall;