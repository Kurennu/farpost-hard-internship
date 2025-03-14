import { TRANSACTION_TYPE_LABELS } from '../../../entities/transaction';

/**
 * Логика для диаграммы расходов. 
 * Группирует расходы по типам, фильтрует только транзакции с отрицательной суммой
 * и вычисляет процентное соотношение
*/


export const calculateExpensesByType = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return { items: [], total: 0, formattedTotal: '0' };
    }

    const expenses = transactions.filter(transaction => 
        transaction?.sum < 0 && transaction?.transactionType
    );
    
    if (expenses.length === 0) {
        return { items: [], total: 0, formattedTotal: '0' };
    }
    
    const expensesByType = {};
    let total = 0;
    
    for (const transaction of expenses) {
        const type = transaction.transactionType;
        const amount = Math.abs(transaction.sum);
        
        expensesByType[type] = (expensesByType[type] ?? 0) + amount;
        total += amount;
    }

    const items = Object.entries(expensesByType)
        .map(([type, sum]) => ({
            type,
            label: TRANSACTION_TYPE_LABELS[type] || type,
            sum,
            percentage: ((sum / total) * 100).toFixed(2),
            formattedSum: sum.toLocaleString('ru-RU')
        }))
        .sort((a, b) => b.sum - a.sum);

    return {
        items,
        total,
        formattedTotal: total.toLocaleString('ru-RU')
    };
}; 