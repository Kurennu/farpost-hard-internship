import React, { useMemo, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { calculateExpensesByType } from '../model';

/**
 * Компонент круговой диаграммы
*/

ChartJS.register(ArcElement, Tooltip, Legend);

const getChartColors = () => {
    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return [
        getCssVar('--color-chart-red'),
        getCssVar('--color-chart-green'),
        getCssVar('--color-chart-blue'),
        getCssVar('--color-chart-orange'),
    ];
};


const MOBILE_BREAKPOINT = 768;
const ExpenseChart = ({ transactions, titleId }) => {
    const [legendPosition, setLegendPosition] = useState('right');
    
    useEffect(() => {
        const handleResize = () => {
            setLegendPosition(window.innerWidth < MOBILE_BREAKPOINT ? 'bottom' : 'right');
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { items, formattedTotal } = useMemo(() => 
        calculateExpensesByType(transactions), 
        [transactions]
    );

    const { chartData, options } = useMemo(() => {
        const chartColors = getChartColors();
        const labels = items.map(item => item.label);
        const data = items.map(item => item.sum);
        const colors = items.map((_, index) => 
            chartColors[index % chartColors.length]
        );
        
        return {
            chartData: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: legendPosition,
                        labels: {
                            font: {
                                size: 12
                            },
                            generateLabels: (chart) => {
                                return chart.data.labels.map((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    
                                    return {
                                        text: `${label} (${items[i].percentage}%)`,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        lineWidth: style.borderWidth,
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const item = items[context.dataIndex];
                                return `${label}: ${item.formattedSum} ₽ (${item.percentage}%)`;
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };
    }, [items, legendPosition]);
    
    return (
        <div className="expense-chart">
            <h3 className="expense-chart__title" id={titleId}>Распределение расходов</h3>
            <div className="expense-chart__total">
                Общая сумма расходов: <strong>{formattedTotal} ₽</strong>
            </div>
            <div className="expense-chart__container">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ExpenseChart; 