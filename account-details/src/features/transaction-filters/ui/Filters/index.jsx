import React, { useState } from 'react';
import { DEFAULT_FILTERS } from '../../model';
import { TRANSACTION_TYPE_LABELS } from '../../../../entities/transaction';

const Filters = ({ onFilterChange, transactionTypes }) => {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleTypeToggle = (type) => {
        let newTypes;
        
        if (filters.transactionTypes.includes(type)) {
            newTypes = filters.transactionTypes.filter(t => t !== type);
        } else {
            newTypes = [...filters.transactionTypes, type];
        }
        
        handleChange('transactionTypes', newTypes);
    };

    const handleReset = () => {
        setFilters(DEFAULT_FILTERS);
        onFilterChange(DEFAULT_FILTERS);
    };

    return (
        <div className="filters">   
            <button className="filters__reset base-button" onClick={handleReset}>
                Сброс
            </button>   
            <div className="filters__type">
                {transactionTypes.map(type => (
                    <button
                        key={type}
                        className={`filters__type-button base-button ${filters.transactionTypes.includes(type) ? 'filters__type-button--active' : ''}`}
                        onClick={() => handleTypeToggle(type)}
                        type="button"
                    >
                        {TRANSACTION_TYPE_LABELS[type] || type}
                    </button>
                ))}
            </div>
            <div className="filters__group">
                <div className="filters__elem">
                    <label className="filters__elem-label" id="sum-label" htmlFor="sumFrom" >Сумма транзакции</label>
                    <div className="filters__elem-fields">
                        <div className="filters__elem-field">
                            <input
                            id="sumFrom"
                            type="number"
                            value={filters.sumFrom}
                            onChange={(e) => handleChange('sumFrom', e.target.value ? Number(e.target.value) : '')}
                            placeholder="От"
                        />
                        </div>
                        <div className="filters__elem-field">
                            <input
                                type="number"
                                value={filters.sumTo}
                                onChange={(e) => handleChange('sumTo', e.target.value ? Number(e.target.value) : '')}
                                placeholder="До"
                            />
                        </div>
                    </div>
                </div>

                <div className="filters__elem">
                    <label className="filters__elem-label" id="date-label" htmlFor="dateFrom" >Период</label>
                    <div className="filters__elem-fields">
                        <div className="filters__elem-field">
                            <input
                                id="dateFrom"
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => handleChange('dateFrom', e.target.value)}
                            />
                        </div>
                        <div className="filters__elem-field">
                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => handleChange('dateTo', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters; 