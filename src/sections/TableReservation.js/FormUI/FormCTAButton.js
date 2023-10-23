import ButtonRegular from "../../../components/Buttons/ButtonRegular";


const FormCTAButton = ({ primary = false, children, ...props }) => {

    return (
        <ButtonRegular
            // isDisabled={props.type === "submit" ? !isValid : false}
            w="full"
            bg={primary ? "brand.primary.green" : "brand.secondary.brightGray"}
            color={primary ? "brand.primary.yellow" : "brand.primary.green"}
            borderRadius="8px"
            _active={{
                color: primary ? "brand.secondary.brightGray" : "brand.primary.green",
                boxShadow: "0px 0px 0px 0px #33333380",
                transform: "translateY(1px)",
                border: primary ? null : "1px"
            }}
            {...props}
        // to avoid formik bug formik i.e isValid doesn't change on resetForm
        // type={props.type === "submit" ? "submit" : "button"}
        // onClick={props.type === "reset" ? handleFormReset : props.onClick}
        >
            {children}
        </ButtonRegular>
    )
}

export default FormCTAButton;