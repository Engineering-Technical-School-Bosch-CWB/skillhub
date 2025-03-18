const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

const formatShortDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}`;
}

export { formatDate, formatShortDate };