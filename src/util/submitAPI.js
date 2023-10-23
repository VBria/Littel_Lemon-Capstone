const submitAPI = (formData) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (formData) {
                resolve(true);
            }
            else {
                reject(new Error("Submission failed"));
            }
        }, 5000);
    });
};

export default submitAPI;