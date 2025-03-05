import React from 'react';
import { groupTransactionsByDate, formatDateTime, formatSum } from '../../model';

const TransactionsTable = ({ transactions }) => {
    const groupedTransactions = groupTransactionsByDate(transactions);
    return (
        <table>
            <thead>
                <tr>
                    <th>Время</th>
                    <th>Описание</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
                    <React.Fragment key={date}>
                        <tr>
                            <td colSpan="3">
                                <strong>{date}</strong>
                            </td>
                        </tr>
                        {dayTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{formatDateTime(transaction.date)}</td>
                                <td>{transaction.description}</td>
                                <td>{formatSum(transaction.sum)}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable; 