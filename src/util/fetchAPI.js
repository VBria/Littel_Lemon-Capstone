const fetchAPI = (reservationMoment, reservationDay) => {

    //simulate time un-availability by 20% probability
    const probability = Math.floor(Math.random() * 100) + 1;
    let newTimeOptions = null;
    if (probability > 20) {
        const numOfOptions = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
        newTimeOptions = [];
        const mins = ["00", "15", "30", "45"];

        switch (reservationMoment) {
            case "Breakfast":
                while (newTimeOptions.length <= numOfOptions) {
                    let newOption = `${Math.floor(Math.random() * (11 - 6 + 1)) + 6}:${mins[Math.floor(Math.random() * (mins.length - 0))]} am`;
                    if (!newTimeOptions.includes(newOption)) {
                        newTimeOptions.push(newOption);
                    }
                }
                break;
            case "Lunch":
                while (newTimeOptions.length <= numOfOptions) {
                    let newOption = `${Math.floor(Math.random() * (17 - 12 + 1)) + 12}:${mins[Math.floor(Math.random() * (mins.length - 0))]}`;
                    if (!newTimeOptions.includes(newOption)) {
                        newTimeOptions.push(newOption);
                    }
                }
                break;
            case "Dinner":
                while (newTimeOptions.length <= numOfOptions) {
                    let newOption = `${Math.floor(Math.random() * (23 - 18 + 1)) + 18}:${mins[Math.floor(Math.random() * (mins.length - 0))]}`;
                    if (!newTimeOptions.includes(newOption)) {
                        newTimeOptions.push(newOption);
                    }
                }
                break;
            default:
                while (newTimeOptions.length <= numOfOptions) {
                    let newOption = `${Math.floor(Math.random() * (23 - 16 + 1)) + 16}:${mins[Math.floor(Math.random() * (mins.length - 0))]}`;
                    if (!newTimeOptions.includes(newOption)) {
                        newTimeOptions.push(newOption);
                    }
                }
        }
    }

    const dayjs = require("dayjs");
    dayjs.extend(require("dayjs/plugin/customParseFormat"));

    if (sessionStorage.getItem("previousTableReservation") && newTimeOptions) {
        const prevReservation = dayjs(sessionStorage.getItem("previousTableReservation"), "YYYY-MM-DD, h:mm a");
        const prevReservationDay = sessionStorage.getItem("previousTableReservation").split(",")[0];
        const prevReservationTime = sessionStorage.getItem("previousTableReservation").split(",")[1];
        if (prevReservationDay === reservationDay) {
            if (reservationMoment === "Breakfast") {
                newTimeOptions = newTimeOptions.filter(option => option !== prevReservationTime);
            }
            else {
                newTimeOptions = newTimeOptions.filter(option => option !== dayjs(prevReservation).format("H:mm"));
            }
        }
    }

    return new Promise((resolve, reject) => {
        //simulate server time delay
        setTimeout(() => {
            if (newTimeOptions) {
                resolve(newTimeOptions);
            }
            else {
                reject(new Error("No slots are available. Please select another day and moment or try again later."));
            }
        }, 5000)
    });
}

export default fetchAPI;