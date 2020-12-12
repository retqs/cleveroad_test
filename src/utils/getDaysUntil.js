const currentDay = new Date();

export const getDaysUntil = (saleEndDate) => {
    const date = new Date(saleEndDate);

    const diffInTime = date.getTime() - currentDay.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    return Math.floor(diffInDays) + 1;
} 