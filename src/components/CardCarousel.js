import { HStack, VStack, Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

import "./cardCarousel.css";
import DragCursorPointer from "./Gestures/DragCursorPointer";

const CardCarousel = ({ dragConstraintsRef, renderCards, numOfItems, ...props }) => {

    const [scrollScope, animateScroll] = useAnimate();

    const sizeScroll = () => {
        const scrollW = Math.floor((scrollScope.current.offsetWidth - 8) / numOfItems);
        animateScroll("div", { width: scrollW });
    }

    const handleScroll = () => {
        const scrollableElemLength = scrollScope.current.nextSibling.firstChild.offsetWidth - window.innerWidth;
        const availableScrollBar = scrollScope.current.offsetWidth - 8 - scrollScope.current.firstChild.offsetWidth;
        const scrollLeftPos = (scrollScope.current.nextSibling.scrollLeft / scrollableElemLength) * availableScrollBar;
        window.requestAnimationFrame(() => {
            animateScroll(
                "div",
                { left: `${scrollLeftPos}px` },
                {
                    ease: "easeOut"
                }
            )
        });
    }

    const [dragCursorScope, animateDragCursor] = useAnimate();
    const handleDragCursor = async (e) => {
        const carouselElem = dragCursorScope.current.getBoundingClientRect();
        const dragCursor = dragCursorScope.current.lastChild;
        const cursorPos = {
            left: e.clientX >= carouselElem.left && e.clientX <= carouselElem.right
                ? e.clientX - carouselElem.left - (dragCursor.offsetWidth / 2)
                : e.clientX >= carouselElem.right ? "calc(100% - 120px)" : 0,
            top: e.clientY >= carouselElem.top && e.clientY <= carouselElem.bottom
                ? e.clientY - carouselElem.top - (dragCursor.offsetHeight / 2)
                : e.clientY >= carouselElem.bottom ? "calc(100% - 64px)" : 0,
        }
        switch (e.type) {
            case "pointerenter":
                await animateDragCursor(
                    ".dragCursor",
                    { ...cursorPos, transform: "scale(0)" },
                    { ease: "easeOut", duration: 0.01 }
                );
                await animateDragCursor(".dragCursor", { visibility: "visible" });
                animateDragCursor(
                    ".dragCursor",
                    { transform: "scale(1)" },
                    {
                        type: "spring",
                        bounce: 0.7
                    }
                )
                break;
            case "pointermove":
                // await animateDragCursor(".dragCursor", { visibility: "visible" });
                window.requestAnimationFrame(() => {
                    animateDragCursor(
                        ".dragCursor",
                        { ...cursorPos },
                        {
                            ease: "easeOut",
                            duration: 0.01
                        })
                });
                break;
            case "pointerdown":
                animateDragCursor(".dragCursorCircle", { fill: "#F4CE14" });
                animateDragCursor(".dragCursorText", { fill: "#495E57" });
                break;
            case "pointerup":
                animateDragCursor(".dragCursorCircle", { fill: "#495E57" });
                animateDragCursor(".dragCursorText", { fill: "#EDEFEE" });
                break;
            default:
                animateDragCursor(".dragCursor", { visibility: "hidden" });
        }
        // }
    }

    useEffect(() => {
        sizeScroll();
        // eslint-disable-next-line 
    })

    return (
        <VStack
            spacing={{ base: 2, md: 8 }}
            {...props}
        >
            {/* carousel scrollbar */}
            <HStack
                hideFrom="xl"
                py="2px"
                px="4px"
                bg="brand.primary.green"
                w="full"
                borderRadius="4px"
                ref={scrollScope}
            >
                <Box
                    as={motion.div}
                    bg="brand.primary.yellow"
                    h={1}
                    borderRadius="2px"
                    pos="relative"
                />
            </HStack>

            {/* card carousel frame */}
            <Box
                className="cardCarouselFrame"
                w="100vw"
                h="max"
                overflow={{ base: "auto", xl: "visible" }}
                pb={4}
                onScroll={useBreakpointValue({
                    base: handleScroll,
                    xl: null
                })}
                pl="calc(calc(calc(100vw - 1280px) / 2) + 165px)"
            >
                {/* card stack */}
                <HStack
                    align="start"
                    pl={{ base: "20px", md: "70px", xl: "0px" }}
                    pe={{ base: "20px", md: "70px", xl: "0px" }}
                    as={motion.div}
                    w="max"
                    spacing={{ base: 4, md: 8 }}
                    drag={useBreakpointValue({
                        base: false,
                        xl: "x"
                    })}
                    dragConstraints={dragConstraintsRef}
                    pos="relative"
                >
                    {renderCards()}
                    <Box
                        w="full"
                        h="85%"
                        pos="absolute"
                        top="0"
                        cursor={{ base: "grab", xl: "none" }}
                        onPointerEnter={handleDragCursor}
                        onPointerLeave={handleDragCursor}
                        onPointerMove={handleDragCursor}
                        onPointerDown={handleDragCursor}
                        onPointerUp={handleDragCursor}
                        ref={dragCursorScope}
                        zIndex="docked"
                        className="draggableArea"
                        display={{ base: "none", xl: "block" }}
                    >
                        <DragCursorPointer
                            className="dragCursor"
                            pos="absolute"
                            initial={{ visibility: "hidden" }}
                        />
                    </Box>
                </HStack>
            </Box >
        </VStack >
    )
}

export default CardCarousel;