const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

const formatShortDate = (date: string) => {
    const [_, month, day] = date.split("-");
    return `${day}/${month}`;
}

const months = 
[
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]

export { formatDate, formatShortDate, months };