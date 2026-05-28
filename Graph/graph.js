let stockChartInstance = null;
let currentStockData = null; 
let activeTimeframe = '1month';

window.addEventListener('stockSelected',async (event) => {
    const stockName = event.detail;
    console.log('Graph: Loading data for', stockName);
    
    const graphDataContainer = document.getElementById('graph-data');
    if (graphDataContainer) {
        graphDataContainer.innerHTML = `<p class="text-white text-sm">Loading graph for ${stockName}...</p>`;
    }
        try {
            const response = await fetch('https://stock-market-api-k9vl.onrender.com/api/stocksdata');
            const stockData = await response.json();
            currentStockData = Object.keys(stockData.stocksData[0]).find(key => key === stockName);
            console.log('Graph: Fetched stock data', Object.entries(stockData.stocksData[0]).slice(1));
            const currentStockName = currentStockData;
        }
     catch (error) {
        console.error('Graph: Error fetching stock data:', error);
    }
});

