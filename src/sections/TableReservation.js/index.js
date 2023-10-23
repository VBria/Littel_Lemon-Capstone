import { HStack, Heading, VStack, Box, Text } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import ChevronButton from "../../components/Buttons/ChevronButton";
import FormProgressBar from "./FormProgressBar";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";
import SuccessMessage from "./SuccessMessage";
import { useEffect, useState, useRef } from "react";
import { InFocusGuard } from "react-focus-on";

const dayjs = require("dayjs")

const TableReservation = ({ handleFormOverlay }) => {

    const todayDate = dayjs(dayjs().format("YYYY-MM-DD")).toDate();
    const seatingOptions = ["Indoors", "Outdoors"];
    const occasionOptions = ["Birthday", "Date", "Engagement", "Anniversary", "other"];

    const formSteps = [
        {
            stepDetails: {
                stepNum: 1,
                stepHeading: "let's set up your table"
            },
            formikInitialValues: {
                numOfGuests: "",
                reservationDay: dayjs(todayDate).format("YYYY-MM-DD"),
                reservationMoment: "",
                reservationTime: "",
                // ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`))
            },
        },
        {
            stepDetails: {
                stepNum: 2,
                stepHeading: "customizations"
            },
            formikInitialValues: {
                disabilityAccomodation: false,
                seatingOptions: seatingOptions[0],
                occasions: "",
                additionalInfo: "",
                // ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`))
            }
        },
        {
            stepDetails: {
                stepNum: 3,
                stepHeading: "your details"
            },
            formikInitialValues: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                // ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`))
            }
        },
        {
            stepDetails: {
                stepNum: 4,
                stepHeading: "hold your reservation"
            },
            formikInitialValues: {
                cardNumber: "",
                cardExpiration: "",
                securityCode: "",
                cardHolderName: "",
                easyReservationSignUp: false,
                // ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`))
            }
        },
        {
            stepDetails: {
                stepNum: 5,
                stepHeading: "review and confirm"
            },
            formikInitialValues: {}
        }
    ]

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        totalNumOfSubForms: 4,
        stepInProgress: parseInt(sessionStorage.getItem("formStepInProgress")) || 1,
        previousStep: 1,
        stepsCompleted: sessionStorage.getItem("formStepsCompleted")
            ? new Set([...sessionStorage.getItem("formStepsCompleted").split(",").map(n => parseInt(n))])
            : new Set([]),
        stepsInvalid: sessionStorage.getItem("formStepsInvalid")
            ? new Set([...sessionStorage.getItem("formStepsInvalid").split(",").map(n => parseInt(n))])
            : new Set([])
    });

    const formikOnSubmitLogic = (values, formikBag, stepNum) => {
        sessionStorage.setItem(`tableReservationStep${stepNum}`, JSON.stringify(values));
        if (stepNum === 1) {
            sessionStorage.setItem("initialTimeOptions", sessionStorage.getItem("availableTimeOptions"));
        }
        setFormStatus(prev => {
            formStatus.stepsInvalid.delete(stepNum);
            return {
                ...prev,
                stepInProgress: formStatus.stepsCompleted.size === formStatus.totalNumOfSubForms
                    ? formStatus.stepsInvalid.size > 0
                        ? formStatus.stepsInvalid.values().next().value
                        : formStatus.totalNumOfSubForms + 1
                    : stepNum + 1,
                previousStep: stepNum,
                stepsCompleted: formStatus.stepsCompleted.add(stepNum),
                stepsInvalid: formStatus.stepsInvalid
            }
        });
        formikBag.setSubmitting(false);
    }

    const [formScope, animateForm] = useAnimate();

    useEffect(() => {
        if (formStatus.isSubmitted) return;
        const viewportWidth = window.innerWidth;
        switch (viewportWidth <= 1280) {
            case true:
                animateForm(formScope.current, {
                    left: `${-(formStatus.stepInProgress - 1) * 100}%`
                }, {
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                });
                break;
            default:
                animateForm(formScope.current, {
                    left: -(formStatus.stepInProgress - 1) * 1280
                }, {
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                });
        }
        sessionStorage.setItem("formStepInProgress", formStatus.stepInProgress);
        sessionStorage.setItem("formStepsCompleted", [...formStatus.stepsCompleted].toString());
        sessionStorage.setItem("formStepsInvalid", [...formStatus.stepsInvalid].toString());
        // console.log(formStatus);
        //eslint-disable-next-line
    }, [formStatus.stepInProgress, formStatus.stepsInvalid.size]);

    const goToPreviousFormStep = (event, stepValue = null) => {
        const trigger = event.target.innerHTML === "Previous"
            ? "previousBtn"
            : "otherBtns"
        setFormStatus(prev => {
            return {
                ...prev,
                stepInProgress: trigger === "previousBtn"
                    ? event.target.value - 1
                    : stepValue,
                previousStep: formStatus.stepInProgress,
            }
        })
    }

    const variants = {
        hidden: {
            left: "-100vw",
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20
            }
        },
        visible: {
            left: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20
            }
        }
    }

    const closeBtnRef = useRef(null);
    const step1BtnRef = useRef(null);
    const step2BtnRef = useRef(null);
    const step3BtnRef = useRef(null);
    const step4BtnRef = useRef(null);

    return (
        <VStack
            as={motion.section}
            id="table-reservation-section"
            pos="fixed"
            zIndex="overlay"
            w="100vw"
            h="100vh"
            spacing={0}
            top="0"
            bg="linear-gradient(180deg, #EDEFEE 0%, #D4E2CE 25%, #D1D0A6 50%, #DDB882 75%, #EE9972 100%);"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
        >
            {/* Header */}
            <InFocusGuard>
                <VStack
                    as={motion.div}
                    w="full"
                    bg="brand.primary.green"
                    initial={{ height: "max" }}
                    animate={{
                        height: formStatus.isSubmitted
                            ? "100%"
                            : "max"
                    }}
                >
                    <VStack
                        w="full"
                        maxW="container.xl"
                        as="header"
                        pt={{ base: 2, md: 4 }}
                        pb={{ base: 4, md: 8, xl: 4 }}
                        px={{ base: "20px", md: "70px" }}
                        color="brand.primary.yellow"
                        spacing={{ base: 0, md: 4, xl: 2 }}
                    >
                        {/* title & form close button */}
                        <HStack
                            w="full"
                            justify="space-between"
                        >
                            {/* heading */}
                            <Heading
                                as="h2"
                                fontSize="40px"
                                fontWeight={400}
                                lineHeight="none"
                            >
                                Table Reservation
                            </Heading>
                            {/* close btn */}
                            <HStack
                                as="button"
                                // border="1px"
                                ref={closeBtnRef}
                                onClick={handleFormOverlay}
                                id="form-close-btn"
                                spacing={0}
                                border="2px"
                                px={2}
                                borderRadius="16px"
                                disabled={formStatus.isSubmitting}
                                cursor={formStatus.isSubmitting && "not-allowed"}
                                aria-labelledby="Close Table Reservation"
                                role="button"
                            >
                                <Text
                                    fontSize="18px"
                                    fontWeight={400}
                                    lineHeight="none"
                                >
                                    Close
                                </Text>
                                <ChevronButton />
                            </HStack>
                        </HStack>

                        {/* form progress bar */}
                        {
                            !formStatus.isSubmitted
                                ? <InFocusGuard>
                                    <FormProgressBar
                                        formStatus={formStatus}
                                        goToPreviousFormStep={goToPreviousFormStep}
                                        stepBtnRefs={[step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                    />
                                </InFocusGuard>
                                : null
                        }
                    </VStack>
                    {
                        formStatus.isSubmitted
                        &&
                        <SuccessMessage
                            title="Your table is reserved!"
                            message="You'll receive a confirmation email  shortly."
                            focusLockShards={[closeBtnRef]}
                            handleFormOverlay={handleFormOverlay}
                        />
                    }
                </VStack>
            </InFocusGuard>

            {/* Form  container*/}
            {
                !formStatus.isSubmitted
                    ? <Box
                        w="full"
                        maxW="container.xl"
                        h={{ base: "calc(100% - 111px)", md: "calc(100% - 166px)", xl: "calc(100% - 142px)" }}
                        overflow="hidden"
                    >
                        <HStack
                            as={motion.div}
                            id="reservation-form-stack"
                            w="max"
                            h={{ base: "full" }}
                            pos="relative"
                            spacing={0}
                            align="start"
                            ref={formScope}
                            left={{ base: `${-(formStatus.previousStep - 1) * 100}vw`, xl: `${-(formStatus.previousStep - 1) * 1280}px` }}
                        >
                            <FormStep1
                                formStatus={formStatus}
                                setFormStatus={setFormStatus}
                                formikOnSubmitLogic={formikOnSubmitLogic}
                                todayDate={todayDate}
                                focusLockShards={[closeBtnRef, step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                handleFormOverlay={handleFormOverlay}
                                {...formSteps[0]}
                            />
                            <FormStep2
                                formStatus={formStatus}
                                setFormStatus={setFormStatus}
                                formikOnSubmitLogic={formikOnSubmitLogic}
                                goToPreviousFormStep={goToPreviousFormStep}
                                seatingOptions={seatingOptions}
                                occasionOptions={occasionOptions}
                                focusLockShards={[closeBtnRef, step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                handleFormOverlay={handleFormOverlay}
                                {...formSteps[1]}
                            />
                            <FormStep3
                                formStatus={formStatus}
                                setFormStatus={setFormStatus}
                                formikOnSubmitLogic={formikOnSubmitLogic}
                                goToPreviousFormStep={goToPreviousFormStep}
                                focusLockShards={[closeBtnRef, step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                handleFormOverlay={handleFormOverlay}
                                {...formSteps[2]}
                            />
                            <FormStep4
                                formStatus={formStatus}
                                setFormStatus={setFormStatus}
                                formikOnSubmitLogic={formikOnSubmitLogic}
                                goToPreviousFormStep={goToPreviousFormStep}
                                focusLockShards={[closeBtnRef, step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                handleFormOverlay={handleFormOverlay}
                                {...formSteps[3]}
                            />
                            <FormStep5
                                formStatus={formStatus}
                                setFormStatus={setFormStatus}
                                goToPreviousFormStep={goToPreviousFormStep}
                                focusLockShards={[closeBtnRef, step1BtnRef, step2BtnRef, step3BtnRef, step4BtnRef]}
                                handleFormOverlay={handleFormOverlay}
                                {...formSteps[4]}
                            />
                        </HStack>
                    </Box>
                    : null
            }
        </VStack >
    )
}

export default TableReservation;