// API BMKG Base URL
const BMKG_API_BASE = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';

// Cache untuk menyimpan data
let weatherCache = {};

// Data demo untuk testing offline
const DEMO_DATA = {
    "lokasi": {
        "adm1": "35",
        "adm2": "35.17",
        "adm3": "35.17.06",
        "adm4": "35.17.06.2008",
        "provinsi": "Jawa Timur",
        "kotkab": "Jombang",
        "kecamatan": "Jombang",
        "desa": "Candi Mulyo",
        "lat": "-7.5544",
        "lon": "112.2356",
        "timezone": "Asia/Jakarta"
    },
    "data": [{
        "cuaca": [
            // Hari 1
            [
                {
                    "local_datetime": "2025-11-17 06:00:00",
                    "t": 26,
                    "hu": 75,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 15,
                    "wd": "Timur",
                    "vs_text": "5 - 10 km",
                    "tcc": 85,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-17 09:00:00",
                    "t": 28,
                    "hu": 70,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 12,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 40,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-17 12:00:00",
                    "t": 31,
                    "hu": 65,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 10,
                    "wd": "Timur",
                    "vs_text": "> 10 km",
                    "tcc": 75,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-17 15:00:00",
                    "t": 32,
                    "hu": 60,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 18,
                    "wd": "Barat Daya",
                    "vs_text": "5 - 10 km",
                    "tcc": 90,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-17 18:00:00",
                    "t": 27,
                    "hu": 80,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 15,
                    "wd": "Barat",
                    "vs_text": "5 - 10 km",
                    "tcc": 85,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-17 21:00:00",
                    "t": 25,
                    "hu": 85,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 8,
                    "wd": "Barat Laut",
                    "vs_text": "> 10 km",
                    "tcc": 70,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-18 00:00:00",
                    "t": 24,
                    "hu": 88,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 7,
                    "wd": "Utara",
                    "vs_text": "> 10 km",
                    "tcc": 35,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-18 03:00:00",
                    "t": 23,
                    "hu": 90,
                    "weather": "0",
                    "weather_desc": "Cerah",
                    "weather_desc_en": "Clear",
                    "ws": 5,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 20,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/0.png"
                }
            ],
            // Hari 2
            [
                {
                    "local_datetime": "2025-11-18 06:00:00",
                    "t": 25,
                    "hu": 78,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 10,
                    "wd": "Timur",
                    "vs_text": "> 10 km",
                    "tcc": 45,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-18 09:00:00",
                    "t": 29,
                    "hu": 68,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 13,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 65,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-18 12:00:00",
                    "t": 33,
                    "hu": 62,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 16,
                    "wd": "Barat",
                    "vs_text": "5 - 10 km",
                    "tcc": 88,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-18 15:00:00",
                    "t": 31,
                    "hu": 70,
                    "weather": "95",
                    "weather_desc": "Hujan Lebat",
                    "weather_desc_en": "Heavy Rain",
                    "ws": 22,
                    "wd": "Barat Daya",
                    "vs_text": "2 - 5 km",
                    "tcc": 95,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/95.png"
                },
                {
                    "local_datetime": "2025-11-18 18:00:00",
                    "t": 26,
                    "hu": 82,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 17,
                    "wd": "Barat",
                    "vs_text": "5 - 10 km",
                    "tcc": 80,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-18 21:00:00",
                    "t": 24,
                    "hu": 86,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 9,
                    "wd": "Barat Laut",
                    "vs_text": "> 10 km",
                    "tcc": 68,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-19 00:00:00",
                    "t": 23,
                    "hu": 89,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 6,
                    "wd": "Utara",
                    "vs_text": "> 10 km",
                    "tcc": 38,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-19 03:00:00",
                    "t": 22,
                    "hu": 92,
                    "weather": "0",
                    "weather_desc": "Cerah",
                    "weather_desc_en": "Clear",
                    "ws": 4,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 15,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/0.png"
                }
            ],
            // Hari 3
            [
                {
                    "local_datetime": "2025-11-19 06:00:00",
                    "t": 26,
                    "hu": 76,
                    "weather": "0",
                    "weather_desc": "Cerah",
                    "weather_desc_en": "Clear",
                    "ws": 8,
                    "wd": "Timur",
                    "vs_text": "> 10 km",
                    "tcc": 25,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/0.png"
                },
                {
                    "local_datetime": "2025-11-19 09:00:00",
                    "t": 30,
                    "hu": 66,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 11,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 42,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-19 12:00:00",
                    "t": 34,
                    "hu": 58,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 14,
                    "wd": "Timur",
                    "vs_text": "> 10 km",
                    "tcc": 72,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-19 15:00:00",
                    "t": 33,
                    "hu": 64,
                    "weather": "60",
                    "weather_desc": "Hujan Ringan",
                    "weather_desc_en": "Light Rain",
                    "ws": 19,
                    "wd": "Barat Daya",
                    "vs_text": "5 - 10 km",
                    "tcc": 86,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/60.png"
                },
                {
                    "local_datetime": "2025-11-19 18:00:00",
                    "t": 28,
                    "hu": 79,
                    "weather": "3",
                    "weather_desc": "Berawan",
                    "weather_desc_en": "Cloudy",
                    "ws": 13,
                    "wd": "Barat",
                    "vs_text": "> 10 km",
                    "tcc": 70,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/3.png"
                },
                {
                    "local_datetime": "2025-11-19 21:00:00",
                    "t": 25,
                    "hu": 84,
                    "weather": "1",
                    "weather_desc": "Cerah Berawan",
                    "weather_desc_en": "Partly Cloudy",
                    "ws": 8,
                    "wd": "Barat Laut",
                    "vs_text": "> 10 km",
                    "tcc": 40,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/1.png"
                },
                {
                    "local_datetime": "2025-11-19 00:00:00",
                    "t": 24,
                    "hu": 87,
                    "weather": "0",
                    "weather_desc": "Cerah",
                    "weather_desc_en": "Clear",
                    "ws": 6,
                    "wd": "Utara",
                    "vs_text": "> 10 km",
                    "tcc": 22,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/0.png"
                },
                {
                    "local_datetime": "2025-11-20 03:00:00",
                    "t": 23,
                    "hu": 91,
                    "weather": "0",
                    "weather_desc": "Cerah",
                    "weather_desc_en": "Clear",
                    "ws": 5,
                    "wd": "Timur Laut",
                    "vs_text": "> 10 km",
                    "tcc": 18,
                    "image": "https://www.bmkg.go.id/asset/img/cuaca/0.png"
                }
            ]
        ]
    }]
};

// Fungsi untuk memuat data cuaca
async function loadWeatherData() {
    const areaCodeSelect = document.getElementById('areaCode');
    const areaCode = areaCodeSelect.value;
    
    if (!areaCode) {
        showError('Silakan pilih wilayah terlebih dahulu!');
        return;
    }

    // Tampilkan loading
    showLoading();
    hideError();
    hideWeatherDashboard();

    try {
        // Cek cache terlebih dahulu
        if (weatherCache[areaCode]) {
            displayWeatherData(weatherCache[areaCode]);
            hideLoading();
            showInfo('📦 Data dimuat dari cache');
            return;
        }

        // Fetch data dari API BMKG
        const apiUrl = `${BMKG_API_BASE}?adm4=${areaCode}`;
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Validasi data
        if (!data || !data.lokasi) {
            throw new Error('Data tidak valid atau tidak ditemukan');
        }

        // Simpan ke cache
        weatherCache[areaCode] = data;

        // Tampilkan data
        displayWeatherData(data);
        showInfo('✅ Data berhasil dimuat dari API BMKG');

    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(`❌ Gagal memuat data cuaca: ${error.message}. 
            <br><br>💡 Pastikan koneksi internet aktif untuk mengakses API BMKG.`);
    } finally {
        hideLoading();
    }
}

// Fungsi untuk menampilkan data cuaca
function displayWeatherData(data) {
    // Tampilkan informasi lokasi
    displayLocationInfo(data.lokasi);

    // Tampilkan cuaca saat ini (data pertama)
    if (data.data && data.data[0] && data.data[0].cuaca) {
        displayCurrentWeather(data.data[0].cuaca[0][0], data.lokasi);
    }

    // Tampilkan forecast 3 hari
    displayForecast(data.data);

    // Update waktu terakhir diperbarui
    updateLastUpdateTime();

    // Tampilkan dashboard
    showWeatherDashboard();
}

// Fungsi untuk menampilkan informasi lokasi
function displayLocationInfo(lokasi) {
    const kelurahan = lokasi.desa || 'N/A';
    const kecamatan = lokasi.kecamatan || 'N/A';
    
    // Tampilkan nama kelurahan yang sebenarnya dari API
    document.getElementById('locationName').textContent = kelurahan;
    document.getElementById('kecamatan').textContent = kecamatan;
    document.getElementById('kabupaten').textContent = lokasi.kotkab || 'N/A';
    document.getElementById('provinsi').textContent = lokasi.provinsi || 'N/A';
    document.getElementById('koordinat').textContent = 
        `${lokasi.lat || 'N/A'}, ${lokasi.lon || 'N/A'}`;
    document.getElementById('timezone').textContent = lokasi.timezone || 'N/A';
    
    // Tampilkan info jika nama berbeda dari yang dipilih
    const areaCodeSelect = document.getElementById('areaCode');
    const selectedText = areaCodeSelect.options[areaCodeSelect.selectedIndex].text;
    const selectedInfo = document.getElementById('selectedInfo');
    
    if (selectedInfo) {
        selectedInfo.innerHTML = `✅ Menampilkan data: <strong>${kelurahan}, ${kecamatan}</strong>`;
        selectedInfo.style.color = '#155724';
        selectedInfo.style.background = '#d4edda';
        selectedInfo.style.padding = '10px';
        selectedInfo.style.borderRadius = '6px';
        selectedInfo.style.border = '1px solid #28a745';
    }
    
    document.getElementById('locationInfo').style.display = 'block';
}

// Fungsi untuk menampilkan cuaca saat ini
function displayCurrentWeather(currentData, lokasi) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    
    const temp = currentData.t || 'N/A';
    const desc = currentData.weather_desc || 'N/A';
    const humidity = currentData.hu || 'N/A';
    const windSpeed = currentData.ws || 'N/A';
    const windDir = currentData.wd || 'N/A';
    const visibility = currentData.vs_text || 'N/A';
    const cloudCover = currentData.tcc || 'N/A';
    const imageUrl = currentData.image ? currentData.image.replace(/ /g, '%20') : '';

    currentWeatherDiv.innerHTML = `
        <h3>Cuaca Saat Ini</h3>
        ${imageUrl ? `<img src="${imageUrl}" alt="${desc}" style="width: 80px; height: 80px;">` : ''}
        <div class="current-temp">${temp}°C</div>
        <div class="current-desc">${desc}</div>
        <div class="current-details">
            <div class="detail-item">
                <strong>💧 Kelembapan</strong>
                <span>${humidity}%</span>
            </div>
            <div class="detail-item">
                <strong>💨 Kec. Angin</strong>
                <span>${windSpeed} km/j</span>
            </div>
            <div class="detail-item">
                <strong>🧭 Arah Angin</strong>
                <span>dari ${windDir}</span>
            </div>
            <div class="detail-item">
                <strong>👁️ Jarak Pandang</strong>
                <span>${visibility}</span>
            </div>
            <div class="detail-item">
                <strong>☁️ Tutupan Awan</strong>
                <span>${cloudCover}%</span>
            </div>
        </div>
    `;
}

// Fungsi untuk menampilkan forecast
function displayForecast(weatherData) {
    const forecastDiv = document.getElementById('forecast');
    
    if (!weatherData || !weatherData[0] || !weatherData[0].cuaca) {
        forecastDiv.innerHTML = '<p>Data prakiraan tidak tersedia</p>';
        return;
    }

    let forecastHTML = '<h3>📅 Prakiraan 3 Hari Ke Depan</h3>';

    const cuacaPerHari = weatherData[0].cuaca;

    cuacaPerHari.forEach((harian, dayIndex) => {
        const dayNumber = dayIndex + 1;
        const dayName = getDayName(dayIndex);
        
        forecastHTML += `
            <div class="day-forecast">
                <h4>📆 ${dayName} (Hari ke-${dayNumber})</h4>
                <div class="forecast-grid">
        `;

        if (Array.isArray(harian)) {
            harian.forEach(prakiraan => {
                const time = formatTime(prakiraan.local_datetime);
                const temp = prakiraan.t || 'N/A';
                const desc = prakiraan.weather_desc || 'N/A';
                const humidity = prakiraan.hu || 'N/A';
                const windSpeed = prakiraan.ws || 'N/A';
                const windDir = prakiraan.wd || 'N/A';
                const visibility = prakiraan.vs_text || 'N/A';
                const imageUrl = prakiraan.image ? prakiraan.image.replace(/ /g, '%20') : '';

                forecastHTML += `
                    <div class="forecast-card">
                        <div class="forecast-time">🕐 ${time}</div>
                        ${imageUrl ? `<img src="${imageUrl}" alt="${desc}" class="forecast-icon">` : ''}
                        <div class="forecast-desc">${desc}</div>
                        <div class="forecast-details">
                            <div>
                                <strong>🌡️ Suhu</strong>
                                ${temp}°C
                            </div>
                            <div>
                                <strong>💧 Kelembapan</strong>
                                ${humidity}%
                            </div>
                            <div>
                                <strong>💨 Kec. Angin</strong>
                                ${windSpeed} km/j
                            </div>
                            <div>
                                <strong>🧭 Arah</strong>
                                ${windDir}
                            </div>
                            <div>
                                <strong>👁️ Pandang</strong>
                                ${visibility}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        forecastHTML += `
                </div>
            </div>
        `;
    });

    forecastDiv.innerHTML = forecastHTML;
}

// Fungsi helper untuk format waktu
function formatTime(datetime) {
    if (!datetime) return 'N/A';
    const date = new Date(datetime);
    return date.toLocaleString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: 'short'
    });
}

// Fungsi helper untuk mendapatkan nama hari
function getDayName(dayIndex) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayIndex);
    
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[targetDate.getDay()];
}

// Fungsi untuk update waktu terakhir diperbarui
function updateLastUpdateTime() {
    const now = new Date();
    document.getElementById('updateTime').textContent = 
        now.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
}

// Fungsi untuk menampilkan/menyembunyikan elemen
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = message;
    errorDiv.style.display = 'block';
}

function showInfo(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = message;
    errorDiv.style.display = 'block';
    errorDiv.style.background = '#d1ecf1';
    errorDiv.style.color = '#0c5460';
    errorDiv.style.borderLeft = '4px solid #17a2b8';
}

function hideError() {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    errorDiv.style.background = '';
    errorDiv.style.color = '';
    errorDiv.style.borderLeft = '';
}

function showWeatherDashboard() {
    document.getElementById('weatherDashboard').style.display = 'block';
}

function hideWeatherDashboard() {
    document.getElementById('weatherDashboard').style.display = 'none';
    document.getElementById('locationInfo').style.display = 'none';
}

// Event listener untuk auto-load saat dropdown berubah
document.getElementById('areaCode').addEventListener('change', function() {
    if (this.value) {
        loadWeatherData();
    }
});

// Auto-load data jika ada nilai default yang dipilih
window.addEventListener('load', function() {
    const savedAreaCode = localStorage.getItem('selectedAreaCode');
    if (savedAreaCode) {
        document.getElementById('areaCode').value = savedAreaCode;
        loadWeatherData();
    }
});

// Simpan pilihan area ke localStorage
document.getElementById('areaCode').addEventListener('change', function() {
    if (this.value) {
        localStorage.setItem('selectedAreaCode', this.value);
    }
});
