import React, { useState, useEffect } from 'react';

import { TransactionsTable } from '../widgets/transactions-table';
import { Filters, filterTransactions } from '../features/transaction-filters';
import { fetchTransactions, getTransactionTypes } from '../entities/transaction';
import { 
  Pagination, 
  calculateTotalPages, 
  getItemsForPage, 
  DEFAULT_PAGE_SIZE 
} from '../features/pagination';

const AccountDetailsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await fetchTransactions();
            setTransactions(data);
            setFilteredTransactions(data);
            setTransactionTypes(getTransactionTypes(data));
        };

        loadTransactions();
    }, []);


    const handleFilterChange = (filters) => {
        const filtered = filterTransactions(transactions, filters);
        setFilteredTransactions(filtered);
        setCurrentPage(1); 
    };


    const paginatedTransactions = getItemsForPage(
        filteredTransactions, 
        currentPage, 
        DEFAULT_PAGE_SIZE
    );

    const totalPages = calculateTotalPages(
        filteredTransactions.length, 
        DEFAULT_PAGE_SIZE
    );

    return (
        <main>
            <Filters 
                onFilterChange={handleFilterChange}
                transactionTypes={transactionTypes}
            />
            <TransactionsTable transactions={paginatedTransactions} />
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );
};

export default AccountDetailsPage;