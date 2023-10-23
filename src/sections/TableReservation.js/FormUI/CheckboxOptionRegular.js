import { Circle, useCheckbox, HStack, Text } from "@chakra-ui/react";
import { ReactComponent as Check } from "../../../assets/icons/radio-check.svg";


const CheckboxOptionRegular = ({ rightIcon = null, children, formikMeta, formikHelpers, ...props }) => {

    const { getInputProps, getLabelProps, getCheckboxProps, htmlProps } = useCheckbox({
        ...props,
        defaultChecked: formikMeta.value
    });

    return (
        <HStack
            as="label"
            spacing={1}
            cursor="pointer"
            htmlFor={props.id}
            tabIndex={0}
            onKeyDown={e => {
                if (["Space", "Enter"].includes(e.code)) {
                    formikHelpers.setValue(!formikMeta.value);
                }
            }}
            {...htmlProps}
        >
            <input {...getInputProps()} style={{ display: "none" }} />
            <Circle
                {...getCheckboxProps()}
                w={6}
                h={6}
                border="2px"
                borderColor="brand.primary.green"
                bg={formikMeta.value ? "brand.primary.green" : "brand.secondary.brightGray"}
            >
                <Check />
            </Circle>
            <Text
                {...getLabelProps()}
                fontSize="18px"
                fontWeight={500}
                lineHeight="none"
            >
                {children}
            </Text>
            {rightIcon}
        </HStack>
    )
}

export default CheckboxOptionRegular;