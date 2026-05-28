(async function () {
    try {
        const response = await fetch('https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata');
        const stockList = await response.json();
        const stockPriceContent = document.getElementById('stock-price-content');

        // Use Object.entries to get both the key (stockName) and the value (stockData) // important
        Object.entries(stockList.stocksStatsData[0]).slice(0, -1).map(([stockName, stockData], index) => {

            const stockElement = document.createElement('div');
            const isFirstStock = index === 0;
            
            stockElement.addEventListener('click', () => {
                document.querySelectorAll('#stock-price-content > div').forEach(el => el.classList.remove('bg-[#472836]/20', 'dark:bg-[#0B3948]/40'));
                stockElement.classList.add('bg-[#472836]/20', 'dark:bg-[#0B3948]/40');
                window.dispatchEvent(new CustomEvent('stockSelected', { detail: { stockName, stockData } }));
            });
            
            stockElement.className = `flex items-center gap-4 p-4 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#472836]/20 dark:hover:bg-[#0B3948]/40 ${isFirstStock ? 'bg-[#472836]/20 dark:bg-[#0B3948]/40' : ''}`;

            stockElement.innerHTML = `
        <span class="font-bold">${stockName}</span>
        <span>$${Number(stockData.bookValue).toFixed(2)}</span>
        <span class="${stockData.profit >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}">
            ${stockData.profit >= 0 ? '+' : ''}${Number(stockData.profit).toFixed(2)}%
        </span>
    `;

            stockPriceContent.appendChild(stockElement);
            
            // Auto-select first stock
            if (isFirstStock) {
                window.dispatchEvent(new CustomEvent('stockSelected', { detail: { stockName, stockData } }));
            }
        });
    } catch (error) {
        console.error('Error fetching stock prices:', error);
    }
})();