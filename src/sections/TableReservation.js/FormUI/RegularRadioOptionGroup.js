import { HStack, useRadioGroup } from "@chakra-ui/react";
import RadioOptionRegular from "./RadioOptionRegular";
import { useEffect } from "react";


const RegularRadioOptionGroup = ({
    options = ["option1", "option2"],
    name, formikMeta, formikHelpers,
    ...otherProps }) => {

    const { getRootProps, getRadioProps, value, setValue } = useRadioGroup({
        defaultValue: formikMeta.value,
    });

    const handleFormValue = async value => {
        await formikHelpers.setValue(value);
        formikHelpers.setTouched(true);
    }

    useEffect(() => {
        value && handleFormValue(value);
        //eslint-disable-next-line
    }, [value])

    return (
        <HStack
            spacing={4}
            {...getRootProps()}
        >
            {options.map(val => <RadioOptionRegular
                {...getRadioProps({ value: val })}
                name={name}
                key={val}
                value={val}
                setValue={setValue}
            >
                {val}
            </RadioOptionRegular>)}
        </HStack>
    )
}

export default RegularRadioOptionGroup;