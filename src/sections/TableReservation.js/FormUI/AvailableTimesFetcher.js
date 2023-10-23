import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import fetchAPI from "../../../util/fetchAPI";
import timeSortingFunction from "../../../util/timeSortingFunction";
import { HStack, Spinner, Text } from "@chakra-ui/react"

const AvaiableTimesFetcher = ({ renderComponent }) => {

    const { values, initialValues, setFieldValue } = useFormikContext();
    const reservationMomentValue = values["reservationMoment"].split(" ")[0];
    const reservationDayValue = values["reservationDay"].split(" ")[0];

    const [options, setOptions] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialValues.reservationTime
            && values.reservationDay === initialValues.reservationDay
            && values.reservationMoment === initialValues.reservationMoment) {
            const sessionStoredOptions = JSON.parse(sessionStorage.getItem("initialTimeOptions"));
            !values.reservationTime && setFieldValue("reservationTime", initialValues.reservationTime);
            setOptions(timeSortingFunction(sessionStoredOptions));
        }
        else if (reservationMomentValue && reservationDayValue) {
            setOptions(null);
            setError(null);
            setFieldValue("reservationTime", "");
            fetchAPI(reservationMomentValue, reservationDayValue).then(
                (result) => {
                    sessionStorage.setItem("availableTimeOptions", JSON.stringify(result));
                    setOptions(timeSortingFunction(result));
                },
                (error) => {
                    setError(error.message);
                }
            )
        }
        // eslint-disable-next-line
    }, [reservationMomentValue, reservationDayValue])

    return options
        ? renderComponent(options)
        : reservationMomentValue
        &&
        (
            <>
                {error
                    ? <Text
                        fontSize="18px"
                        fontWeight={500}
                        color="#E53E3E"
                    >
                        {error}
                    </Text>
                    : <HStack>
                        <Spinner
                            color="brand.primary.green"
                            emptyColor="brand.secondary.brightGray"
                            size="xl"
                            speed={1.74 / 2 + "s"}
                        />
                        <Text>
                            Retrieving available time slots
                        </Text>
                    </HStack>
                }
            </>
        )
}

export default AvaiableTimesFetcher;