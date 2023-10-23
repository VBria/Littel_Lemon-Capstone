const timeSortingFunction = timeList => {
    const dayjs = require("dayjs");

    dayjs.extend(require("dayjs/plugin/customParseFormat"));

    const timeOptions = timeList.map(time => dayjs(time, "H:mm"));

    const sortingFunction = (a, b) => {
        if (a.isBefore(b)) {
            return -1
        }
        else if (a.isAfter(b)) {
            return +1
        }
        else {
            return 0
        }
    }

    return timeOptions.sort(sortingFunction).map(time => time.format("h:mm a"));
}

export default timeSortingFunction;