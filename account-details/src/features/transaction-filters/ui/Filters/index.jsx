import React, { useState } from 'react';
import { DEFAULT_FILTERS } from '../../model';

const Filters = ({ onFilterChange, transactionTypes }) => {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        setFilters(DEFAULT_FILTERS);
        onFilterChange(DEFAULT_FILTERS);
    };

    return (
        <div className="filters">
            <div className="filters__group">
                <div className="filters__field">
                    <label>Период с:</label>
                    <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleChange('dateFrom', e.target.value)}
                    />
                </div>
                <div className="filters__field">
                    <label>по:</label>
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleChange('dateTo', e.target.value)}
                    />
                </div>
            </div>

            <div className="filters__group">
                <div className="filters__field">
                    <label>Тип операции:</label>
                    <select
                        value={filters.transactionType}
                        onChange={(e) => handleChange('transactionType', e.target.value)}
                    >
                        <option value="all">Все операции</option>
                        {transactionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="filters__group">
                <div className="filters__field">
                    <label>Сумма от:</label>
                    <input
                        type="number"
                        value={filters.sumFrom}
                        onChange={(e) => handleChange('sumFrom', e.target.value ? Number(e.target.value) : '')}
                    />
                </div>
                <div className="filters__field">
                    <label>до:</label>
                    <input
                        type="number"
                        value={filters.sumTo}
                        onChange={(e) => handleChange('sumTo', e.target.value ? Number(e.target.value) : '')}
                    />
                </div>
            </div>

            <button className="filters__reset" onClick={handleReset}>
                Сбросить фильтры
            </button>
        </div>
    );
};

export default Filters; 