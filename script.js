// Global variables to track state
let selectedProduct = "Cookbook";
let selectedView = "yearly";
let selectedYear = "All";
let selectedPlatform = "All";

// Chart objects
let yearlyBarChart = null;
let yearlyLineChart = null;
let monthlyBarChart = null;
let monthlyLineChart = null;
let platformBarChart = null;
let platformTotalChart = null;
let pieChart = null;
let timelineChart = null; // New timeline chart

// Initialize the dashboard when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeDashboard();
});

// Main initialization function
function initializeDashboard() {
    // Populate product select dropdown
    populateProductSelect();
    
    // Set up event listeners
    document.getElementById("product-select").addEventListener("change", handleProductChange);
    document.getElementById("view-select").addEventListener("change", handleViewChange);
    document.getElementById("year-select").addEventListener("change", handleYearChange);
    document.getElementById("platform-select").addEventListener("change", handlePlatformChange);
    
    // Initialize the dashboard with default values
    updateDashboard();
}

// Populate product select dropdown
function populateProductSelect() {
    const productSelect = document.getElementById("product-select");
    
    Object.keys(productData).forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        option.textContent = product;
        productSelect.appendChild(option);
    });
}

// Handle product change
function handleProductChange(e) {
    selectedProduct = e.target.value;
    
    // Reset to default values
    selectedView = "yearly";
    selectedYear = "All";
    selectedPlatform = "All";
    
    // Update select elements to reflect default values
    document.getElementById("view-select").value = selectedView;
    
    // Update the dashboard
    updateDashboard();
}

// Handle view change
function handleViewChange(e) {
    selectedView = e.target.value;
    
    // Enable/disable year select based on view
    document.getElementById("year-select").disabled = (selectedView === "yearly");
    document.getElementById("platform-select").disabled = (selectedView === "platform");
    
    // Update the dashboard
    updateDashboard();
}

// Handle year change
function handleYearChange(e) {
    selectedYear = e.target.value;
    updateDashboard();
}

// Handle platform change
function handlePlatformChange(e) {
    selectedPlatform = e.target.value;
    updateDashboard();
}

// Main function to update the dashboard
function updateDashboard() {
    const currentProductData = productData[selectedProduct];
    const { config } = currentProductData;
    const { years, platforms, hasEbooks, growthFactor, productLabel } = config;
    
    // Update select options
    updateYearSelect(years);
    updatePlatformSelect(platforms);
    
    // Update the UI based on hasEbooks
    updateEbookDisplay(hasEbooks, productLabel);
    
    // Show/hide views based on selection
    updateViewVisibility();
    
    // Update data
    const yearlyData = calculateYearlyTotals(currentProductData, selectedPlatform, hasEbooks);
    const platformData = calculatePlatformTotals(currentProductData, selectedYear, hasEbooks);
    const monthlyData = getMonthlyData(currentProductData, selectedYear, selectedPlatform, hasEbooks);
    const forecast2025 = calculate2025Forecast(currentProductData, selectedPlatform, hasEbooks, growthFactor);
    const pieChartData = preparePieChartData(currentProductData, selectedYear, hasEbooks);
    const timelineData = generateTimelineData(currentProductData, selectedPlatform, hasEbooks); // New timeline data
    
    // Create summary data including forecast
    const summaryData = [...yearlyData];
    if ((selectedYear === 'All' || selectedYear === '2025') && forecast2025) {
        summaryData.push(forecast2025);
    }
    
    // Update charts
    updateYearlyCharts(yearlyData, hasEbooks, productLabel);
    updateMonthlyCharts(monthlyData, hasEbooks, productLabel);
    updatePlatformCharts(platformData, hasEbooks, productLabel);
    updatePieChart(pieChartData);
    updateTimelineChart(timelineData, hasEbooks, productLabel); // Update timeline chart
    
    // Update table
    updateSummaryTable(summaryData, hasEbooks, productLabel);
    
    // Update alert
    updateAlert(currentProductData);
    
    // Update notes
    updateNotes(currentProductData);
    
    // Update forecast explanation
    updateForecastExplanation(forecast2025, growthFactor);
    
    // Update product comparison section
    updateProductComparison(yearlyData, platformData, hasEbooks, productLabel);
}

// Update year select options
function updateYearSelect(years) {
    const yearSelect = document.getElementById("year-select");
    
    // Clear existing options
    yearSelect.innerHTML = "";
    
    // Add new options
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
    
    // Set selected value
    if (years.includes(selectedYear)) {
        yearSelect.value = selectedYear;
    } else {
        selectedYear = years[0];
        yearSelect.value = selectedYear;
    }
}

// Update platform select options
function updatePlatformSelect(platforms) {
    const platformSelect = document.getElementById("platform-select");
    
    // Clear existing options
    platformSelect.innerHTML = "";
    
    // Add new options
    platforms.forEach(platform => {
        const option = document.createElement("option");
        option.value = platform;
        option.textContent = platform;
        platformSelect.appendChild(option);
    });
    
    // Set selected value
    if (platforms.includes(selectedPlatform)) {
        platformSelect.value = selectedPlatform;
    } else {
        selectedPlatform = platforms[0];
        platformSelect.value = selectedPlatform;
    }
}

// Update eBook display
function updateEbookDisplay(hasEbooks, productLabel) {
    const ebookColumn = document.querySelectorAll(".ebook-column");
    const ebookHeader = document.getElementById("ebook-header");
    const physicalHeader = document.getElementById("physical-header");
    
    // Show/hide eBook column
    ebookColumn.forEach(col => {
        col.style.display = hasEbooks ? "table-cell" : "none";
    });
    
    // Update header text
    physicalHeader.textContent = `Physical ${productLabel}`;
    ebookHeader.textContent = productLabel === "Magnet" ? "Digital Products" : "eBooks";
}

// Update view visibility
function updateViewVisibility() {
    const yearlyView = document.getElementById("yearly-view");
    const monthlyView = document.getElementById("monthly-view");
    const platformView = document.getElementById("platform-view");
    const timelineChartContainer = document.getElementById("timeline-chart-container");
    
    // Hide all views
    yearlyView.classList.add("hidden");
    monthlyView.classList.add("hidden");
    platformView.classList.add("hidden");
    
    // Show selected view
    if (selectedView === "yearly") {
        yearlyView.classList.remove("hidden");
        timelineChartContainer.classList.add("hidden");
    } else if (selectedView === "monthly") {
        monthlyView.classList.remove("hidden");
        
        // Show/hide timeline chart based on year selection
        if (selectedYear === "All") {
            timelineChartContainer.classList.remove("hidden");
        } else {
            timelineChartContainer.classList.add("hidden");
        }
        
        // Show appropriate message
        const monthlyMessage = document.getElementById("monthly-message");
        const monthlyEmptyMessage = document.getElementById("monthly-empty-message");
        const monthlyCharts = document.querySelectorAll("#monthly-view .chart-wrapper:not(#timeline-chart-container)");
        
        if (selectedYear === "All") {
            monthlyMessage.classList.remove("hidden");
            monthlyEmptyMessage.classList.add("hidden");
            monthlyCharts.forEach(chart => chart.classList.add("hidden"));
        } else {
            monthlyMessage.classList.add("hidden");
            
            // Check if there's data
            const hasData = document.getElementById("monthly-bar-chart").getContext('2d').canvas.hasAttribute("data-has-data");
            
            if (hasData === "false") {
                monthlyEmptyMessage.classList.remove("hidden");
                monthlyCharts.forEach(chart => chart.classList.add("hidden"));
            } else {
                monthlyEmptyMessage.classList.add("hidden");
                monthlyCharts.forEach(chart => chart.classList.remove("hidden"));
            }
        }
    } else if (selectedView === "platform") {
        platformView.classList.remove("hidden");
        timelineChartContainer.classList.add("hidden");
    }
    
    // Update chart titles
    updateChartTitles();
}

// Update chart titles based on selections
function updateChartTitles() {
    // Yearly charts
    const yearlyChartTitles = document.querySelectorAll("#yearly-view .chart-title");
    yearlyChartTitles.forEach(title => {
        if (title.textContent.includes("Sales by Year")) {
            title.textContent = `Sales by Year ${selectedPlatform !== 'All' ? `(${selectedPlatform})` : ''}`;
        } else if (title.textContent.includes("Sales Trend by Year")) {
            title.textContent = `Sales Trend by Year ${selectedPlatform !== 'All' ? `(${selectedPlatform})` : ''}`;
        }
    });
    
    // Monthly charts
    const monthlyChartTitles = document.querySelectorAll("#monthly-view .chart-title");
    monthlyChartTitles.forEach(title => {
        if (title.textContent.includes("Monthly Sales")) {
            title.textContent = `Monthly Sales for ${selectedYear === 'All' ? 'All Years' : selectedYear} ${selectedPlatform !== 'All' ? `(${selectedPlatform})` : ''}`;
        } else if (title.textContent.includes("Sales Timeline")) {
            title.textContent = `Sales Timeline (2021-2025) ${selectedPlatform !== 'All' ? `(${selectedPlatform})` : ''}`;
        }
    });
    
    // Platform charts
    const platformChartTitles = document.querySelectorAll("#platform-view .chart-title");
    platformChartTitles.forEach(title => {
        if (title.textContent.includes("Sales by Platform")) {
            title.textContent = `Sales by Platform ${selectedYear !== 'All' ? `(${selectedYear})` : ''}`;
        } else if (title.textContent.includes("Total Sales by Platform")) {
            title.textContent = `Total Sales by Platform ${selectedYear !== 'All' ? `(${selectedYear})` : ''}`;
        }
    });
    
    // Pie chart
    const pieChartTitle = document.querySelector(".chart-column:nth-child(2) .chart-title");
    pieChartTitle.textContent = `Platform Sales Distribution ${selectedYear !== 'All' ? `(${selectedYear})` : ''}`;
}

// Update yearly charts
function updateYearlyCharts(yearlyData, hasEbooks, productLabel) {
    const barCtx = document.getElementById("yearly-bar-chart").getContext('2d');
    const lineCtx = document.getElementById("yearly-line-chart").getContext('2d');
    
    // Prepare data for bar chart
    const barData = {
        labels: yearlyData.map(item => item.year),
        datasets: [
            {
                label: `Physical ${productLabel}`,
                data: yearlyData.map(item => item.Physical),
                backgroundColor: '#8884d8'
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        barData.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: yearlyData.map(item => item.eBook),
            backgroundColor: '#82ca9d'
        });
    }
    
    // Prepare data for line chart
    const lineData = {
        labels: yearlyData.map(item => item.year),
        datasets: [
            {
                label: "Total Sales",
                data: yearlyData.map(item => item.Total),
                borderColor: '#ff7300',
                tension: 0.1,
                fill: false
            },
            {
                label: `Physical ${productLabel}`,
                data: yearlyData.map(item => item.Physical),
                borderColor: '#8884d8',
                tension: 0.1,
                fill: false
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        lineData.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: yearlyData.map(item => item.eBook),
            borderColor: '#82ca9d',
            tension: 0.1,
            fill: false
        });
    }
    
    // Destroy existing charts
    if (yearlyBarChart) yearlyBarChart.destroy();
    if (yearlyLineChart) yearlyLineChart.destroy();
    
    // Create new charts
    yearlyBarChart = new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    yearlyLineChart = new Chart(lineCtx, {
        type: 'line',
        data: lineData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update monthly charts
function updateMonthlyCharts(monthlyData, hasEbooks, productLabel) {
    const barCtx = document.getElementById("monthly-bar-chart").getContext('2d');
    const lineCtx = document.getElementById("monthly-line-chart").getContext('2d');
    
    // Set data-has-data attribute
    barCtx.canvas.setAttribute("data-has-data", monthlyData.length > 0 ? "true" : "false");
    
    // Don't update if no data or year is "All"
    if (selectedYear === "All" || monthlyData.length === 0) {
        if (monthlyBarChart) monthlyBarChart.destroy();
        if (monthlyLineChart) monthlyLineChart.destroy();
        monthlyBarChart = null;
        monthlyLineChart = null;
        return;
    }
    
    // Prepare data for bar chart
    const barData = {
        labels: monthlyData.map(item => item.month),
        datasets: [
            {
                label: `Physical ${productLabel}`,
                data: monthlyData.map(item => item.Physical),
                backgroundColor: '#8884d8'
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        barData.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: monthlyData.map(item => item.eBook),
            backgroundColor: '#82ca9d'
        });
    }
    
    // Prepare data for line chart
    const lineData = {
        labels: monthlyData.map(item => item.month),
        datasets: [
            {
                label: "Total Sales",
                data: monthlyData.map(item => item.Total),
                borderColor: '#ff7300',
                tension: 0.1,
                fill: false
            },
            {
                label: `Physical ${productLabel}`,
                data: monthlyData.map(item => item.Physical),
                borderColor: '#8884d8',
                tension: 0.1,
                fill: false
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        lineData.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: monthlyData.map(item => item.eBook),
            borderColor: '#82ca9d',
            tension: 0.1,
            fill: false
        });
    }
    
    // Destroy existing charts
    if (monthlyBarChart) monthlyBarChart.destroy();
    if (monthlyLineChart) monthlyLineChart.destroy();
    
    // Create new charts
    monthlyBarChart = new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    monthlyLineChart = new Chart(lineCtx, {
        type: 'line',
        data: lineData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update platform charts
function updatePlatformCharts(platformData, hasEbooks, productLabel) {
    const barCtx = document.getElementById("platform-bar-chart").getContext('2d');
    const totalCtx = document.getElementById("platform-total-chart").getContext('2d');
    
    // Prepare data for bar chart
    const barData = {
        labels: platformData.map(item => item.platform),
        datasets: [
            {
                label: `Physical ${productLabel}`,
                data: platformData.map(item => item.Physical),
                backgroundColor: '#8884d8'
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        barData.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: platformData.map(item => item.eBook),
            backgroundColor: '#82ca9d'
        });
    }
    
    // Prepare data for total chart
    const totalData = {
        labels: platformData.map(item => item.platform),
        datasets: [
            {
                label: "Total Sales",
                data: platformData.map(item => item.Total),
                backgroundColor: '#ff7300'
            }
        ]
    };
    
    // Destroy existing charts
    if (platformBarChart) platformBarChart.destroy();
    if (platformTotalChart) platformTotalChart.destroy();
    
    // Create new charts
    platformBarChart = new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    platformTotalChart = new Chart(totalCtx, {
        type: 'bar',
        data: totalData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// New function: Update Timeline Chart
function updateTimelineChart(timelineData, hasEbooks, productLabel) {
    const timelineCtx = document.getElementById("timeline-chart").getContext('2d');
    
    // Don't update if no data
    if (!timelineData || timelineData.labels.length === 0) {
        if (timelineChart) timelineChart.destroy();
        timelineChart = null;
        return;
    }
    
    // Prepare data for timeline chart
    const data = {
        labels: timelineData.labels,
        datasets: [
            {
                label: "Total Sales",
                data: timelineData.totalSales,
                borderColor: '#ff7300',
                backgroundColor: 'rgba(255, 115, 0, 0.1)',
                tension: 0.1,
                fill: false,
                pointRadius: 2,
                pointHoverRadius: 5,
                borderWidth: 2
            },
            {
                label: `Physical ${productLabel}`,
                data: timelineData.physicalSales,
                borderColor: '#8884d8',
                backgroundColor: 'rgba(136, 132, 216, 0.1)',
                tension: 0.1,
                fill: false,
                pointRadius: 2,
                pointHoverRadius: 5,
                borderWidth: 2
            }
        ]
    };
    
    // Add eBook dataset if applicable
    if (hasEbooks) {
        data.datasets.push({
            label: productLabel === "Magnet" ? "Digital Products" : "eBooks",
            data: timelineData.eBookSales,
            borderColor: '#82ca9d',
            backgroundColor: 'rgba(130, 202, 157, 0.1)',
            tension: 0.1,
            fill: false,
            pointRadius: 2,
            pointHoverRadius: 5,
            borderWidth: 2
        });
    }
    
    // Add platform-specific datasets if filtering by platform and not 'All'
    if (selectedPlatform !== 'All' && timelineData.platformData) {
        const platformDatasets = Object.keys(timelineData.platformData)
            .filter(platform => platform !== selectedPlatform)
            .map((platform, index) => {
                return {
                    label: `${platform} Sales`,
                    data: timelineData.platformData[platform],
                    borderColor: COLORS[index % COLORS.length],
                    backgroundColor: `rgba(${parseInt(COLORS[index % COLORS.length].slice(1, 3), 16)}, 
                                       ${parseInt(COLORS[index % COLORS.length].slice(3, 5), 16)}, 
                                       ${parseInt(COLORS[index % COLORS.length].slice(5, 7), 16)}, 0.1)`,
                    tension: 0.1,
                    fill: false,
                    pointRadius: 1.5,
                    pointHoverRadius: 4,
                    borderWidth: 1.5,
                    borderDash: [5, 5]
                };
            });
        
        data.datasets = data.datasets.concat(platformDatasets);
    }
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${productLabel} Sales Timeline`
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month/Year'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales'
                }
            }
        }
    };
    
    // Destroy existing chart
    if (timelineChart) timelineChart.destroy();
    
    // Create new chart
    timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: data,
        options: options
    });
}

// New function: Generate Timeline Data
function generateTimelineData(salesData, selectedPlatform, hasEbooks) {
    const result = {
        labels: [],
        physicalSales: [],
        eBookSales: [],
        totalSales: [],
        platformData: {}
    };
    
    // Get all available years and sort them chronologically
    const years = Object.keys(salesData.platforms)
        .flatMap(platform => 
            Object.keys(salesData.platforms[platform])
                .flatMap(type => 
                    Object.keys(salesData.platforms[platform][type])
                )
        )
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    
    // Get all available platforms
    const availablePlatforms = Object.keys(salesData.platforms);
    
    // Initialize platform data
    availablePlatforms.forEach(platform => {
        result.platformData[platform] = [];
    });
    
    // For each year and month, get the sales data
    years.forEach(year => {
        MONTHS.forEach(month => {
            let totalPhysical = 0;
            let totalEBook = 0;
            let hasSalesData = false;
            
            // Initialize platform monthly sales
            const platformMonthlySales = {};
            availablePlatforms.forEach(platform => {
                platformMonthlySales[platform] = 0;
            });
            
            // Loop through platforms
            Object.keys(salesData.platforms).forEach(platform => {
                const platformData = salesData.platforms[platform];
                let platformTotal = 0;
                
                // Skip if a specific platform is selected and this isn't it
                if (selectedPlatform !== "All" && platform !== selectedPlatform) {
                    // Still collect data for comparison but don't add to totals
                    if (platformData.Physical && 
                        platformData.Physical[year] && 
                        platformData.Physical[year][month] !== undefined) {
                        platformMonthlySales[platform] += platformData.Physical[year][month] || 0;
                        hasSalesData = true;
                    }
                    
                    if (hasEbooks && platformData.eBook && 
                        platformData.eBook[year] && 
                        platformData.eBook[year][month] !== undefined) {
                        platformMonthlySales[platform] += platformData.eBook[year][month] || 0;
                        hasSalesData = true;
                    }
                    return;
                }
                
                // Add physical sales if available
                if (platformData.Physical && 
                    platformData.Physical[year] && 
                    platformData.Physical[year][month] !== undefined) {
                    const physicalSales = platformData.Physical[year][month] || 0;
                    totalPhysical += physicalSales;
                    platformTotal += physicalSales;
                    hasSalesData = true;
                }
                
                // Add eBook sales if available and product has eBooks
                if (hasEbooks && platformData.eBook && 
                    platformData.eBook[year] && 
                    platformData.eBook[year][month] !== undefined) {
                    const eBookSales = platformData.eBook[year][month] || 0;
                    totalEBook += eBookSales;
                    platformTotal += eBookSales;
                    hasSalesData = true;
                }
                
                // Add to platform monthly sales
                platformMonthlySales[platform] = platformTotal;
            });
            
            // If we have data for this month/year, add it to the result
            if (hasSalesData) {
                const label = `${month} ${year}`;
                result.labels.push(label);
                result.physicalSales.push(totalPhysical);
                result.eBookSales.push(totalEBook);
                result.totalSales.push(totalPhysical + totalEBook);
                
                // Add platform-specific data
                Object.keys(platformMonthlySales).forEach(platform => {
                    if (!result.platformData[platform]) {
                        result.platformData[platform] = [];
                    }
                    // Pad with null values if needed
                    while (result.platformData[platform].length < result.labels.length - 1) {
                        result.platformData[platform].push(null);
                    }
                    result.platformData[platform].push(platformMonthlySales[platform]);
                });
                
                // Ensure all platform arrays have the same length
                const maxLength = result.labels.length;
                Object.keys(result.platformData).forEach(platform => {
                    while (result.platformData[platform].length < maxLength) {
                        result.platformData[platform].push(null);
                    }
                });
            }
        });
    });
    
    return result;
}

// Update pie chart
function updatePieChart(pieChartData) {
    const pieCtx = document.getElementById("pie-chart").getContext('2d');
    
    // Prepare data for pie chart
    const data = {
        labels: pieChartData.map(item => item.name),
        datasets: [
            {
                data: pieChartData.map(item => item.value),
                backgroundColor: COLORS.slice(0, pieChartData.length)
            }
        ]
    };
    
    // Calculate percentages for labels
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
    const percentages = pieChartData.map(item => ((item.value / total) * 100).toFixed(0));
    
    // Combine labels with percentages
    data.labels = data.labels.map((label, i) => `${label}: ${percentages[i]}%`);
    
    // Destroy existing chart
    if (pieChart) pieChart.destroy();
    
    // Create new chart
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label.split(':')[0]}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update summary table
function updateSummaryTable(summaryData, hasEbooks, productLabel) {
    const tableBody = document.getElementById("summary-table-body");
    
    // Clear existing rows
    tableBody.innerHTML = "";
    
    // Add new rows
    summaryData.forEach(item => {
        const row = document.createElement("tr");
        
        // Add the year cell
        const yearCell = document.createElement("td");
        yearCell.textContent = item.year;
        row.appendChild(yearCell);
        
        // Add the physical cell
        const physicalCell = document.createElement("td");
        physicalCell.textContent = Math.round(item.Physical).toLocaleString();
        row.appendChild(physicalCell);
        
        // Add the eBook cell if applicable
        if (hasEbooks) {
            const ebookCell = document.createElement("td");
            ebookCell.textContent = Math.round(item.eBook).toLocaleString();
            ebookCell.classList.add("ebook-column");
            row.appendChild(ebookCell);
        }
        
        // Add the total cell
        const totalCell = document.createElement("td");
        totalCell.textContent = Math.round(item.Total).toLocaleString();
        row.appendChild(totalCell);
        
        // Highlight forecast row
        if (item.year === "2025 (Forecast)") {
            row.classList.add("forecast-row");
        }
        
        // Add the row to the table
        tableBody.appendChild(row);
    });
}

// Update alert
function updateAlert(currentProductData) {
    const alertContainer = document.getElementById("alert-container");
    
    // Check for potential alerts
    let alertMessage = null;
    
    if (selectedProduct === "Thermometer" && 
        (selectedPlatform === "All" || selectedPlatform === "Shopify") && 
        currentProductData.platforms.Shopify.Physical["2025"]["March"] === 0) {
        alertMessage = "Shopify shows zero sales for March 2025. Please verify if this is correct or if there was an inventory or reporting issue.";
    }
    
    // Show/hide alert
    if (alertMessage) {
        alertContainer.textContent = `Alert: ${alertMessage}`;
        alertContainer.classList.remove("hidden");
    } else {
        alertContainer.classList.add("hidden");
    }
}

// Update notes
function updateNotes(currentProductData) {
    const notesContainer = document.getElementById("notes-container");
    const notesList = document.getElementById("notes-list");
    
    // Get month value for monthly view
    const monthValue = selectedView === 'monthly' ? 
        (document.getElementById("monthly-bar-chart").getContext('2d').canvas.getAttribute("data-has-data") === "true" ? 
            document.querySelector('#monthly-bar-chart').chart?.data?.labels[0] : null) : null;
    
    // Filter applicable notes
    const applicableNotes = currentProductData.notes.filter(note => {
        return note.showWhen(selectedYear, selectedPlatform, monthValue);
    });
    
    // Show/hide notes container
    if (applicableNotes.length > 0) {
        notesContainer.classList.remove("hidden");
        
        // Clear existing notes
        notesList.innerHTML = "";
        
        // Add new notes
        applicableNotes.forEach(note => {
            const li = document.createElement("li");
            li.textContent = note.text;
            notesList.appendChild(li);
        });
    } else {
        notesContainer.classList.add("hidden");
    }
}

// Update forecast explanation
function updateForecastExplanation(forecast, growthFactor) {
    const forecastContainer = document.getElementById("forecast-container");
    const forecastContent = document.getElementById("forecast-content");
    
    // Show/hide forecast container
    if (forecast) {
        forecastContainer.classList.remove("hidden");
        
        // Prepare forecast content
        let content = `
            <p class="mb-2">The 2025 forecast for ${selectedProduct} is calculated using the following method:</p>
            <ol class="forecast-list">
                <li>We use the actual data from the first 3 months of 2025 (January to March).</li>
                <li>For the remaining 9 months (April to December), we calculate the average monthly sales from 2024 for the selected platform.</li>
        `;
        
        // Add product-specific adjustments
        if (selectedProduct === "Liner") {
            content += `
                <li>Adjustments are made to account for out-of-stock periods in 2024:
                    <ul class="adjustment-list">
                        <li>Shopify: No stock from June to Dec 23, 2024</li>
                        <li>Amazon US: Low/no supply from mid-May to end of July, 2024</li>
                    </ul>
                </li>
            `;
        } else if (selectedProduct === "Thermometer") {
            content += `
                <li>Adjustments are made to account for inventory issues in 2024:
                    <ul class="adjustment-list">
                        <li>Amazon US: Listing deactivation in May-June and stock outage in August</li>
            `;
            
            if (document.getElementById("alert-container").classList.contains("hidden") === false) {
                content += `<li>Shopify: Potential March 2025 issue considered in projection</li>`;
            }
            
            content += `</ul></li>`;
        }
        
        content += `
                <li>We apply a ${((growthFactor - 1) * 100).toFixed(0)}% growth factor to these monthly averages to account for expected growth.</li>
                <li>The forecast combines the actual 3 months plus the projected 9 months.</li>
            </ol>
            <p class="forecast-note">Note: The forecast automatically adjusts when you change the selected platform.</p>
        `;
        
        forecastContent.innerHTML = content;
    } else {
        forecastContainer.classList.add("hidden");
    }
}

// Update product comparison section
function updateProductComparison(yearlyData, platformData, hasEbooks, productLabel) {
    const currentProductTitle = document.getElementById("current-product-title");
    const currentProductSales = document.getElementById("current-product-sales");
    const currentProductPlatform = document.getElementById("current-product-platform");
    const currentProductRatio = document.getElementById("current-product-ratio");
    const productInsightsList = document.getElementById("product-insights");
    
    // Update current product title
    currentProductTitle.textContent = `Current Product: ${selectedProduct}`;
    
    // Update sales in 2025
    const data2025 = yearlyData.find(d => d.year === "2025");
    currentProductSales.textContent = `Total sales in 2025 (Q1): ${data2025 ? data2025.Total.toLocaleString() : "N/A"}`;
    
    // Update top platform
    const topPlatform = platformData.sort((a, b) => b.Total - a.Total)[0];
    currentProductPlatform.textContent = `Top platform: ${topPlatform ? topPlatform.platform : "N/A"}`;
    
    // Update physical to digital ratio
    if (hasEbooks) {
        const physicalTotal = yearlyData.reduce((sum, year) => sum + year.Physical, 0);
        const eBookTotal = yearlyData.reduce((sum, year) => sum + year.eBook, 0);
        const ratio = eBookTotal > 0 ? `${(physicalTotal / eBookTotal).toFixed(1)}:1` : "N/A";
        currentProductRatio.textContent = `Physical to Digital ratio: ${ratio}`;
        currentProductRatio.classList.remove("hidden");
    } else {
        currentProductRatio.classList.add("hidden");
    }
    
    // Update product insights
    productInsightsList.innerHTML = "";
    productInsights[selectedProduct].forEach(insight => {
        const li = document.createElement("li");
        li.textContent = insight;
        productInsightsList.appendChild(li);
    });
}

// Helper function to calculate yearly totals
function calculateYearlyTotals(salesData, selectedPlatform, hasEbooks) {
    const years = Object.keys(salesData.platforms)
        .flatMap(platform => 
            Object.keys(salesData.platforms[platform])
                .flatMap(type => 
                    Object.keys(salesData.platforms[platform][type])
                )
        )
        .filter((v, i, a) => a.indexOf(v) === i);
    
    const result = [];
    
    years.forEach(year => {
        const yearData = { year };
        let totalPhysical = 0;
        let totalEBook = 0;
        
        // Loop through platforms
        Object.keys(salesData.platforms).forEach(platform => {
            // Skip if a specific platform is selected and this isn't it
            if (selectedPlatform !== "All" && platform !== selectedPlatform) return;
            
            const platformData = salesData.platforms[platform];
            
            // Add physical sales if available
            if (platformData.Physical && platformData.Physical[year]) {
                Object.values(platformData.Physical[year]).forEach(value => {
                    totalPhysical += value || 0;
                });
            }
            
            // Add eBook sales if available and product has eBooks
            if (hasEbooks && platformData.eBook && platformData.eBook[year]) {
                Object.values(platformData.eBook[year]).forEach(value => {
                    totalEBook += value || 0;
                });
            }
        });
        
        yearData.Physical = totalPhysical;
        yearData.eBook = totalEBook;
        yearData.Total = totalPhysical + totalEBook;
        
        result.push(yearData);
    });
    
    // Sort by year chronologically
    result.sort((a, b) => {
        if (a.year === b.year) return 0;
        if (!isNaN(parseInt(a.year)) && !isNaN(parseInt(b.year))) {
            return parseInt(a.year) - parseInt(b.year);
        }
        return a.year < b.year ? -1 : 1;
    });
    
    return result;
}

// Helper function to calculate platform totals
function calculatePlatformTotals(salesData, selectedYear, hasEbooks) {
    const result = [];
    
    Object.keys(salesData.platforms).forEach(platform => {
        const platformData = { platform };
        let totalPhysical = 0;
        let totalEBook = 0;
        
        const data = salesData.platforms[platform];
        
        // Add physical sales if available
        if (data.Physical) {
            Object.keys(data.Physical).forEach(year => {
                // Skip if a specific year is selected and this isn't it
                if (selectedYear !== "All" && year !== selectedYear) return;
                
                Object.values(data.Physical[year]).forEach(value => {
                    totalPhysical += value || 0;
                });
            });
        }
        
        // Add eBook sales if available and product has eBooks
        if (hasEbooks && data.eBook) {
            Object.keys(data.eBook).forEach(year => {
                // Skip if a specific year is selected and this isn't it
                if (selectedYear !== "All" && year !== selectedYear) return;
                
                Object.values(data.eBook[year]).forEach(value => {
                    totalEBook += value || 0;
                });
            });
        }
        
        platformData.Physical = totalPhysical;
        platformData.eBook = totalEBook;
        platformData.Total = totalPhysical + totalEBook;
        
        result.push(platformData);
    });
    
    return result;
}

// Helper function to get monthly data
function getMonthlyData(salesData, year, platform, hasEbooks) {
    const result = [];
    
    // Skip if year is "All"
    if (year === "All") return result;
    
    MONTHS.forEach(month => {
        const monthData = { month };
        let totalPhysical = 0;
        let totalEBook = 0;
        
        // Loop through platforms
        Object.keys(salesData.platforms).forEach(platformName => {
            // Skip if a specific platform is selected and this isn't it
            if (platform !== "All" && platformName !== platform) return;
            
            const platformData = salesData.platforms[platformName];
            
            // Add physical sales if available
            if (platformData.Physical && 
                platformData.Physical[year] && 
                platformData.Physical[year][month] !== undefined) {
                totalPhysical += platformData.Physical[year][month] || 0;
            }
            
            // Add eBook sales if available and product has eBooks
            if (hasEbooks && platformData.eBook && 
                platformData.eBook[year] && 
                platformData.eBook[year][month] !== undefined) {
                totalEBook += platformData.eBook[year][month] || 0;
            }
        });
        
        // Only add months that have data
        if (totalPhysical > 0 || totalEBook > 0) {
            monthData.Physical = totalPhysical;
            monthData.eBook = totalEBook;
            monthData.Total = totalPhysical + totalEBook;
            result.push(monthData);
        }
    });
    
    return result;
}

// Function to calculate forecast
function calculate2025Forecast(salesData, selectedPlatform, hasEbooks, growthFactor) {
    // Get the actual 2025 data for the first 3 months (with platform filter)
    const data2025 = calculateYearlyTotals(salesData, selectedPlatform, hasEbooks).find(d => d.year === "2025");
    
    // If no 2025 data, can't make a forecast
    if (!data2025) return null;
    
    // Get 2024 data for comparison (with platform filter)
    const data2024 = calculateYearlyTotals(salesData, selectedPlatform, hasEbooks).find(d => d.year === "2024");
    
    // If no 2024 data, can't make a forecast
    if (!data2024) return null;
    
    // Calculate monthly averages for 2024
    const avg2024Physical = data2024.Physical / 12;
    const avg2024eBook = hasEbooks ? data2024.eBook / 12 : 0;
    
    // We have 3 months of 2025 data, so forecast the remaining 9 months
    // based on 2024 monthly averages and apply the growth factor
    const forecast = {
        year: "2025 (Forecast)",
        Physical: data2025.Physical + (avg2024Physical * 9 * growthFactor),
        eBook: hasEbooks ? data2025.eBook + (avg2024eBook * 9 * growthFactor) : 0,
    };
    
    forecast.Total = forecast.Physical + forecast.eBook;
    
    return forecast;
}

// Prepare data for pie chart
function preparePieChartData(salesData, selectedYear, hasEbooks) {
    const platformData = calculatePlatformTotals(salesData, selectedYear, hasEbooks);
    return platformData.map(item => ({
        name: item.platform,
        value: item.Total
    }));
}
