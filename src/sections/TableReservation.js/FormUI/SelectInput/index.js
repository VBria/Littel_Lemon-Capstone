import { HStack, Text, VStack } from "@chakra-ui/react";
import { ReactComponent as ChevronIcon } from "../../../../assets/icons/chevron.svg"
import { useAnimate, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import OptionsStack from "./OptionsStack";
import DateSelector from "./DateSelector";


const dayjs = require("dayjs");

const SelectInput = ({
    leftIcon = null, placeHolder = "placeholder", renderAsDatePicker = false,
    formikHelpers, formikMeta,
    ...props }) => {

    const {
        nextAvailableDate,
        options = ["option1", "option2", "option3", "option4"],
        ...inputFieldProps
    } = props;

    const [scope, animate] = useAnimate();

    const [isOpen, setIsOpen] = useState(false);

    // const [selectedOption, setSelectedOption] = useState(defaultOption);
    const handleOptionSelection = async option => {
        const optionValue = option.target.getElementsByTagName("p")[0].innerHTML;
        await formikHelpers.setValue(optionValue)
            .then(errors => {
                if (!Object.keys(errors).includes("reservationDate")) {
                    wasOpen.current = isOpen;
                    setIsOpen(false);
                }
            });
        formikHelpers.setTouched(true);
        // setSelectedOption(optionValue);
    }

    const handleDateSelection = async date => {
        const newDate = dayjs(date).format("YYYY-MM-DD");
        await formikHelpers.setValue(newDate)
            .then(errors => {
                if (!Object.keys(errors).includes("reservationDate")) {
                    wasOpen.current = isOpen;
                    setIsOpen(false);
                }
            });
        formikHelpers.setTouched(true);
        // setSelectedDate(newDate);
    }

    const wasOpen = useRef(false);

    useEffect(() => {
        // animate icons for opening and closing action of select
        animate(".select-btn-chevron path", {
            fill: !formikMeta.error && formikMeta.value
                ? "#EDEFEE"
                : "#495E57"
        }, { duration: 0.01 });
        leftIcon && animate(".leftIcon path", {
            fill: !formikMeta.error && formikMeta.value
                ? "#EDEFEE"
                : "#495E57"
        }, { duration: 0.01 });

        // animate opening and closing action of select
        if (isOpen) {
            animate([
                [".select-btn-chevron", { transform: "rotateZ(90deg)" }],
                [".rendered-select-button", {
                    boxShadow: "0px 4px 4px 0px #33333380",
                    border: "0px",
                    transform: "translateY(-1px)"
                }, { at: "<" }]
            ], {
                ease: "easeOut",
                duration: 1.74 / 4
            })
        }
        else if (wasOpen.current) {
            animate(".rendered-select-button", {
                border: formikMeta.touched && formikMeta.error
                    ? "2px solid #E53E3E"
                    : "1px solid #495E57"
            }, {
                duration: 0.01
            });
            animate([
                [".select-btn-chevron", { transform: "rotateZ(-90deg)" }],
                [".rendered-select-button", {
                    boxShadow: "0px 0px 0px 0px #33333380",
                    transform: "translateY(1px)"
                }, { at: "<" }]
            ], {
                ease: "easeOut",
                duration: 1.74 / 4
            });
        }

        // set touched state
        if (!isOpen && wasOpen.current && !formikMeta.touched) {
            formikHelpers.setTouched(true);
        };
        //eslint-disable-next-line
    }, [formikMeta.touched, formikMeta.error, formikMeta.value, isOpen])

    return (
        <VStack
            w={{ base: "full" }}
            spacing={2}
            ref={scope}
        >
            {/* form select button (hidden) */}
            {renderAsDatePicker
                ? <input
                    readOnly
                    {...inputFieldProps}
                    style={{ display: "none" }}
                />
                : <select
                    {...inputFieldProps}
                    style={{ display: "none" }}
                >
                    <option disabled value="">Pick an option</option>
                    {options.map(option => <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>)}
                </select>
            }

            {/* Rendered select button */}
            {/* selected button */}
            <HStack
                className="rendered-select-button"
                as={motion.div}
                w={{ base: "full" }}
                justify="space-between"
                bg={!formikMeta.error && formikMeta.value
                    ? "brand.primary.green" : "brand.secondary.brightGray"}
                color={!formikMeta.error && formikMeta.value
                    ? "brand.secondary.brightGray" : "brand.primary.green"}
                borderRadius="16px"
                px={8}
                py={4}
                cursor="pointer"
                // border={!formikMeta.error && formikMeta.value ? "0px" : "1px"}
                border={formikMeta.touched && formikMeta.error ? "2px" : "1px"}
                borderColor={formikMeta.touched && formikMeta.error ? "#E53E3E" : "#495E57"}
                onClick={() => {
                    wasOpen.current = isOpen;
                    setIsOpen(!isOpen);
                }}
                tabIndex={0}
                onKeyDown={e => {
                    if (["ArrowDown", "Space"].includes(e.code)) {
                        wasOpen.current = isOpen;
                        setIsOpen(!isOpen);
                    }
                }}
            >
                {/* left icon */}
                {leftIcon && leftIcon({
                    className: "leftIcon"
                })}

                {/* selected item or placeholder */}
                <Text
                    fontSize="18px"
                    fontWeight={500}
                    lineHeight="none"
                >
                    {
                        renderAsDatePicker
                            ? formikMeta.value === dayjs().format("YYYY-MM-DD")
                                ? "Today"
                                : dayjs(formikMeta.value, "YYYY-MM-DD").format("dddd, MMMM D, YYYY")
                            : formikMeta.value || placeHolder
                    }
                </Text>
                {/* right icon */}
                <ChevronIcon
                    as={motion.svg}
                    className="select-btn-chevron"
                    style={{
                        width: "10.62",
                        height: "18",
                        viewBox: "0 0 10.62 18",
                        filter: "drop-shadow(0px 4px 4px #33333340)",
                        transform: "rotateZ(-90deg)"
                    }}
                />
            </HStack>
            {/* select options stack */}
            {
                renderAsDatePicker
                    ? <AnimatePresence>
                        {isOpen && <DateSelector
                            key="selectDateSelector"
                            handleDateSelection={handleDateSelection}
                            selectedDate={formikMeta.value}
                            nextAvailableDate={nextAvailableDate}
                        />}
                    </AnimatePresence>
                    : <AnimatePresence>
                        {isOpen && <OptionsStack
                            key="selectOptionsStack"
                            options={options}
                            selectedOption={formikMeta.value}
                            handleOptionSelection={handleOptionSelection}
                        />}
                    </AnimatePresence>
            }
        </VStack >
    )
}

export default SelectInput;