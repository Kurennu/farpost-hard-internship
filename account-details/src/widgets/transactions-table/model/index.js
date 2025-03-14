
/**
 * Логика для группировки транзакций по дате + сортировка транзакций 
 * по времени и сумме
 */

export const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});
};

export const sortTransactionsByTime = (groupedTransactions, direction = 'asc') => {
    const result = { ...groupedTransactions };
    
    Object.keys(result).forEach(date => {
        result[date] = [...result[date]].sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();
            return direction === 'asc' 
                ? timeA - timeB 
                : timeB - timeA;
        });
    });
    
    return result;
};


export const sortTransactionsBySum = (groupedTransactions, direction = 'asc') => {
    const result = { ...groupedTransactions };
    
    Object.keys(result).forEach(date => {
        result[date] = [...result[date]].sort((a, b) => {
            return direction === 'asc' 
                ? a.sum - b.sum 
                : b.sum - a.sum;
        });
    });
    
    return result;
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

export const createSortManager = (initialKey = null, initialDirection = 'asc') => {
    const initialConfig = {
        key: initialKey,
        direction: initialDirection
    };
    
    const updateSortConfig = (currentConfig, key) => {
        let direction = 'asc';
        if (currentConfig.key === key && currentConfig.direction === 'asc') {
            direction = 'desc';
        }
        return { key, direction };
    };
    
    const applySorting = (groupedTransactions, sortConfig) => {
        if (!sortConfig.key) return groupedTransactions;
        
        if (sortConfig.key === 'time') {
            return sortTransactionsByTime(groupedTransactions, sortConfig.direction);
        } else if (sortConfig.key === 'sum') {
            return sortTransactionsBySum(groupedTransactions, sortConfig.direction);
        }
        
        return groupedTransactions;
    };
    
    return {
        initialConfig,
        updateSortConfig,
        applySorting
    };
}; 