import React, { useState, useEffect, useMemo } from 'react';
import { TransactionsTable } from '../widgets/transactions-table';
import { Filters, filterTransactions, DEFAULT_FILTERS } from '../features/transaction-filters';
import { fetchTransactions, getTransactionTypes } from '../entities/transaction';
import { ExpenseChartPopup } from '../features/expense-chart';
import { 
    Pagination, 
    calculateTotalPages, 
    getItemsForPage, 
    DEFAULT_PAGE_SIZE 
} from '../features/pagination';


const AccountDetailsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isChartOpen, setIsChartOpen] = useState(false);

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await fetchTransactions();
            setTransactions(data);
            setTransactionTypes(getTransactionTypes(data));
        };

        loadTransactions();
    }, []);

    const filteredTransactions = useMemo(() => {
        return filterTransactions(transactions, filters);
    }, [transactions, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); 
    };

    const paginatedTransactions = useMemo(() => {
        return getItemsForPage(
            filteredTransactions, 
            currentPage, 
            DEFAULT_PAGE_SIZE
        );
    }, [filteredTransactions, currentPage]);

    const totalPages = useMemo(() => {
        return calculateTotalPages(
            filteredTransactions.length, 
            DEFAULT_PAGE_SIZE
        );
    }, [filteredTransactions.length]);

    return (
        <main className="account-details">
            <Filters 
                onFilterChange={handleFilterChange}
                transactionTypes={transactionTypes}
            />
            <button 
                    className="expense-chart__button base-button"
                    onClick={() => setIsChartOpen(true)}
                >
                    Показать график расходов
            </button>
            <TransactionsTable transactions={paginatedTransactions} />
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            {isChartOpen && (
                <ExpenseChartPopup 
                    transactions={filteredTransactions}
                    onClose={() => setIsChartOpen(false)}
                />
            )}
        </main>
    );
};

export default AccountDetailsPage;