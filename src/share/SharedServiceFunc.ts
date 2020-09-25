
export const toBeautifulString = (date: Date): string => {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDay() - birthDate.getDay();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return [age.toString(), 'Year', Math.abs(months).toString(), 'Months', Math.abs(days).toString(), 'Days'].join(' ');
};
