import axios from 'axios';

export const TRANSACTION_TYPE_LABELS = {
    'autoUp': 'Поднятия',
    'viewing': 'Просмотры',
    'stick': 'Прикрепления',
    'replenishing': 'Пополнения',
    'commission': 'Комиссии'
};

export const fetchTransactions = () => 
    axios.get('/transactions.json')
        .then(response => response.data);

export const getTransactionTypes = transactions => 
    [...new Set(transactions.map(({ transactionType }) => transactionType))];