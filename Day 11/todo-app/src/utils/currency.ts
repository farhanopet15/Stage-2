export const formatCurrency = (amount: number) => {
    return `IDR${amount.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })},00`;
};