// Current time range (default from config)
let currentTimeRange = {
    from: grafanaConfig.timeRange.from,
    to: grafanaConfig.timeRange.to
};

// Fungsi untuk membuat iframe dengan URL dari config
function createIframe(panelKey, panelId) {
    const iframe = document.createElement('iframe');
    iframe.src = generateEmbedUrl(panelId);
    iframe.width = '100%';
    iframe.height = grafanaConfig.iframeHeight;
    iframe.frameBorder = '0';
    iframe.setAttribute('data-panel-key', panelKey);
    
    return iframe;
}

// Override generateEmbedUrl to use current time range
window.generateEmbedUrl = function(panelId) {
    const params = new URLSearchParams({
        orgId: '1',
        panelId: panelId,
        theme: grafanaConfig.theme,
        from: currentTimeRange.from,
        to: currentTimeRange.to,
        refresh: '30s'
    });
    
    return `${grafanaConfig.baseUrl}/d-solo/${grafanaConfig.dashboardId}/${grafanaConfig.dashboardName}?${params}`;
};

// Fungsi untuk load semua iframe
function loadAllIframes() {
    const containers = document.querySelectorAll('.chart-container[data-panel]');
    
    containers.forEach(container => {
        const panelKey = container.getAttribute('data-panel');
        const panelConfig = grafanaConfig.panels[panelKey];
        
        if (panelConfig && panelConfig.id) {
            // Add loading class
            container.classList.add('loading');
            
            // Create and append iframe
            const iframe = createIframe(panelKey, panelConfig.id);
            
            // Remove loading class when iframe loads
            iframe.addEventListener('load', function() {
                container.classList.remove('loading');
            });
            
            // Handle iframe errors
            iframe.addEventListener('error', function() {
                container.classList.remove('loading');
            });
            
            container.appendChild(iframe);
        }
    });
}

// Function to refresh all iframes
function refreshDashboard() {
    const iframes = document.querySelectorAll('iframe[data-panel-key]');
    iframes.forEach(iframe => {
        const panelKey = iframe.getAttribute('data-panel-key');
        const panelConfig = grafanaConfig.panels[panelKey];
        if (panelConfig && panelConfig.id) {
            iframe.src = generateEmbedUrl(panelConfig.id);
        }
    });
    updateLastRefreshTime();
}

// Function to update time range and refresh
function updateTimeRange(newRange) {
    currentTimeRange.from = newRange;
    currentTimeRange.to = 'now';
    refreshDashboard();
}

// Display last update time
function updateLastRefreshTime() {
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID');
        lastUpdateEl.textContent = `Terakhir diperbarui: ${timeString}`;
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load all iframes
    loadAllIframes();
    
    // Set up time range selector
    const timeRangeSelect = document.getElementById('timeRange');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function() {
            updateTimeRange(this.value);
        });
    }
    
    // Set up refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshDashboard();
        });
    }
    
    // Initial last update time
    updateLastRefreshTime();
    
    // Set up auto-refresh
    const refreshInterval = grafanaConfig.refreshInterval || 300000;
    setInterval(function() {
        refreshDashboard();
    }, refreshInterval);
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Display last update time
function updateLastRefreshTime() {
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID');
        lastUpdateEl.textContent = `Terakhir diperbarui: ${timeString}`;
    }
}

// Update time on page load and after each refresh
updateLastRefreshTime();

// Optional: Add visibility change handler to pause/resume auto-refresh
let autoRefreshInterval;
document.addEventListener('visibilitychange', function() {
    const refreshInterval = grafanaConfig.refreshInterval || 300000;
    
    if (document.hidden) {
        // Page is hidden, clear interval
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
    } else {
        // Page is visible, resume interval
        autoRefreshInterval = setInterval(refreshDashboard, refreshInterval);
    }
});

// Fetch and display real-time weather data (obfuscated)
async function fetchWeatherData() {
    try {
        const _0x1 = atob('L2FwaS93ZWF0aGVyLWRhdGE=');
        const response = await fetch(_0x1 + '?range=-15m');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        updateStatsCards(data);
        
    } catch (error) {
        // Silent error handling
    }
}

function updateStatsCards(data) {
    const fields = ['rainfall', 'temperature', 'humidity', 'pressure', 'wind_speed', 'wind_direction'];
    
    fields.forEach(field => {
        const element = document.getElementById(`stat-${field}`);
        const card = element.closest('.stat-card');
        
        if (data[field] !== undefined) {
            let value = data[field];
            
            // Format based on field type
            if (field === 'temperature') {
                value = value.toFixed(1);
            } else if (field === 'humidity') {
                value = Math.round(value);
            } else if (field === 'pressure') {
                value = value.toFixed(1);
            } else if (field === 'rainfall') {
                value = value.toFixed(2);
            } else if (field === 'wind_speed') {
                value = value.toFixed(1);
            } else if (field === 'wind_direction') {
                value = Math.round(value);
            }
            
            element.textContent = value;
            card.classList.remove('loading-card');
        } else {
            element.textContent = '--';
        }
    });
}

// Initialize stats data fetch on page load
(function() {
    const init = function() {
        fetchWeatherData();
        setInterval(fetchWeatherData, 30000);
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
