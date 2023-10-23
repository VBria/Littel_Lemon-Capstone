import ButtonRegular from "./ButtonRegular";
import { Box } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import chakraPropFilter from "../../util/chakraPropFilter";

const ButtonHoverable = ({ children, darkBg = true, ...props }) => {

    const [scope, animate] = useAnimate();

    const hoverEnterSequence = [
        ["button", { color: "#495E57" }],
        [".buttonHoverBg", { bottom: darkBg ? "0px" : "100px" }, { at: "<" }]
    ]

    const hoverExitSequence = [
        ["button", { color: darkBg ? "#F4CE14" : "#495E57" }],
        [".buttonHoverBg", { bottom: darkBg ? "100px" : "0px" }, { at: "<" }],
    ]

    const handleHover = async (e) => {
        // console.log(e.target, e.type);
        if (e.type === "pointerenter" || e.type === "focus") {
            darkBg && animate(".buttonHoverBg", { visibility: "visible" })
            await animate(hoverEnterSequence, { ease: "easeInOut", duration: 0.435 });
            if (!darkBg) {
                await animate(".buttonHoverBg", { visibility: "hidden" });
                animate(".buttonHoverBg", { bottom: "-100px" });
            }
        }
        else {
            !darkBg && await animate(".buttonHoverBg", { visibility: "visible" })
            await animate(hoverExitSequence, { ease: "easeInOut", duration: 0.435 });
            if (darkBg) {
                await animate(".buttonHoverBg", { visibility: "hidden" });
                animate(".buttonHoverBg", { bottom: "-100px" });
            }
        }
    }

    const handleClick = e => {
        if (e.type === "pointerdown") {
            animate(".buttonHoverBg", { opacity: 0 }, {
                ease: "easeInOut",
                duration: 1.74 / 4
            });
        }
        else {
            animate(".buttonHoverBg", { opacity: 1 }, {
                ease: "easeInOut",
                duration: 1.74 / 8
            });
        }
    }

    const { chakraProps, nonChakraProps } = chakraPropFilter(props);

    return (
        <Box
            ref={scope}
            borderRadius="16px"
            {...chakraProps}
        >
            <ButtonRegular
                as={motion.button}
                onPointerEnter={handleHover}
                onFocus={handleHover}
                onPointerLeave={handleHover}
                onBlur={handleHover}
                onPointerDown={handleClick}
                onPointerUp={handleClick}
                w="full"
                bg="transparent"
                color={darkBg ? "brand.primary.yellow" : "brand.primary.green"}
                // border={darkBg ? "1px" : "0px"}
                border="1px"
                pos="relative"
                overflow="hidden"
                {...nonChakraProps}
            >
                {children}
                <Box
                    as={motion.div}
                    className="buttonHoverBg"
                    pos="absolute"
                    bottom={darkBg ? "-100px" : "0px"}
                    w="full"
                    h="full"
                    bg="brand.primary.yellow"
                    borderRadius="16px"
                    zIndex="hide"
                />
            </ButtonRegular>
        </Box>
    )
}

export default ButtonHoverable;