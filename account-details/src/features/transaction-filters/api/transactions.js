import axios from 'axios';

export const fetchTransactions = () => 
    axios.get('/transactions.json')
        .then(response => response.data);

export const getTransactionTypes = transactions => 
    [...new Set(transactions.map(({ transactionType }) => transactionType))];