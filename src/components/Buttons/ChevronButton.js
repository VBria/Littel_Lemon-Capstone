import { Box, Center, useMergeRefs } from "@chakra-ui/react";
import { ReactComponent as ChevronSvg } from "../../assets/icons/chevron.svg"
import { forwardRef, useEffect, useRef } from "react";

const ChevronButton = forwardRef(({
    hexColorCode,
    filter = "drop-shadow(0px 2px 2px #33333380)",
    ...props
}, ref) => {

    const scope = useRef(null);

    useEffect(() => {
        scope.current.querySelector("path").style.fill = hexColorCode;
    })

    const refs = useMergeRefs(scope, ref);

    return (
        <Center
            w={6}
            h={8}
            ref={refs}
            {...props}
        >
            <Box
                as="span"
                pointerEvents="none"
            >
                <ChevronSvg
                    style={{
                        filter: filter,
                    }}
                />
            </Box>
        </Center>
    )
})

export default ChevronButton;