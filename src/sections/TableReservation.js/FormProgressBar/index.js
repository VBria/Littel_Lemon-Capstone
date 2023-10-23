import { HStack, Box } from "@chakra-ui/react";
import StepIndicator from "./StepIndicator";


const FormProgressBar = ({ formStatus, goToPreviousFormStep, stepBtnRefs }) => {

    const numOfSteps = () => {
        let i = 1;
        let num = []
        while (i <= formStatus.totalNumOfSubForms) {
            num.push(i);
            i++;
        }
        return num;
    }

    return (
        <HStack
            w="full"
            justify="space-between"
            divider={<Box
                bg="brand.primary.yellow"
                h="2px"
                flexGrow={1}
            />}
            spacing={0}
            px={0.5}
            py={2}
        >
            {numOfSteps().map(step => <StepIndicator
                key={`stepNo-${step}`}
                isStepInProgress={step === formStatus.stepInProgress}
                isStepPrev={step === formStatus.previousStep}
                isStepComplete={formStatus.stepsCompleted.has(step) && !formStatus.stepsInvalid.has(step)}
                goToPreviousFormStep={goToPreviousFormStep}
                ref={stepBtnRefs[step - 1]}
                disabled={formStatus.isSubmitting}
            >
                {step}
            </StepIndicator>)}
        </HStack>
    )
}

export default FormProgressBar;