export const addZeroBeforeNumber = (n: number) => {
    if (n / 10 < 1) return '0' + n
    return n.toString()
}

export const getTextFromDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return addZeroBeforeNumber(day) + '.' + addZeroBeforeNumber(month) + '.' + year
}