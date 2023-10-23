import { VStack, Circle } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useEffect } from 'react';


const DateSelector = ({ selectedDate, handleDateSelection, nextAvailableDate, ...props }) => {

    const dayjs = require("dayjs");
    const minDate = nextAvailableDate ? dayjs(nextAvailableDate).toDate() : dayjs().toDate();
    const maxDate = dayjs().add(4, "week").toDate()

    const calenderStack = {
        hidden: {
            opacity: 0,
            scaleY: 0,
            transition: {
                ease: "easeIn",
                duration: 1.74 / 4
            }
        },
        visible: {
            opacity: 1,
            scaleY: 1,
            transition: {
                ease: "easeOut",
                duration: 1.74 / 4
            }
        }
    }

    useEffect(() => {
        // console.log(dayjs(new Date).day());
    })

    return (
        <VStack
            as={motion.div}
            bg="brand.secondary.brightGray"
            w="full"
            borderRadius="16px"
            borderColor="brand.primary.green"
            border="1px"
            px={2}
            py={4}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={calenderStack}
            transformOrigin="center top"
            {...props}
        >
            <Calendar
                defaultValue={dayjs(selectedDate).toDate()}
                minDate={minDate}
                maxDate={maxDate}
                minDetail='month'
                onChange={handleDateSelection}
                tileContent={({ activeStartDate, date, view }) => dayjs(date).isSame(dayjs().format("YYYY-MM-DD"))
                    ? <Circle
                        w={1.5}
                        h={1.5}
                        mx="auto"
                        mt={1}
                        bg={dayjs(selectedDate).isSame(dayjs().format("YYYY-MM-DD")) ? "brand.secondary.brightGray" : "brand.primary.green"}
                    />
                    : null}
            />
        </VStack>
    )
}

export default DateSelector;