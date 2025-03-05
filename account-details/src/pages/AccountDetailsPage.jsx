import React, { useState, useEffect } from 'react';
import { TransactionsTable } from '../widgets/transactions-table';
import { Filters, filterTransactions } from '../features/transaction-filters';
import { fetchTransactions } from '../features/transaction-filters/api/transactions';

const AccountDetailsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await fetchTransactions();
            setTransactions(data);
            setFilteredTransactions(data);
            const types = [...new Set(data.map(t => t.transactionType))];
            setTransactionTypes(types);
        };

        loadTransactions();
    }, []);

    const handleFilterChange = (filters) => {
        const filtered = filterTransactions(transactions, filters);
        setFilteredTransactions(filtered);
    };

    return (
        <div className="account-details">
            <h1>Детализация счета</h1>
            <Filters 
                onFilterChange={handleFilterChange}
                transactionTypes={transactionTypes}
            />
            <TransactionsTable transactions={filteredTransactions} />
        </div>
    );
};

export default AccountDetailsPage; 