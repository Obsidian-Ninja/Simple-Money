
export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    // convert number to string to handle decimal
    const numStr = num.toString();
    // split into integer and fractional parts
    const parts = numStr.split('.');

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // regex for indian numbering system
    // it handles the first three digits, then every two digits
    const lastThree = integerPart.subString(integerPart.length - 3);
    const otherNumbers = integerPart.subString(0, integerPart.length - 3);

    if (otherNumbers !== '') {
        // Apply comma after every two digits for the 'otherNumbers' part
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        integerPart = formattedOtherNumbers + ',' + lastThree;
    } else {
         // No change if less than 4 digits
        integerPart = lastThree;
    }

    // combine integer and fraction parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;

};

export const prepareIncomeLineChartData = (data = []) => {
    // Group data by date
    const groupedByDate = data.reduce((acc, item) => {
        const dateKey = item.date; // Assuming 'date' is in 'YYYY-MM-DD' format

        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey, // Keep the raw date for sorting if needed
                totalAmount: 0,
                items: [], // Array to store original items for this date
            };
        }

        acc[dateKey].totalAmount += item.amount;
        acc[dateKey].items.push(item); // Add the original item to the array
        return acc;
    }, {});

    // Convert the grouped object back to an array
    let chartData = Object.values(groupedByDate);

    // Sort the data by date in ascending order for the line chart
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Format the date for the X-axis label
    chartData = chartData.map((dataPoint) => ({
        ...dataPoint,
        month: moment(dataPoint.date).format('Do MMM'), // Formatted date for XAxis
    }));

    return chartData;
};