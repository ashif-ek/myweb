document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initRadarChart();
    initSkillBarAnimations();
    
    // Add resize event listener to maintain chart responsiveness
    window.addEventListener('resize', function() {
        if (window.radarChart) {
            window.radarChart.resize();
        }
    });
});

// Enhanced Radar Chart with Animation and Theme Support
function initRadarChart() {
    const radarCtx = document.getElementById('radarChart');
    if (!radarCtx) return;

    // Get computed styles for theme colors
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--primary-color').trim() || '#4361ee';
    const textColor = styles.getPropertyValue('--text-color').trim() || '#495057';
    const bgColor = styles.getPropertyValue('--white').trim() || '#ffffff';
    
    // Chart data with multiple datasets for comparison
    const chartData = {
        labels: [
            'Problem Solving', 
            'Communication', 
            'Teamwork', 
            'Creativity', 
            'Leadership', 
            'Time Mgmt',
            'Adaptability',
            'Strategic Thinking'
        ],
        datasets: [
            {
                label: 'My Skills',
                data: [92, 88, 90, 95, 87, 93, 89, 91],
                backgroundColor: hexToRgba(primaryColor, 0.2),
                borderColor: primaryColor,
                borderWidth: 2,
                pointBackgroundColor: primaryColor,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBorderColor: bgColor,
                pointBorderWidth: 2
            },
            {
                label: 'Industry Average',
                data: [75, 78, 72, 80, 65, 70, 68, 73],
                backgroundColor: 'rgba(169, 169, 169, 0.1)',
                borderColor: 'rgba(169, 169, 169, 0.8)',
                borderWidth: 1,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgba(169, 169, 169, 1)',
                pointRadius: 3,
                pointHoverRadius: 5
            }
        ]
    };

    // Chart configuration with enhanced options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: hexToRgba(textColor, 0.1),
                    lineWidth: 1
                },
                grid: {
                    color: hexToRgba(textColor, 0.1),
                    circular: true
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    display: true,
                    stepSize: 20,
                    backdropColor: 'transparent',
                    color: textColor,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10,
                        weight: '500'
                    },
                    z: 1
                },
                pointLabels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                        weight: '600'
                    },
                    color: textColor,
                    padding: 15
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                        weight: '600'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    color: textColor
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: hexToRgba(textColor, 0.9),
                titleColor: bgColor,
                bodyColor: bgColor,
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 12
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.r}%`;
                    },
                    labelColor: function(context) {
                        return {
                            borderColor: context.dataset.borderColor,
                            backgroundColor: context.dataset.backgroundColor,
                            borderWidth: 2,
                            borderRadius: 2
                        };
                    }
                }
            }
        },
        elements: {
            line: {
                tension: 0.1,
                borderCapStyle: 'round'
            }
        }
    };

    // Create the chart
    window.radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: chartData,
        options: chartOptions
    });

    // Add theme change listener
    document.addEventListener('themeChanged', updateChartTheme);
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Update chart colors when theme changes
function updateChartTheme() {
    if (!window.radarChart) return;
    
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--primary-color').trim() || '#4361ee';
    const textColor = styles.getPropertyValue('--text-color').trim() || '#495057';
    const bgColor = styles.getPropertyValue('--white').trim() || '#ffffff';

    // Update dataset colors
    window.radarChart.data.datasets[0].backgroundColor = hexToRgba(primaryColor, 0.2);
    window.radarChart.data.datasets[0].borderColor = primaryColor;
    window.radarChart.data.datasets[0].pointBackgroundColor = primaryColor;

    // Update scale colors
    window.radarChart.options.scales.r.angleLines.color = hexToRgba(textColor, 0.1);
    window.radarChart.options.scales.r.grid.color = hexToRgba(textColor, 0.1);
    window.radarChart.options.scales.r.ticks.color = textColor;
    window.radarChart.options.scales.r.pointLabels.color = textColor;
    
    // Update tooltip colors
    window.radarChart.options.plugins.tooltip.backgroundColor = hexToRgba(textColor, 0.9);
    window.radarChart.options.plugins.tooltip.titleColor = bgColor;
    window.radarChart.options.plugins.tooltip.bodyColor = bgColor;
    
    // Update legend colors
    window.radarChart.options.plugins.legend.labels.color = textColor;
    
    window.radarChart.update();
}

// Add animated skill bars
function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('aria-valuenow');
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}