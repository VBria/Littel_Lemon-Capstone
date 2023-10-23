import { Box, HStack, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import FormCTAButton from "./FormUI/FormCTAButton";
import FormStepFrame from "./FormStepFrame";
import ReservationReviewItem from "./FormUI/ReservationReviewItem";
import { useEffect, useState } from "react";
import submitAPI from "../../util/submitAPI";


const dayjs = require("dayjs");

const FormStep5 = ({ stepDetails, formStatus, setFormStatus, goToPreviousFormStep, focusLockShards, handleFormOverlay, }) => {

    const reviewItems = [
        {
            item: "Party size",
            fieldName: "numOfGuests",
            formStepNum: 1
        },
        {
            item: "Date",
            fieldName: "reservationDay",
            formStepNum: 1
        },
        {
            item: "Moment",
            fieldName: "reservationMoment",
            formStepNum: 1
        },
        {
            item: "Time",
            fieldName: "reservationTime",
            formStepNum: 1
        },
        {
            item: "Disability accomodations",
            fieldName: "disabilityAccomodation",
            formStepNum: 2
        },
        {
            item: "Seating preference",
            fieldName: "seatingOptions",
            formStepNum: 2
        },
        {
            item: "Occasion",
            fieldName: "occasion",
            formStepNum: 2
        },
        {
            item: "Additional info",
            fieldName: "additionalInfo",
            formStepNum: 2
        },
        {
            item: "Your name",
            fieldName: "firstname, lastname",
            formStepNum: 3
        },
        {
            item: "Your email",
            fieldName: "email",
            formStepNum: 3
        },
        {
            item: "Credit card",
            fieldName: "cardNumber",
            formStepNum: 4
        },
    ]

    const [formData, setFormData] = useState(null);
    // const [isSubmitting, setSubmitting] = useState(true);

    useEffect(() => {
        formStatus.stepInProgress === 5
            &&
            setFormData({
                ...JSON.parse(sessionStorage.getItem("tableReservationStep1")),
                ...JSON.parse(sessionStorage.getItem("tableReservationStep2")),
                ...JSON.parse(sessionStorage.getItem("tableReservationStep3")),
                ...JSON.parse(sessionStorage.getItem("tableReservationStep4")),
            });
    }, [formStatus.stepInProgress])

    const handleSubmit = e => {
        e.preventDefault();
        setFormStatus(prev => {
            return {
                ...prev,
                isSubmitting: true,
            }
        })
    }

    useEffect(() => {
        if (formStatus.isSubmitting) {
            submitAPI(formData)
                .then(
                    () => {
                        setFormStatus(prev => {
                            return {
                                ...prev,
                                isSubmitting: false,
                                isSubmitted: true
                            }
                        });
                        sessionStorage.clear();
                        sessionStorage.setItem(
                            "previousTableReservation",
                            `${formData["reservationDay"]}, ${formData["reservationTime"]}`
                        );
                    },
                    (rejectionError) => {
                        console.log(rejectionError.message);
                    }
                )
        }
        // eslint-disable-next-line
    }, [formStatus.isSubmitting])

    return (
        <Box
            as="form"
            id={`tableReservationStep${stepDetails.stepNum}`}
            style={{ height: "100%" }}
            noValidate
            onSubmit={handleSubmit}
        // method="post"
        >
            <FormStepFrame
                stepDetails={stepDetails}
                formStatus={formStatus}
                focusLockShards={focusLockShards}
                handleFormOverlay={handleFormOverlay}
            >
                {formData
                    &&
                    reviewItems.map(reviewItem => {
                        let desc = null;
                        if (reviewItem.item.includes("name")) {
                            desc = formData[reviewItem.fieldName.split(",")[0].trim()] + " " + formData[reviewItem.fieldName.split(",")[1].trim()]
                        }
                        else if (reviewItem.item.includes("Date")) {
                            desc = dayjs(formData[reviewItem.fieldName], "YYYY-MM-DD").format("dddd, MMMM D, YYYY")
                        }
                        else if (reviewItem.item.includes("Moment")) {
                            desc = formData[reviewItem.fieldName].split(" ")[0]
                        }
                        else {
                            desc = formData[reviewItem.fieldName]
                            desc = typeof (desc) === "boolean" ? desc.toString() : desc
                        }
                        return desc && <ReservationReviewItem
                            key={reviewItem.item}
                            item={reviewItem.item}
                            desc={desc}
                            formStepNum={reviewItem.formStepNum}
                            fieldName={reviewItem.fieldName}
                            goToPreviousFormStep={goToPreviousFormStep}
                            editable={!formStatus.isSubmitting}
                        />
                    })
                }
                {/* reservation price info */}
                <Heading
                    as="h4"
                    fontSize={{ base: "24px", md: "32px" }}
                    fontWeight={400}
                    lineHeight="150%"
                >
                    We'll place a temporary charge of $10.00 on your card.
                    {
                        !formStatus.isSubmitting && <><br />Click reserve to finalize.</>
                    }
                </Heading>
                {/* CTA button Stack or submission feedback */}
                {
                    formStatus.isSubmitting
                        ? <VStack
                            spacing={4}
                            w="full"
                        >
                            <Spinner
                                size="xl"
                                color="brand.primary.green"
                                emptyColor="brand.secondary.brightGray"
                                speed={1.74 / 2 + "s"}
                                thickness="4px"
                            />
                            <Text
                                fontSize={{ base: "24px", md: "32px" }}
                                fontWeight={400}
                                textAlign="center"
                            >
                                Please wait while we process and reserve your table.
                            </Text>
                        </VStack>
                        : <HStack
                            w="full"
                            spacing={4}
                        >
                            <FormCTAButton
                                value={stepDetails.stepNum}
                                onClick={goToPreviousFormStep}
                            >
                                Previous
                            </FormCTAButton>
                            <FormCTAButton
                                primary
                                type="submit"
                            >
                                Reserve
                            </FormCTAButton>
                        </HStack>
                }
            </FormStepFrame>
        </Box>
    )
}

export default FormStep5;