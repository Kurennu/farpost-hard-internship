export const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString('ru-RU');
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});
};

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatSum = (sum) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(sum);
}; 