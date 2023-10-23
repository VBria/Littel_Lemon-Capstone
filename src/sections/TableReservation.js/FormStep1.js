import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormStepFrame from "./FormStepFrame";
import FormElementRegular from "./FormUI/FormElementRegular";
import NumberInput from "./FormUI/NumberInput"
import SelectInput from "./FormUI/SelectInput";
import FormCTAButton from "./FormUI/FormCTAButton";
import FormCTAButtonWithFormik from "./FormUI/FormCTAButtonWithFormik";
import TimeSelectRadioInputGroup from "./FormUI/TimeSelectRadioInputGroup.js/index.js";
import AvailableTimesFetcher from "./FormUI/AvailableTimesFetcher";


const dayjs = require("dayjs")


const FormStep1 = ({
    stepDetails, formStatus, setFormStatus, formikOnSubmitLogic, formikInitialValues,
    focusLockShards, handleFormOverlay,
    ...otherStepProps
}) => {

    // simulate receive available options from backend API
    const momentOptions = [
        "Breakfast (6 a.m. to noon)",
        "Lunch (noon to 6 p.m.)",
        "Dinner (6 p.m. to midnight)",
        "Bar (4 p.m. to midnight)"
    ]

    return (
        <Formik
            validateOnMount={true}
            initialValues={{
                ...formikInitialValues,
                ...JSON.parse(sessionStorage.getItem(`tableReservationStep${stepDetails.stepNum}`)),
            }}
            validationSchema={Yup.object({
                numOfGuests: Yup.string()
                    .matches(/^\d*$/, "Please enter integers only")
                    .required("Required")
                    .test(
                        'is-valid-value',
                        (value, context) => {
                            const intValue = parseInt(value)
                            if (intValue < 1 || intValue > 16) {
                                return context.createError({
                                    name: "numOfGuests",
                                    message: intValue < 1
                                        ? "Don't forget to count yourself"
                                        : "Max number of 16 guests allowed"
                                })
                            }
                            return true;
                        }
                    ),
                reservationDay: Yup.date()
                    .required("Required")
                    .min(dayjs(otherStepProps.todayDate).toDate(), "Pick an available date within 4 weeks from today")
                    .max(dayjs(otherStepProps.todayDate).add(4, "week").toDate(), "Reservations are available within 4 weeks from today."),
                reservationMoment: Yup.string()
                    .required("Required")
                    .oneOf(momentOptions, "Pick a valid option"),
                reservationTime: Yup.string()
                    .required("Required")
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
                    {/* num of guests */}
                    <FormElementRegular
                        id="numOfGuests"
                        name="numOfGuests"
                        label="How many in your party?"
                        isRequired
                        inputComponent={inputProps => <NumberInput {...inputProps} />}
                    />

                    {/* day of reservation */}
                    <FormElementRegular
                        id="reservationDay"
                        name="reservationDay"
                        label="When would you like to dine?"
                        isRequired
                        type="date"
                        inputComponent={inputProps => <SelectInput
                            {...inputProps}
                            renderAsDatePicker={true}
                        />}
                    />

                    {/* moment of reservation */}
                    <FormElementRegular
                        id="reservationMoment"
                        name="reservationMoment"
                        label="Choose your moment"
                        isRequired
                        type="select"
                        inputComponent={inputProps => <SelectInput
                            {...inputProps}
                            options={momentOptions}
                            placeHolder="Moment"
                        />}
                    />

                    {/* show available time */}
                    <AvailableTimesFetcher
                        renderComponent={(options) => <FormElementRegular
                            name="reservationTime"
                            type="radio"
                            id="reservationTime"
                            label="Select an available time"
                            isRequired
                            inputComponent={inputProps => <TimeSelectRadioInputGroup
                                {...inputProps}
                                options={options}
                            />}
                        />}
                    />
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

export default FormStep1;