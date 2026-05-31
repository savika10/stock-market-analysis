window.addEventListener('stockSelected', (event) => {
    const { stockName, stockData } = event.detail;
    async function fetchDescription(){
        try {
            const response = await fetch('https://stock-market-api-k9vl.onrender.com/api/profiledata');
            const profileData = await response.json();
            const descriptionContent = document.getElementById('description-content');
            const stockProfile = Object.entries(profileData.stocksProfileData[0]).find(([key, value]) => key === stockName);
            if (stockProfile) {
                descriptionContent.innerHTML = `
                    <h3 class="text-xl font-bold mb-2">${stockName} Profile</h3>
                    <p>${stockProfile[1].summary}</p>
                `;
            } else {
                descriptionContent.innerHTML = `<p>No description found for ${stockName}.</p>`;
            }
        } catch (error) {
            console.error('Error fetching description:', error);
        }
    }
    fetchDescription();
});