import { useFormikContext } from "formik";
import { useEffect } from "react";


const FormCTAButtonWithFormik = ({ formStatus, setFormStatus, stepNum, formikInitialValues, render, ...props }) => {

    const { isValid, setValues } = useFormikContext();

    const handleFormReset = () => {
        sessionStorage.removeItem(`tableReservationStep${stepNum}`);
        setValues(formikInitialValues);
    }

    useEffect(() => {
        if (formStatus && setFormStatus) {
            switch (isValid) {
                case true:
                    setFormStatus(prev => {
                        formStatus.stepsInvalid.delete(stepNum);
                        return {
                            ...prev,
                            stepsInvalid: formStatus.stepsInvalid
                        }
                    });
                    break;
                default:
                    setFormStatus(prev => {
                        const tempArr = [...formStatus.stepsInvalid.add(stepNum)];
                        tempArr.sort();
                        return {
                            ...prev,
                            stepsInvalid: new Set(tempArr)
                        }
                    });
            }
        }
        //eslint-disable-next-line
    }, [isValid])

    const withProps = {
        ...props,
        // to avoid formik bug formik i.e isValid doesn't change on resetForm
        isDisabled: props.type === "submit" ? !isValid : false,
        type: props.type === "submit" ? "submit" : "button",
        onClick: props.type === "reset" ? handleFormReset : props.onClick
    }

    return render(withProps);
}

export default FormCTAButtonWithFormik;