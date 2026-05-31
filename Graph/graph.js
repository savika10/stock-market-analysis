let stockChartInstance = null;
let currentStockHistory = null; 
let activeTimeframe = '1mo';

window.addEventListener('stockSelected', async (event) => {
    const stockName = event.detail.stockName.trim().toUpperCase();
    console.log('Graph: Loading data for', stockName);
    
    const graphDataContainer = document.getElementById('graph-data');
    if (graphDataContainer) {
        graphDataContainer.innerHTML = `<p class="text-white text-sm">Loading graph for ${stockName}...</p>`;
    }

    try {
        const response = await fetch('https://stock-market-api-k9vl.onrender.com/api/stocksdata');
        const stockData = await response.json();
        const allStocksObj = stockData.stocksData[0]; 
        
        if (allStocksObj && allStocksObj[stockName]) {
            currentStockHistory = allStocksObj[stockName]; 
            
            //Reinitialize the canvas layout frame
            setupCanvas();
            
            // Render initial 1mo view
            updateChartDisplay(activeTimeframe);
            
            // Make sure visual buttons match the default state upon new stock selection
            resetButtonSelection();
        } else {
            if (graphDataContainer) {
                graphDataContainer.innerHTML = `<p class="text-red-300">Stock "${stockName}" not found.</p>`;
            }
        }
    } catch (error) {
        console.error('Graph: Error fetching stock data:', error);
        if (graphDataContainer) {
            graphDataContainer.innerHTML = `<p class="text-red-300">Error loading data.</p>`;
        }
    }
});

function setupCanvas() {
    const graphDataContainer = document.getElementById('graph-data');
    graphDataContainer.innerHTML = `
        <div class="relative h-[220px] w-full mb-4">
            <canvas id="canvasChart"></canvas>
        </div>
        <div class="flex gap-6 text-sm font-bold text-white bg-black/20 p-2 rounded">
            <div>Peak Value: <span id="peak-val" class="text-green-300">-</span></div>
            <div>Low Value: <span id="low-val" class="text-orange-300">-</span></div>
        </div>
    `;
}

function updateChartDisplay(timeframe) {
    if (!currentStockHistory || !currentStockHistory[timeframe]) return;

    const dataPoints = currentStockHistory[timeframe].value || [];
    const timestamps = currentStockHistory[timeframe].timeStamp || [];

    if (timestamps.length === 0 || dataPoints.length === 0) return;

    const dateLabels = timestamps.map(ts => new Date(ts * 1000).toLocaleDateString());

    const peakValue = Math.max(...dataPoints);
    const lowValue = Math.min(...dataPoints);
    document.getElementById('peak-val').innerText = `$${peakValue.toFixed(2)}`;
    document.getElementById('low-val').innerText = `$${lowValue.toFixed(2)}`;

    const ctx = document.getElementById('canvasChart').getContext('2d');

    if (stockChartInstance) {
        stockChartInstance.destroy();
    }

    stockChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [{
                label: 'Price',
                data: dataPoints,
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#FFFFFF' }, grid: { display: false } },
                y: { ticks: { color: '#FFFFFF' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });
}

// Helper to revert active style back to 1 Month button when user switches stocks
function resetButtonSelection() {
    const buttonsWrapper = document.getElementById('graph-buttons');
    if (buttonsWrapper) {
        Array.from(buttonsWrapper.children).forEach(btn => {
            btn.classList.remove('ring-2', 'ring-white', 'active-btn');
        });
        const defaultBtn = document.getElementById('1mon');
        if (defaultBtn) defaultBtn.classList.add('ring-2', 'ring-white', 'active-btn');
    }
}

// Handle layout button configurations and timeframe switches
document.addEventListener('DOMContentLoaded', () => {
    const buttonMapping = {
        '1mon': '1mo',
        '3mon': '3mo',
        '1yr': '1y',
        '5yr': '5y' 
    };

    const buttonsWrapper = document.getElementById('graph-buttons');
    if (buttonsWrapper) {
        buttonsWrapper.addEventListener('click', (e) => {
            const targetId = e.target.id;
            
            if (buttonMapping[targetId]) {
                activeTimeframe = buttonMapping[targetId];
                
                // Clear out active rings across alternative layout buttons
                Array.from(buttonsWrapper.children).forEach(btn => {
                    btn.classList.remove('ring-2', 'ring-white', 'active-btn');
                });
                
                // Set click active state
                e.target.classList.add('ring-2', 'ring-white', 'active-btn');
                
                updateChartDisplay(activeTimeframe);
            }
        });
    }
});