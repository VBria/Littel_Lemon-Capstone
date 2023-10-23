import { Box, Center, Heading, Image, useMergeRefs } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { forwardRef, useEffect } from "react";

import LineFrame from "./LineFrame";


const StepIndicator = forwardRef(({ children,
    isStepInProgress,
    isStepComplete,
    isStepPrev,
    goToPreviousFormStep,
    ...props }, ref) => {

    const [scope, animate] = useAnimate();

    const animateIndicator = async () => {
        // for active form step
        if (isStepInProgress) {
            await animate([
                ["img", { transform: "scale(1)", opacity: 1 }],
                [".complete-step-bg", { transform: "scale(0)" }, { at: "<" }],
                [".indicator-top-right-lineframe", { top: "-4px", opacity: 1 }, { at: "<" }],
                [".indicator-bottom-left-lineframe", { bottom: "-4px", opacity: 1 }, { at: "<" }]
            ], { type: "spring", stiffness: 300, damping: 20 });
        }
        else if (isStepPrev && isStepComplete) {
            await animate([
                [".complete-step-bg", { transform: "scale(1)" }],
                ["img", { transform: "scale(0)" }, { at: "<" }],
                [".indicator-top-right-lineframe", { top: "0px", opacity: 0 }, { at: "<" }],
                [".indicator-bottom-left-lineframe", { bottom: "0px", opacity: 0 }, { at: "<" }],
            ], { type: "spring", stiffness: 300, damping: 20 });
        }
        else {
            await animate([
                ["img", { transform: "scale(0)", opacity: 0 }],
                [".indicator-top-right-lineframe", { top: "0px" }, { at: "<" }],
                [".indicator-bottom-left-lineframe", { bottom: "0px" }, { at: "<" }],
            ], { type: "spring", stiffness: 300, damping: 20 });
        }
    }

    useEffect(() => {
        animateIndicator();
        //eslint-disable-next-line
    }, [isStepInProgress, isStepPrev, isStepComplete])

    const refs = useMergeRefs(scope, ref);

    return (
        <Center
            as={motion.button}
            type="button"
            cursor={
                isStepComplete && !isStepInProgress
                    ? props.disabled
                        ? "not-allowed"
                        : "pointer"
                    : "auto"
            }
            boxShadow={isStepComplete && !isStepInProgress ? "0px 4px 4px 0px #33333380" : null}
            borderRadius="8px"
            className="form-step-indicator"
            pos="relative"
            w={{ base: "32px", md: "48px" }}
            h={{ base: "30.86px", md: "46.29px" }}
            ref={refs}
            _active={(isStepComplete && !isStepInProgress) && {
                boxShadow: "0px 0px 0px 0px #33333380",
                transform: "translateY(1px)",
            }}
            onClick={e => isStepComplete && goToPreviousFormStep(e, children)}
            {...props}
        >
            <Heading
                as={motion.p}
                fontSize={{ base: "22.857px", md: "34.286px" }}
                fontWeight={400}
                lineHeight="none"
                color={isStepComplete || isStepInProgress ? "brand.primary.green" : "brand.secondary.brightGray"}
                // textShadow="0px 4px 4px #33333340"
                zIndex="docked"
            >
                {children}
            </Heading>

            {/* top line & right line frame */}
            <LineFrame
                as={motion.div}
                className="indicator-top-right-lineframe"
                initial={{ opacity: isStepComplete ? 0 : 1 }}
            // top={{ base: "-4px", md: "-8px" }}
            />

            {/* bottom line & left line frame */}
            <LineFrame
                as={motion.div}
                className="indicator-bottom-left-lineframe"
                initial={{ opacity: isStepComplete ? 0 : 1 }}
                transform="rotateZ(180deg)"
            // bottom={{ base: "-4px", md: "-8px" }}
            />

            {/* bg Image */}
            <Image
                as={motion.img}
                initial={{ transform: "scale(0)" }}
                pos="absolute"
                w="full"
                h="full"
                objectFit="contain"
                alt="Little Lemon logo"
                src={require("../../../assets/logo/logo_v3.png")}
                zIndex="base"
            />
            {/* bg box for complete steps */}
            <Box
                className="complete-step-bg"
                as={motion.div}
                pos="absolute"
                w="full"
                h="full"
                bg="brand.primary.yellow"
                zIndex="base"
                initial={{ transform: isStepComplete ? "scale(1)" : "scale(0)" }}
                borderRadius="8px"
            />
        </Center >
    )
})

export default StepIndicator;