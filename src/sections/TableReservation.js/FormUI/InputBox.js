import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

const InputBox = forwardRef(({ formikHelpers, formikMeta, ...props }, ref) => {

    return (
        <Input
            color="brand.primary.green"
            size="lg"
            borderRadius="16px"
            focusBorderColor="brand.primary.green"
            variant="outline"
            border="1px"
            ref={ref}
            type="text"
            {...props}
        />
    );
})

export default InputBox;