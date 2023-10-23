import { VStack, Text } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {

    const [scope, animate] = useAnimate();

    const [indicatorStateOn, SetIndicatorStateOn] = useState(false);

    const offStateAnimation = async () => {
        await animate(
            [
                [".scrollIndicatorText", { letterSpacing: "0.5em", opacity: 0.5 }],
                [".scrollIndicatorArrow", { top: "-28px", fontSize: "18px", opacity: 0 }, { at: "<" }],
            ],
            { duration: 1.74, ease: "easeOut" }
        );
        SetIndicatorStateOn(!indicatorStateOn);
    }

    const onStateAnimation = async () => {
        await animate(
            [
                [".scrollIndicatorArrow", { top: "0px", fontSize: "48px", opacity: 1 }],
                [".scrollIndicatorText", { visibility: "visible", letterSpacing: "0.1em", opacity: 1 }, { at: "<" }],
            ],
            {
                ease: [.58, -0.52, .38, 1.55],
                duration: 0.435
            }
        );
        setTimeout(() => { SetIndicatorStateOn(!indicatorStateOn) }, 1305);
    }

    useEffect(() => {
        indicatorStateOn
            ? onStateAnimation()
            : offStateAnimation()
    })

    return (
        <VStack
            spacing={4}
            ref={scope}
            color="brand.primary.green"
        >
            <Text
                className="scrollIndicatorText"
                as={motion.p}
                textShadow="0px 4px 4px #33333380"
                fontSize="18px"
                fontWeight="500"
                letterSpacing="widest"
                initial={{ letterSpacing: "0.1em" }}
            >
                Scroll
            </Text>
            <Text
                className="scrollIndicatorArrow"
                as={motion.p}
                boxSize={12}
                textAlign="center"
                fontSize="48px"
                textShadow="0px 4px 4px #33333380"
                style={{ fontWeight: "600" }}
                pos="relative"
            >
                &darr;
            </Text>
        </VStack>
    )
}

export default ScrollIndicator;