import allMonths from "config/allMonths";

const formatDate = (timeStamp: number) => {
    const theDate = new Date(timeStamp);

    const getDate = theDate.getDate();
    const getMonth = theDate.getMonth();
    const getYear = theDate.getFullYear();

    return `${getDate} ${allMonths[getMonth]} ${getYear}`;
};

export default formatDate;
