import { HStack, useRadio, Text, Box } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { ReactComponent as ClockIcon } from "../../../../assets/icons/select-time-radio-option-clock.svg";
import { useEffect } from "react";


const TimeRadioInputOption = ({ children, setValue, ...props }) => {

    const { getInputProps, getRadioProps, getLabelProps, state } = useRadio(props);

    const [scope, animate] = useAnimate();

    useEffect(() => {
        const animationTransition = {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
        if (state.isChecked) {
            animate([
                [".radio-select-clock-icon path", { fill: "#EDEFEE" }],
                [".radio-select-clock-icon", { transform: "rotateZ(180deg)" }, { at: "<" }],
            ], animationTransition)
        }
        else {
            animate([
                [".radio-select-clock-icon path", { fill: "#495E57" }],
                [".radio-select-clock-icon", { transform: "rotateZ(0deg)" }, { at: "<" }],
            ], animationTransition)
        }
    })

    return (
        <Box
            as="label"
            cursor="pointer"
            htmlFor={children}
            tabIndex={0}
            onKeyDown={e => {
                if (e.code === "Enter") {
                    setValue(children);
                }
            }}
        >
            <input {...getInputProps()} id={children} style={{ display: "none" }} />
            <HStack
                {...getRadioProps()}
                as={motion.div}
                w="136px"
                spacing={4}
                p={2}
                borderRadius="16px"
                bg={state.isChecked ? "brand.primary.green" : "brand.secondary.brightGray"}
                color={state.isChecked ? "brand.secondary.brightGray" : "brand.secondary.darkCharcoal"}
                boxShadow={state.isChecked ? null : "0px 4px 4px 0px #33333380"}
                ref={scope}
            >
                <Box
                    className="radio-select-clock-icon"
                    as={motion.div}
                >
                    <ClockIcon />
                </Box>
                <Text
                    as={motion.p}
                    fontSize="18px"
                    fontWeight={500}
                    lineHeight="none"
                    {...getLabelProps()}
                >
                    {children}
                </Text>
            </HStack>
        </Box>
    )
}

export default TimeRadioInputOption;