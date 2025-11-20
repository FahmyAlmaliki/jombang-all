const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// InfluxDB Configuration (obfuscated)
const INFLUX_CONFIG = Buffer.from('aHR0cDovLzEwLjM5LjMwLjEyMzo4MDg2', 'base64').toString();
const INFLUX_TOKEN = Buffer.from('OGE3ZDJmMWU0YjljNWEzZDdlNmY4YTliMmMxZDRlNWY3YThiOWMwZDFlMmYzYTRiNWM2ZDdlOGY5YTBiMWMyZDNlNGY1YTZiN2M4ZDllMGYxYTJiM2M0ZDVlNmY3YThiOWMwZDFlMmYzYTRiNWM2ZDdlOGY5YTBiMWMyZA==', 'base64').toString();
const INFLUX_ORG = Buffer.from('c2VsZW5lX3Byb2R1Y3Rpb24=', 'base64').toString();
const INFLUX_BUCKET = Buffer.from('d2VhdGhlcl9zdGF0aW9u', 'base64').toString();

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama - redirect ke monitoring
app.get('/', (req, res) => {
    res.redirect('/monitoring');
});

// Route untuk halaman monitoring real-time
app.get('/monitoring', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'monitoring', 'index.html'));
});

// Route untuk halaman prediksi cuaca
app.get('/prediksi', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'prediksi', 'index.html'));
});

// API endpoint untuk mendapatkan data InfluxDB (obfuscated)
app.get('/api/weather-data', async (req, res) => {
    try {
        const timeRange = req.query.range || '-15m';
        
        const query = `from(bucket: "${INFLUX_BUCKET}")
  |> range(start: ${timeRange})
  |> filter(fn: (r) => r["_measurement"] == "weather_data")
  |> filter(fn: (r) => r["_field"] == "humidity" or r["_field"] == "pressure" or r["_field"] == "rainfall" or r["_field"] == "temperature" or r["_field"] == "wind_direction" or r["_field"] == "wind_speed")
  |> filter(fn: (r) => r["device"] == "REMOTE-STATION-63")
  |> filter(fn: (r) => r["site"] == "RemoteTestSite")
  |> last()
  |> yield(name: "last")`;

        const encodedQuery = encodeURIComponent(query);
        const url = `${INFLUX_CONFIG}/api/v2/query?org=${INFLUX_ORG}`;
        
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${INFLUX_TOKEN}`,
                'Content-Type': 'application/vnd.flux',
                'Accept': 'application/csv'
            }
        };

        const influxReq = http.request(url, options, (influxRes) => {
            let data = '';
            
            influxRes.on('data', (chunk) => {
                data += chunk;
            });
            
            influxRes.on('end', () => {
                const parsedData = parseInfluxCSV(data);
                res.json(parsedData);
            });
        });

        influxReq.on('error', (error) => {
            console.error('InfluxDB Error:', error);
            // Return empty data instead of error
            res.json({});
        });

        influxReq.write(query);
        influxReq.end();
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to parse InfluxDB CSV response
function parseInfluxCSV(csv) {
    const lines = csv.trim().split('\n');
    const data = {};
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('#') || line.startsWith(',')) continue;
        
        const values = line.split(',');
        if (values.length < 6) continue;
        
        const field = values[7]; // _field column
        const value = parseFloat(values[5]); // _value column
        
        if (field && !isNaN(value)) {
            data[field] = value;
        }
    }
    
    return data;
}

// Start server
app.listen(PORT, () => {
    console.log(`🌤️  Server berjalan di http://localhost:${PORT}`);
    console.log(`📊 Monitoring Real-Time: http://localhost:${PORT}/monitoring`);
    console.log(`🔮 Prediksi Cuaca: http://localhost:${PORT}/prediksi`);
    console.log(`\nTekan CTRL+C untuk menghentikan server`);
});
