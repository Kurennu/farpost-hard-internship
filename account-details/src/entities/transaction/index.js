import axios from 'axios';


export const TRANSACTION_TYPE_LABELS = {
    'autoUp': 'Поднятия',
    'viewing': 'Просмотры',
    'stick': 'Прикрепления',
    'replenishing': 'Пополнения',
    'commission': 'Комиссии'
};

const fetchTransactions = () => 
    axios.get('/transactions.json')
        .then(response => response.data);

const getTransactionTypes = transactions => 
    [...new Set(transactions.map(({ transactionType }) => transactionType))]; 

export {
    fetchTransactions,
    getTransactionTypes
};