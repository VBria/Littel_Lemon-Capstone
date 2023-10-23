import { Box, HStack, LinkBox, LinkOverlay, VStack } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";


const NavItem = ({ children, href, isActive, handleActivation, itemColor = "brand.secondary.brightGray" }) => {

    const [scope, animate] = useAnimate();

    const animationTransition = { type: "spring", damping: 15 }

    const handleHover = event => {
        switch (event.type) {
            case "pointerenter":
            case "focus":
                animate(".item-top-line, .item-bottom-line", { transform: "scaleX(0.8)" }, animationTransition)
                break;
            default:
                animate(".item-top-line, .item-bottom-line", { transform: "scaleX(0)" })
        }
    }

    const handleAnimation = async () => {
        if (isActive) {
            await animate(".item-top-line, .item-bottom-line", { transform: "scaleX(1)" })
            await animate(".item-right-line, .item-left-line", { transform: "scaleY(1)" })
        }
        else {
            await animate(".item-right-line, .item-left-line", { transform: "scaleY(0)" })
            await animate(".item-top-line, .item-bottom-line", { transform: "scaleX(0)" })
        }
    }

    useEffect(() => {
        handleAnimation();
        // eslint-disable-next-line
    }, [isActive])

    return (
        <LinkBox
            w="max"
            onPointerEnter={!isActive ? handleHover : null}
            onPointerLeave={!isActive ? handleHover : null}
            onClick={handleActivation}
        >
            <VStack
                spacing={0}
                ref={scope}
            >
                <Box
                    bg={itemColor}
                    h="2px"
                    borderRadius="1px"
                    w="full"
                    as={motion.div}
                    transformOrigin="left center"
                    initial={{ transform: "scaleX(0)" }}
                    className="item-top-line"
                />
                <HStack
                    spacing={1}
                    h="24px"
                >
                    <Box
                        bg={itemColor}
                        w="2px"
                        h="calc(100% - 4px)"
                        borderRadius="1px"
                        pos="relative"
                        bottom="-3px"
                        visibility={isActive ? "visible" : "hidden"}
                        as={motion.div}
                        transformOrigin="center bottom"
                        initial={{ transform: "scaleY(0)" }}
                        className="item-left-line"
                    />
                    <LinkOverlay
                        fontWeight="medium"
                        lineHeight="none"
                        fontSize="18px"
                        href={href}
                        onFocus={!isActive ? handleHover : null}
                        onBlur={!isActive ? handleHover : null}
                    >
                        {children}
                    </LinkOverlay>
                    <Box
                        bg={itemColor}
                        w="2px"
                        h="calc(100% - 4px)"
                        borderRadius="1px"
                        pos="relative"
                        top="-3px"
                        visibility={isActive ? "visible" : "hidden"}
                        as={motion.div}
                        transformOrigin="center top"
                        initial={{ transform: "scaleY(0)" }}
                        className="item-right-line"
                    />
                </HStack>
                <Box
                    bg={itemColor}
                    h="2px"
                    borderRadius="1px"
                    w="full"
                    as={motion.div}
                    transformOrigin="right center"
                    initial={{ transform: "scaleX(0)" }}
                    className="item-bottom-line"
                />
            </VStack>
        </LinkBox>
    )
}

export default NavItem;