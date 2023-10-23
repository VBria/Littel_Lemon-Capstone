import { Button, HStack, useNumberInput } from "@chakra-ui/react";
import InputBox from "./InputBox";
import { useEffect } from "react";

const NumberInput = ({ step = 1, min = 1, max = 16, formikHelpers, formikMeta, ...props }) => {

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: step,
        defaultValue: formikMeta.value,
        min: min,
        max: max,
    });

    const numBtnProps = {
        size: "lg",
        boxShadow: "0px 4px 4px 0px #33333380",
        colorScheme: "none",
        bg: "brand.secondary.brightGray",
        color: "brand.primary.green",
        fontSize: "40px",
        fontWeight: 400,
        fontFamily: "Markazi Text",
        borderRadius: "8px",
        _active: {
            bg: "brand.primary.green",
            color: "brand.secondary.brightGray",
            boxShadow: "0px 0px 0px 0px #33333380",
            transform: "translateY(2px)"
        }
    }
    const numInputProps = {
        textAlign: "center",
        ...props
    }

    const input = getInputProps(numInputProps);
    const inc = getIncrementButtonProps(numBtnProps);
    const dec = getDecrementButtonProps(numBtnProps);

    useEffect(() => {
        formikHelpers.setValue(input.value);
        // eslint-disable-next-line
    }, [input.value])

    return (
        <HStack
            w="full"
            spacing={4}
        >
            <Button
                {...dec}
            >
                -
            </Button>
            <InputBox
                {...input}
                value={formikMeta.value}
            />
            <Button
                {...inc}
            >
                +
            </Button>
        </HStack>
    )
}
export default NumberInput;