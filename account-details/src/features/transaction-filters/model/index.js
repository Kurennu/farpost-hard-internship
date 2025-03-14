import { format, startOfDay, endOfDay, isValid } from 'date-fns';

/**
 * Логика для фильтрации транзакций
 * Реализовала фильтр по дате, типу и сумме
 */

export const DEFAULT_FILTERS = {
    dateFrom: '',
    dateTo: '',
    transactionTypes: [],
    sumFrom: '',
    sumTo: ''
};

export const prepareFiltersForUI = (filters) => {
    if (!filters || typeof filters !== 'object') {
        return DEFAULT_FILTERS;
    }
    
    return {
        ...filters,
        dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : null,
        dateTo: filters.dateTo ? new Date(filters.dateTo) : null
    };
};

export const prepareFiltersForAPI = (filters) => {
    if (!filters || typeof filters !== 'object') {
        return DEFAULT_FILTERS;
    }

    return {
        ...filters,
        dateFrom: filters.dateFrom && isValid(filters.dateFrom)
            ? format(startOfDay(filters.dateFrom), 'yyyy-MM-dd')
            : '',
        dateTo: filters.dateTo && isValid(filters.dateTo)
            ? format(endOfDay(filters.dateTo), 'yyyy-MM-dd')
            : ''
    };
};

export const getResetFiltersForUI = () => ({
    ...DEFAULT_FILTERS,
    dateFrom: null,
    dateTo: null
});

const parseDate = (date) => {
    if (!date) return null;
    const parsed = new Date(date);
    return isValid(parsed) ? parsed : null;
};

export const filterTransactions = (transactions, filters) => {
    if (!Array.isArray(transactions)) return [];
    if (!filters || typeof filters !== 'object') return transactions;
    
    const fromDate = filters.dateFrom ? startOfDay(parseDate(filters.dateFrom)) : null;
    const toDate = filters.dateTo ? endOfDay(parseDate(filters.dateTo)) : null;
    
    const sumFrom = filters.sumFrom !== '' ? Number(filters.sumFrom) : -Infinity;
    const sumTo = filters.sumTo !== '' ? Number(filters.sumTo) : Infinity;
    
    const typeFilter = new Set(filters.transactionTypes || []);
    const hasTypeFilter = typeFilter.size > 0;

    return transactions.filter(transaction => {
        if (fromDate || toDate) {
            const transactionDate = parseDate(transaction.date);
            if (!transactionDate) return false;
            if (fromDate && transactionDate < fromDate) return false;
            if (toDate && transactionDate > toDate) return false;
        }

        if (hasTypeFilter && !typeFilter.has(transaction.transactionType)) {
            return false;
        }

        const transactionSum = Number(transaction.sum);
        return transactionSum >= sumFrom && transactionSum <= sumTo;
    });
}; 