export const DEFAULT_FILTERS = {
    dateFrom: '',
    dateTo: '',
    transactionTypes: [],
    sumFrom: '',
    sumTo: ''
};

export const filterTransactions = (transactions, filters) => {
    return transactions.filter(transaction => {
        let matches = true;
        

        if (filters.dateFrom && filters.dateTo) {
            const transactionDate = new Date(transaction.date);
            const fromDate = new Date(filters.dateFrom);
            const toDate = new Date(filters.dateTo);
            matches = matches && (transactionDate >= fromDate && transactionDate <= toDate);
        }

        if (filters.transactionTypes && filters.transactionTypes.length > 0) {
            matches = matches && filters.transactionTypes.includes(transaction.transactionType);
        }
        

        if (filters.sumFrom !== '') {
            matches = matches && transaction.sum >= Number(filters.sumFrom);
        }
        if (filters.sumTo !== '') {
            matches = matches && transaction.sum <= Number(filters.sumTo);
        }
        
        return matches;
    });
}; 