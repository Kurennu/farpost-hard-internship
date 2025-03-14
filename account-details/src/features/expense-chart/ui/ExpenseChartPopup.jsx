import React, { useEffect, useRef } from 'react';
import ExpenseChart from './ExpenseChart';

/**
 * Модальное окно для отображения диаграммы
*/

const CHART_TITLE_ID = 'expense-chart-title';
const ExpenseChartPopup = ({ transactions, onClose }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';

        popupRef.current?.focus();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="expense-chart-popup" role="dialog" aria-modal="true" aria-labelledby={CHART_TITLE_ID}>
            <div className="expense-chart-popup__overlay"></div>
            <div 
                className="expense-chart-popup__content" 
                ref={popupRef}
                tabIndex="-1"
            >
                <button 
                    className="expense-chart-popup__close" 
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    &times;
                </button>
                <ExpenseChart transactions={transactions} titleId={CHART_TITLE_ID} />
            </div>
        </div>
    );
};

export default ExpenseChartPopup; 