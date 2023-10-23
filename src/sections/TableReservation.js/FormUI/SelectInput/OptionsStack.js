import { VStack } from "@chakra-ui/react";
import SelectOption from "./SelectOption";
import { motion } from "framer-motion";


const OptionsStack = ({ options, handleOptionSelection, selectedOption, ...props }) => {

    const optionStack = {
        visible: {
            opacity: 1,
            transition: {
                // when: "beforeChildren",
                staggerChildren: 1.74 / 8
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 1.74 / 16,
                staggerDirection: -1,
                // delayChildren: 1.74 / 4
            }
        }
    }

    const optionItem = {
        visible: {
            opacity: 1,
            scaleX: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        hidden: {
            opacity: 0,
            scaleX: 0,
            transition: {
                ease: "easeInOut",
                duration: 1.74 / 16
            }
        }
    }

    return (
        <VStack
            as={motion.div}
            className="options-stack"
            w="full"
            spacing={0}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={optionStack}
            {...props}
        >
            {options.map(option => <SelectOption
                key={option}
                handleOptionSelection={handleOptionSelection}
                isSelected={selectedOption === option}
                variants={optionItem}
                transformOrigin="left center"
            >
                {option}
            </SelectOption>
            )}
        </VStack>
    )
}

export default OptionsStack;