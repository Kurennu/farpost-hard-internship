import React, { useState, useMemo } from 'react';
import { 
    groupTransactionsByDate, 
    formatDateTime, 
    formatSum,
    createSortManager
} from '../../model';

const TransactionsTable = ({ transactions }) => {
    const sortManager = useMemo(() => createSortManager(), []);
    const [sortConfig, setSortConfig] = useState(sortManager.initialConfig);

    const handleSort = (key) => {
        const newConfig = sortManager.updateSortConfig(sortConfig, key);
        setSortConfig(newConfig);
    };

    const groupedTransactions = useMemo(() => {
        const grouped = groupTransactionsByDate(transactions);
        return sortManager.applySorting(grouped, sortConfig);
    }, [transactions, sortConfig, sortManager]);

    const dates = Object.keys(groupedTransactions);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <table className='transactions-table'>
            <thead className='transactions-table__thead'>
                <tr>
                    <th className='transactions-table__th'>
                        <button 
                            className='transactions-table__sort-button' 
                            onClick={() => handleSort('time')}
                        >
                            Время {getSortIcon('time')}
                        </button>
                    </th>
                    <th className='transactions-table__th'>Описание</th>
                    <th className='transactions-table__th'>
                        <button 
                            className='transactions-table__sort-button' 
                            onClick={() => handleSort('sum')}
                        >
                            Сумма {getSortIcon('sum')}
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody className='transactions-table__tbody'>
                {dates.map(date => (
                    <React.Fragment key={date}>
                        <tr>
                            <td className='transactions-table__date' colSpan="3">
                                {date}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="transactions-table__wrapper">
                                <table>
                                    <tbody>
                                        {groupedTransactions[date].map(transaction => (
                                            <tr key={transaction.id} className='transactions-table__tr'>
                                                <td className='transactions-table__td'>{formatDateTime(transaction.date)}</td>
                                                <td className='transactions-table__td'>{transaction.description}</td>
                                                <td className={`transactions-table__td ${transaction.sum < 0 ? 'transactions-table__td--negative' : 'transactions-table__td--positive'}`}>
                                                    {formatSum(transaction.sum)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable; 