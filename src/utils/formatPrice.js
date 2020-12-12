export const formatPrice = (number) => new Intl.NumberFormat('en-US',{
    currency: 'USD',
    minimumFractionDigits: 2
}).format(number);