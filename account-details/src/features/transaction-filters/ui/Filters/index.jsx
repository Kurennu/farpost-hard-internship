import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { subMonths } from 'date-fns';
import MaskedTextInput from 'react-text-mask';
import "react-datepicker/dist/react-datepicker.css";
import { 
    DEFAULT_FILTERS, 
    prepareFiltersForUI, 
    prepareFiltersForAPI, 
    getResetFiltersForUI 
} from '../../model';
import { TRANSACTION_TYPE_LABELS } from '../../../../entities/transaction';

/**
 * Компонент фильтров
 */

const datePickerProps = {
    dateFormat: "dd.MM.yyyy",
    locale: ru,
    isClearable: true,
    showMonthDropdown: true,
    showYearDropdown: true,
    dropdownMode: "select",
    className: "datepicker-input",
    maxDate: new Date(),
    minDate: subMonths(new Date(), 36),
};

const DatePickerCustomInput = React.forwardRef((props, ref) => (
    <MaskedTextInput
        {...props}
        ref={ref}
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        placeholder="дд.мм.гггг"
        type="text"
    />
));

const Filters = ({ onFilterChange, transactionTypes }) => {
    const [filters, setFilters] = useState(prepareFiltersForUI(DEFAULT_FILTERS));

    const handleChange = useCallback((field, value) => {
        if ((field === 'sumFrom' || field === 'sumTo') && 
            value !== '' && (isNaN(value) || Number(value) < 0)) {
            return;
        }
        
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [field]: value };
            onFilterChange(prepareFiltersForAPI(newFilters));
            return newFilters;
        });
    }, [onFilterChange]);

    const handleTypeToggle = useCallback((type) => {
        setFilters(prevFilters => {
            const newTypes = prevFilters.transactionTypes.includes(type)
                ? prevFilters.transactionTypes.filter(t => t !== type)
                : [...prevFilters.transactionTypes, type];
            
            const newFilters = { ...prevFilters, transactionTypes: newTypes };
            onFilterChange(prepareFiltersForAPI(newFilters));
            return newFilters;
        });
    }, [onFilterChange]);

    const handleReset = useCallback(() => {
        const resetFilters = getResetFiltersForUI();
        setFilters(resetFilters);
        onFilterChange(DEFAULT_FILTERS);
    }, [onFilterChange]);

    return (
        <div className="filters">   
            <button className="filters__reset base-button" onClick={handleReset}>
                Сброс
            </button>   
            <div className="filters__type">
                {transactionTypes.map(type => (
                    <button
                        key={type}
                        className={`filters__type-button base-button ${
                            filters.transactionTypes.includes(type) ? 'filters__type-button--active' : ''
                        }`}
                        onClick={() => handleTypeToggle(type)}
                        type="button"
                    >
                        {TRANSACTION_TYPE_LABELS[type] || type}
                    </button>
                ))}
            </div>
            <div className="filters__group">
                <div className="filters__elem">
                    <label className="filters__elem-label" id="sum-label" htmlFor="sumFrom">
                        Сумма транзакции
                    </label>
                    <div className="filters__elem-fields">
                        <div className="filters__elem-field">
                            <input
                                id="sumFrom"
                                type="number"
                                value={filters.sumFrom}
                                onChange={(e) => handleChange('sumFrom', e.target.value ? Number(e.target.value) : '')}
                                placeholder="От"
                                aria-labelledby="sum-label"
                            />
                        </div>
                        <div className="filters__elem-field">
                            <input
                                type="number"
                                value={filters.sumTo}
                                onChange={(e) => handleChange('sumTo', e.target.value ? Number(e.target.value) : '')}
                                placeholder="До"
                                aria-labelledby="sum-label"
                            />
                        </div>
                    </div>
                </div>

                <div className="filters__elem">
                    <label className="filters__elem-label">Период</label>
                    <div className="filters__elem-fields">
                        <div className="filters__elem-field filters__elem-field--date">
                            <DatePicker
                                {...datePickerProps}
                                selected={filters.dateFrom}
                                onChange={(date) => handleChange('dateFrom', date)}
                                selectsStart
                                startDate={filters.dateFrom}
                                endDate={filters.dateTo}
                                aria-labelledby="date-label"
                                customInput={<DatePickerCustomInput />}
                            />
                        </div>
                        <div className="filters__elem-field filters__elem-field--date">
                            <DatePicker
                                {...datePickerProps}
                                selected={filters.dateTo}
                                onChange={(date) => handleChange('dateTo', date)}
                                selectsEnd
                                startDate={filters.dateFrom}
                                endDate={filters.dateTo}
                                minDate={filters.dateFrom}
                                aria-labelledby="date-label"
                                customInput={<DatePickerCustomInput />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters; 