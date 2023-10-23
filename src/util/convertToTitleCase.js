const convertToTitleCase = value => {
    const words = value.split(" ");
    const valueTitle = words.map(word => word[0].toUpperCase() + word.slice(1));
    return valueTitle.join(" ");
}

export default convertToTitleCase;