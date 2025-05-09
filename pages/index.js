import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        // The API URL with the Visual Crossing API Key
        const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/denmark/today?unitGroup=us&key=2J54LYG6Z5E737LLZPANNC3BQ&contentType=json';
        
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error fetching weather data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading) return <div className={styles.container}><h1>Loading weather data...</h1></div>;
  if (error) return <div className={styles.container}><h1>Error: {error}</h1></div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Weather Forecast for {weatherData?.resolvedAddress || 'Denmark'}
        </h1>

        {weatherData && (
          <div className={styles.weatherInfo}>
            <div className={styles.currentConditions}>
              <h2>Current Conditions</h2>
              <div className={styles.conditionsGrid}>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Temperature</p>
                  <p className={styles.value}>{weatherData.currentConditions.temp}°F</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Feels Like</p>
                  <p className={styles.value}>{weatherData.currentConditions.feelslike}°F</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Conditions</p>
                  <p className={styles.value}>{weatherData.currentConditions.conditions}</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Humidity</p>
                  <p className={styles.value}>{weatherData.currentConditions.humidity}%</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Wind</p>
                  <p className={styles.value}>{weatherData.currentConditions.windspeed} mph</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Visibility</p>
                  <p className={styles.value}>{weatherData.currentConditions.visibility} miles</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Sunrise</p>
                  <p className={styles.value}>{weatherData.currentConditions.sunrise}</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Sunset</p>
                  <p className={styles.value}>{weatherData.currentConditions.sunset}</p>
                </div>
              </div>
            </div>
            
            <div className={styles.forecastSection}>
              <h2>Today's Forecast</h2>
              <p className={styles.description}>{weatherData.description}</p>
              
              <div className={styles.dayInfo}>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>High</p>
                  <p className={styles.value}>{weatherData.days[0].tempmax}°F</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Low</p>
                  <p className={styles.value}>{weatherData.days[0].tempmin}°F</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Precipitation</p>
                  <p className={styles.value}>{weatherData.days[0].precip} in</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>UV Index</p>
                  <p className={styles.value}>{weatherData.days[0].uvindex}</p>
                </div>
              </div>
            </div>
            
            <div className={styles.hourlyForecast}>
              <h2>Hourly Forecast</h2>
              <div className={styles.hourlyGrid}>
                {weatherData.days[0].hours
                  .filter((_, index) => index % 3 === 0) // Show every 3 hours to save space
                  .map((hour, index) => (
                    <div key={index} className={styles.hourCard}>
                      <p className={styles.hourTime}>{hour.datetime.slice(0, 5)}</p>
                      <p className={styles.hourTemp}>{hour.temp}°F</p>
                      <p className={styles.hourConditions}>{hour.conditions}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        <footer className={styles.footer}>
          <p>Powered by Visual Crossing Weather API</p>
          <p>Created for OpenShift sandbox environment</p>
        </footer>
      </main>
    </div>
  );
}
