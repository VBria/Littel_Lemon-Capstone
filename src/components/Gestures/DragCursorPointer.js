import { Box } from "@chakra-ui/react";
import { ReactComponent as DragCursor } from "../../assets/custom-cursors/drag-cursor.svg"
import { motion } from "framer-motion";

const DragCursorPointer = ({ ...props }) => {
    return (
        <>
            <Box
                as={motion.div}
                cursor="none"
                {...props}
            >
                <DragCursor />
            </Box >
        </>
    )
}

export default DragCursorPointer;