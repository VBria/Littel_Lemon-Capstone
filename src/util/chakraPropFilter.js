import { shouldForwardProp } from "@chakra-ui/react"

const chakraPropFilter = (props) => {
    const chakraProps = {}
    const nonChakraProps = {}
    for (let prop in props) {
        switch (shouldForwardProp(prop)) {
            case true:
                nonChakraProps[prop] = props[prop]
                break;
            default:
                chakraProps[prop] = props[prop]
        }
    }
    return { chakraProps, nonChakraProps }
}

export default chakraPropFilter;