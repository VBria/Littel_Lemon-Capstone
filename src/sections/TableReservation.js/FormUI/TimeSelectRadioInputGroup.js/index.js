import { HStack, VStack, Box } from "@chakra-ui/react";
import { useRadioGroup } from "@chakra-ui/react";
import TimeRadioInputOption from "./TimeRadioInputOption";
import { useEffect } from "react";


const TimeSelectRadioInputGroup = ({ formikHelpers, formikMeta, options, ...props }) => {

    const { id, name } = props;
    const { getRadioProps, getRootProps, value, setValue } = useRadioGroup({
        defaultValue: formikMeta.initialValue
    });


    const optionsGroups = []
    // split the timeOption into groups of threes
    if (options) {
        for (let i = 0; 3 * i <= options.length; i++) {
            optionsGroups.push(options.slice(3 * i, 3 * (i + 1)));
        }
    }

    const handleRadioValue = async (value) => {
        await formikHelpers.setValue(value);
        formikHelpers.setTouched(true);
    }

    useEffect(() => {
        value && handleRadioValue(value);
        // eslint-disable-next-line
    }, [value])

    return (
        <Box
            w={{ base: "100vw", xl: "full" }}
            overflow="auto"
            pos="relative"
            left={{ base: "-20px", md: "-70px", xl: null }}
        >
            <HStack
                w="max"
                px={{ base: "20px", md: "70px", xl: null }}
                pb={2}
                spacing={{ base: 2, md: 4 }}
                align="start"
                id={id}
                {...getRootProps()}
            >
                {optionsGroups.map(timeGroup => {
                    return (
                        <VStack
                            key={timeGroup.toString()}
                            spacing={2}
                        >
                            {timeGroup.map(value => {
                                return (
                                    <TimeRadioInputOption
                                        {...getRadioProps({ value })}
                                        name={name}
                                        key={value}
                                        value={value}
                                        setValue={setValue}
                                    >
                                        {value}
                                    </TimeRadioInputOption>
                                )
                            })}
                        </VStack>
                    )
                })
                }
            </HStack>
        </Box>
    )
}

export default TimeSelectRadioInputGroup;