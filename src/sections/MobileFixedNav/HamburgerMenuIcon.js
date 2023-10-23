import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { useAnimate } from "framer-motion";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const HamburgerMenuIcon = ({ setMenuIsOpen, menuIsOpen }) => {

    const [scope, animate] = useAnimate();
    const prevOpened = useRef(false);

    const hamburgerTransition = {
        ease: [0.9, -0.82, 0.4, 1.4],
        duration: 0.435
    }

    const closeButtonAnimation = async () => {
        const sequence1 = [
            [".hamburgerTop", { transform: "translate(0, 10px) rotate(45deg)" }],
            [".hamburgerBottom", { transform: "translate(0, -10px) rotate(45deg)" }, { at: "<" }],
        ]
        const sequence2 = [
            [".hamburgerCenter", { transform: "rotate(-135deg)" }],
            [".hamburgerTop", { transform: "translate(0, 10px) rotate(-45deg)" }, { at: "<" }],
            [".hamburgerBottom", { transform: "translate(0, -10px) rotate(-45deg)" }, { at: "<" }],
        ]
        animate(document.getElementById("hamburger-menu"), {
            width: "40px",
            height: "40px",
            borderRadius: "24px",
            boxShadow: "0px 4px 4px 0px #33333380"
        }, hamburgerTransition);
        await animate(sequence1, hamburgerTransition);
        await animate(sequence2, hamburgerTransition);
        prevOpened.current = true;
    }

    const hamburgerAnimation = async () => {
        const sequence1 = [
            [".hamburgerCenter", { transform: "rotate(0deg)" }],
            [".hamburgerTop", { transform: "translate(0, 10px) rotate(45deg)" }, { at: "<" }],
            [".hamburgerBottom", { transform: "translate(0, -10px) rotate(45deg)" }, { at: "<" }],
        ]
        const sequence2 = [
            [".hamburgerTop", { transform: "translate(0, 0px) rotate(0deg)" }],
            [".hamburgerBottom", { transform: "translate(0, 0px) rotate(0deg)" }, { at: "<" }],
        ]
        await animate(sequence1, hamburgerTransition);
        animate(document.getElementById("hamburger-menu"), {
            width: "48px",
            height: "48px",
            borderRadius: "24px",
            boxShadow: "0px 0px 0px 0px #333333"
        }, hamburgerTransition);
        await animate(sequence2, hamburgerTransition);
        prevOpened.current = false;
    }

    useEffect(() => {
        menuIsOpen ? closeButtonAnimation() : prevOpened.current && hamburgerAnimation();
    })

    return (
        <Center
            boxSize={12}
            ref={scope}
        >
            <Center
                id="hamburger-menu"
                as={motion.button}
                boxSize={12}
                borderColor="brand.primary.yellow"
                borderRadius={"8px"}
                onClick={() => { setMenuIsOpen(!menuIsOpen) }}
                overflow="hidden"
                bg={menuIsOpen ? "brand.primary.yellow" : "brand.primary.green"}
                // boxShadow={"0px 4px 4px 0px #333333"}
                whileTap={{ boxShadow: "0px 0px 0px 0px #333333" }}
            >
                <VStack
                    w={8}
                    h="max"
                    p={0}
                    spacing={2}
                >
                    <HStack
                        className="hamburgerTop"
                        as={motion.div}
                        w="full"
                        justify="start"
                    >
                        {/* transform={"translate(0, 8px) rotate(-45deg)"} */}
                        {/* transform={"translate(0, 10px) rotate(-135deg)"} */}
                        <Box w={4} h={0.5} borderRadius="1px" bg={!menuIsOpen ? "brand.primary.yellow" : "brand.primary.green"} />
                    </HStack>
                    <HStack
                        className="hamburgerCenter"
                        as={motion.div}
                        w="full"
                    >
                        {/* transform={"rotate(45deg)"} */}
                        <Box w="full" h={0.5} borderRadius="1px" bg={!menuIsOpen ? "brand.primary.yellow" : "brand.primary.green"} />
                    </HStack>
                    <HStack
                        className="hamburgerBottom"
                        as={motion.div}
                        w="full"
                        justify="end"
                    >
                        {/* transform={"translate(0, -10px) rotate(-135deg)"} */}
                        {/* transform={"translate(0, -8px) rotate(-45deg)"} */}
                        <Box w={4} h={0.5} borderRadius="1px" bg={!menuIsOpen ? "brand.primary.yellow" : "brand.primary.green"} />
                    </HStack>
                </VStack>
            </Center >
        </Center >
    )
}

export default HamburgerMenuIcon;