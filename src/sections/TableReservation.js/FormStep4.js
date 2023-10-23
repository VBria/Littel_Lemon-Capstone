import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HStack, Heading, Image, Text } from "@chakra-ui/react";
import FormStepFrame from "./FormStepFrame";
import FormCTAButton from "./FormUI/FormCTAButton";
import FormCTAButtonWithFormik from "./FormUI/FormCTAButtonWithFormik";
import FormElementRegular from "./FormUI/FormElementRegular";
import CheckboxOptionRegular from "./FormUI/CheckboxOptionRegular";
import InputBox from "./FormUI/InputBox";


const dayjs = require("dayjs")
    .extend(require("dayjs/plugin/isSameOrAfter"))
    .extend(require("dayjs/plugin/customParseFormat"));
const creditCardValidator = require("credit-card-validator");

const FormStep4 = ({
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
            validationSchema={Yup.object({
                cardNumber: Yup.string()
                    .trim()
                    .required("Required")
                    .matches(/^\d*$/, "Please enter card number without any dashes or spaces")
                    .test(
                        'is-valid-acountNumLength',
                        (cardNum, context) => {
                            return creditCardValidator.validateCard(cardNum) || context.createError({
                                name: "cardNumber",
                                message: creditCardValidator.getCardAccountNumLengths(cardNum) >= 0
                                    ? `Please enter a valid ${creditCardValidator.getCardAccountNumLengths(cardNum)}-digit credit card number`
                                    : "Please enter a valid credit card number"
                            })
                        }
                    ),
                cardExpiration: Yup.string()
                    .trim()
                    .required("Required")
                    .test(
                        'is-valid-future-expiration',
                        "The expiration is invalid as it is in the past",
                        (value, context) => {
                            return dayjs(value, "MM/YYYY", true).isValid()
                                ? dayjs(value, "MM/YYYY").isSameOrAfter(dayjs(), "M")
                                : context.createError({
                                    path: "cardExpiration",
                                    message: "Please enter 2-digit month and 4-digit year"
                                })
                        }
                    ),
                securityCode: Yup.string()
                    .trim()
                    .required("Required")
                    .matches(/^\d*$/, "Please enter code digits only")
                    .test(
                        'is-valid-code',
                        (code, context) => {
                            const cardNum = Object.getOwnPropertyNames(context.parent).includes("cardNumber")
                                ? context.parent.cardNumber : null;
                            try {
                                if (!creditCardValidator.validateCardAndSecCode(cardNum, code)) {
                                    // eslint-disable-next-line
                                    throw "InvalidCode";
                                }
                                return true;
                            }
                            catch (err) {
                                return context.createError({
                                    path: "securityCode",
                                    message: err === "InvalidCode" && creditCardValidator.getCardSecurityNumLengths(cardNum) >= 0
                                        ? `Please enter valid ${creditCardValidator.getCardSecurityNumLengths(cardNum)}-digit security code`
                                        : "Please enter a valid credit card number first"
                                })
                            }
                        }
                    ),
                cardHolderName: Yup.string()
                    .trim()
                    .required("Required"),
                easyReservationSignUp: Yup.boolean()
                    .notRequired(),
            })}
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
                    {/* reservation price info */}
                    <Heading
                        as="h4"
                        fontSize={{ base: "24px", md: "32px" }}
                        fontWeight={400}
                        lineHeight="none"
                    >
                        We'll place a temporary charge of $10.00 on your card.
                    </Heading>
                    {/* payment method secure info */}
                    <HStack
                        w="full"
                        py={2}
                        spacing={4}
                        bg="linear-gradient(90deg, rgba(238, 153, 114, 0.00) 0%, #EE9972 47.2%, rgba(238, 153, 114, 0.00) 100%);"
                        justify="center"
                    >
                        <Image
                            alt="SSL secure payment"
                            src={require("../../assets/icons/lock-icon.png")}
                            objectFit="cover"
                            height="32px"
                        />
                        <Text
                            fontSize="16px"
                            color="brand.secondary.darkCharcoal"
                            fontWeight={400}
                            lineHeight="150%"
                        >
                            This is a secure 128-bit SSL Encrypted payment. You're safe.
                        </Text>
                    </HStack>

                    {/* credit card num */}
                    <FormElementRegular
                        label="Card Number (no dashes or spaces)"
                        isRequired
                        name="cardNumber"
                        id="cardNumber"
                        hasHelperInfoIcon
                        infoFor="card-number"
                        inputComponent={inputProps => <InputBox
                            {...inputProps}
                            onChange={e => {
                                let value = e.target.value.trim();
                                inputProps.formikHelpers.setValue(value);
                            }}
                        />}
                    />

                    {/* card expiration date */}
                    <FormElementRegular
                        label="Card Expiration (MM/YYYY)"
                        isRequired
                        name="cardExpiration"
                        id="cardExpiration"
                        hasHelperInfoIcon
                        infoFor="card-expiration"
                        inputComponent={inputProps => <InputBox
                            {...inputProps}
                            onChange={e => {
                                let value = e.target.value.trim();
                                if (value.length === 3) {
                                    value = value[2] === "/" ? value : value.substr(0, 2) + "/" + value[2]
                                }
                                inputProps.formikHelpers.setValue(value);
                            }}
                        />}
                    />

                    {/* card security code */}
                    <FormElementRegular
                        label="Security Code"
                        isRequired
                        name="securityCode"
                        id="securityCode"
                        hasHelperInfoIcon
                        infoFor="card-security-code"
                        inputComponent={inputProps => <InputBox
                            {...inputProps}
                            onChange={e => {
                                let value = e.target.value.trim();
                                inputProps.formikHelpers.setValue(value);
                            }}
                        />}
                    />
                    {/* name on the card */}
                    <FormElementRegular
                        label="Name on this card"
                        isRequired
                        name="cardHolderName"
                        id="cardHolderName"
                        hasHelperInfoIcon
                        infoFor="card-holder-name"
                        inputComponent={inputProps => <InputBox
                            {...inputProps}
                            onChange={e => {
                                let value = e.target.value.trimStart();
                                inputProps.formikHelpers.setValue(value);
                            }}
                        />}
                    />

                    {/* easy reservation checkbox */}
                    <FormElementRegular
                        label={false}
                        name="easyReservationSignUp"
                        id="easyReservationSignUp"
                        type="checkbox"
                        inputComponent={inputProps => <CheckboxOptionRegular
                            {...inputProps}
                        >
                            Save this card for easy reservations
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

export default FormStep4;