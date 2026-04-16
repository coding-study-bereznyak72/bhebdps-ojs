document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('items');
    const loader = document.getElementById('loader');
    
    const CACHE_KEY = 'currency_data';
    
    function showLoader() {
        loader.classList.add('loader_active');
    }
    
    function hideLoader() {
        loader.classList.remove('loader_active');
        loader.style.display = 'none';
    }
    
    function displayCurrencies(data) {
        if (!data || !data.response || !data.response.Valute) {
            itemsContainer.innerHTML = '<div class="error">Нет данных о курсе валют</div>';
            hideLoader();
            return;
        }
        
        const currencies = data.response.Valute;
        itemsContainer.innerHTML = '';
        
        for (const currencyCode in currencies) {
            const currency = currencies[currencyCode];
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            
            const codeDiv = document.createElement('div');
            codeDiv.className = 'item__code';
            codeDiv.textContent = currency.CharCode;
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'item__value';
            valueDiv.textContent = currency.Value;
            
            const currencyDiv = document.createElement('div');
            currencyDiv.className = 'item__currency';
            currencyDiv.textContent = 'руб.';
            
            itemDiv.appendChild(codeDiv);
            itemDiv.appendChild(valueDiv);
            itemDiv.appendChild(currencyDiv);
            itemsContainer.appendChild(itemDiv);
        }
        
        hideLoader();
    }
    
    function saveToCache(data) {
        const cacheData = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }
    
    function loadFromCache() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const cacheData = JSON.parse(cached);
        return cacheData.data;
    }
    
    function isCacheValid() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return false;
        const cacheData = JSON.parse(cached);
        const fiveMinutes = 5 * 60 * 1000;
        return (Date.now() - cacheData.timestamp) < fiveMinutes;
    }
    
    function fetchCurrencyData() {
        showLoader();
        
        fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
            .then(response => response.json())
            .then(data => {
                saveToCache(data);
                displayCurrencies(data);
            })
            .catch(error => {
                itemsContainer.innerHTML = '<div class="error">Ошибка загрузки данных</div>';
                hideLoader();
            });
    }
    
    function backgroundUpdate() {
        fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
            .then(response => response.json())
            .then(data => {
                saveToCache(data);
                displayCurrencies(data);
            })
            .catch(error => {});
    }
    
    if (isCacheValid()) {
        const cachedData = loadFromCache();
        if (cachedData) {
            displayCurrencies(cachedData);
            backgroundUpdate();
            return;
        }
    }
    
    fetchCurrencyData();
});