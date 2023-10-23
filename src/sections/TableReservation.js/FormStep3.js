import { HStack, VStack, Text, Stack, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormStepFrame from "./FormStepFrame";
import FormCTAButton from "./FormUI/FormCTAButton";
import FormCTAButtonWithFormik from "./FormUI/FormCTAButtonWithFormik";
import FormElementRegular from "./FormUI/FormElementRegular";
import InputBox from "./FormUI/InputBox";
import CheckboxOptionRegular from "./FormUI/CheckboxOptionRegular";
import { AsYouType, parsePhoneNumber } from "libphonenumber-js";


const emailValidator = require("email-validator");

const FormStep3 = ({
    stepDetails, formStatus, setFormStatus, goToPreviousFormStep, formikOnSubmitLogic, formikInitialValues,
    focusLockShards, handleFormOverlay,
    ...otherStepProps
}) => {
    return (
        <Formik
            validateOnMount={true}
            initialValues={{
                ...formikInitialValues,
                ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`))
            }}
            validationSchema={Yup.object().shape({
                firstname: Yup.string()
                    .required("Required"),
                lastname: Yup.string()
                    .required("Required"),
                email: Yup.string()
                    .required("Required")
                    .test(
                        'is-email-valid',
                        "Please enter a valid email address",
                        value => emailValidator.validate(value)
                    ),
                phone: Yup.string()
                    .when("phone", val => {
                        return val[0]
                            ? Yup.string()
                                .required("Required")
                                .test(
                                    'is-valid-phone',
                                    "Phone Number is Invalid",
                                    value => {
                                        if (value) {
                                            try {
                                                const phoneNum = parsePhoneNumber(value, "US")
                                                return phoneNum.isValid();
                                            }
                                            catch {
                                                return false;
                                            }
                                        }
                                    }
                                )
                            : Yup.string()
                                .notRequired()
                    })
            }, [
                ["phone", "phone"]
            ])}
            onSubmit={(values, formikBag) => {
                formikOnSubmitLogic(values, formikBag, stepDetails.stepNum)
            }}
            onReset={(values, formikBag) => {
                sessionStorage.removeItem(`tableReservationStep${stepDetails.stepNum}`);
            }}
        >
            <Form
                id={`tableReservationStep${stepDetails.stepNum}`}
                style={{ height: "100%" }}
                noValidate
            // method="post"
            >
                <FormStepFrame
                    stepDetails={stepDetails}
                    formStatus={formStatus}
                    focusLockShards={focusLockShards}
                    handleFormOverlay={handleFormOverlay}
                >
                    {/* login or guest info stack */}
                    <VStack
                        w="full"
                        spacing={2}
                    >
                        {/* log in button */}
                        <Box
                            as="h4"
                        >
                            <FormCTAButton
                                primary
                                w="280px"
                            >
                                Log in
                            </FormCTAButton>
                        </Box>

                        <Text
                            fontSize="16px"
                            lineHeight="150%"
                        >
                            OR
                        </Text>

                        {/* guest info stack */}
                        <Text
                            as="h4"
                            fontSize="18px"
                            fontWeight={500}
                            lineHeight="none"
                        >
                            Continue as a guest
                        </Text>
                    </VStack>
                    {/* name stack */}
                    <Stack
                        w="full"
                        spacing={4}
                        direction={{ base: "column", xl: "row" }}
                    >
                        <FormElementRegular
                            label="First name"
                            name="firstname"
                            id="firstname"
                            type="text"
                            isRequired
                            inputComponent={inputProps => <InputBox
                                {...inputProps}
                                onChange={e => {
                                    const val = e.target.value.trimStart();
                                    inputProps.formikHelpers.setValue(val);
                                }}
                            />}
                        />
                        <FormElementRegular
                            label="Last name"
                            name="lastname"
                            id="lastname"
                            type="text"
                            isRequired
                            inputComponent={inputProps => <InputBox
                                {...inputProps}
                                onChange={e => {
                                    const val = e.target.value.trimStart();
                                    inputProps.formikHelpers.setValue(val);
                                }}
                            />}
                        />
                    </Stack>

                    {/* contact info stack */}
                    <Stack
                        w="full"
                        spacing={4}
                        direction={{ base: "column", xl: "row" }}
                    >
                        <FormElementRegular
                            label="Email"
                            name="email"
                            id="email"
                            type="text"
                            isRequired
                            inputComponent={inputProps => <InputBox
                                {...inputProps}
                                onChange={e => {
                                    const val = e.target.value.trim();
                                    inputProps.formikHelpers.setValue(val);
                                }}
                            />}
                        />
                        <FormElementRegular
                            label="Phone"
                            name="phone"
                            id="phone"
                            type="text"
                            inputComponent={inputProps => <InputBox
                                {...inputProps}
                                onChange={e => {
                                    let val = e.target.value.trim();
                                    const formattedVal = val.length === 4 || val.length === 6 ? val : new AsYouType('US').input(val);
                                    inputProps.formikHelpers.setValue(formattedVal);
                                }}
                            />}
                        />
                    </Stack>

                    {/* easy reservation option */}
                    <FormElementRegular
                        label={false}
                        name="signUpForEasyReservation"
                        id="signUpForEasyReservation"
                        type="checkbox"
                        inputComponent={inputProps => <CheckboxOptionRegular
                            {...inputProps}
                        >
                            Sign me up as well
                        </CheckboxOptionRegular>}
                    />


                    {/* CTA button Stack */}
                    <HStack
                        w="full"
                        spacing={4}
                    >
                        <FormCTAButtonWithFormik
                            value={stepDetails.stepNum}
                            onClick={goToPreviousFormStep}
                            render={(withProps) => <FormCTAButton {...withProps} />}
                        >
                            Previous
                        </FormCTAButtonWithFormik>
                        <FormCTAButtonWithFormik
                            primary
                            type="submit"
                            formStatus={formStatus}
                            setFormStatus={setFormStatus}
                            stepNum={stepDetails.stepNum}
                            render={(withProps) => <FormCTAButton {...withProps} />}
                        >
                            {formStatus.stepsInvalid.size === 0 ? "Review" : "Next"}
                        </FormCTAButtonWithFormik>
                    </HStack>
                    <FormCTAButtonWithFormik
                        type="reset"
                        display={formStatus.stepsCompleted.size === formStatus.totalNumOfSubForms ? "block" : "none"}
                        formikInitialValues={formikInitialValues}
                        stepNum={stepDetails.stepNum}
                        render={(withProps) => <FormCTAButton {...withProps} />}
                    >
                        Reset
                    </FormCTAButtonWithFormik>
                </FormStepFrame>
            </Form>
        </Formik>
    )
}

export default FormStep3;