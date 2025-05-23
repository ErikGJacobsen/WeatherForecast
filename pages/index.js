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
        // The API URL with the Visual Crossing API Key (using metric units)
        const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/denmark/today?unitGroup=metric&key=2J54LYG6Z5E737LLZPANNC3BQ&contentType=json';
        
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
        
        <div className={styles.appLayout}>

        {weatherData && (
          <div className={styles.weatherInfo}>
            <div className={styles.currentConditions}>
              <div className={styles.conditionsHeader}>
                <h2>Current Conditions</h2>
                <p className={styles.currentTime}>as of {weatherData.currentConditions.datetime}</p>
              </div>
              <div className={styles.conditionsGrid}>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Temperature</p>
                  <p className={styles.value}>{weatherData.currentConditions.temp}°C</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Feels Like</p>
                  <p className={styles.value}>{weatherData.currentConditions.feelslike}°C</p>
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
                  <p className={styles.value}>{weatherData.currentConditions.windspeed} km/h</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Visibility</p>
                  <p className={styles.value}>{weatherData.currentConditions.visibility} km</p>
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
                  <p className={styles.value}>{weatherData.days[0].tempmax}°C</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Low</p>
                  <p className={styles.value}>{weatherData.days[0].tempmin}°C</p>
                </div>
                <div className={styles.conditionItem}>
                  <p className={styles.label}>Precipitation</p>
                  <p className={styles.value}>{weatherData.days[0].precip} mm</p>
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
                      <p className={styles.hourTemp}>{hour.temp}°C</p>
                      <p className={styles.hourConditions}>{hour.conditions}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        </div>

        <div className={styles.claudeSection}>
          <h2>Built with Claude AI</h2>
          <p>This entire application was built with just a few simple instructions to Claude:</p>
          <div className={styles.instructionsBox}>
            <p><strong>Initial request:</strong> "I want to create a test web application - that should only show data from a weather forecast api."</p>
            <p><strong>API details:</strong> "The app will use the Visual Crossing Weather API endpoint for Denmark."</p>
            <p><strong>Unit change:</strong> "Change the units from US to metric."</p>
            <p><strong>Additional feature:</strong> "Add a time field for displaying the time besides current conditions headline."</p>
          </div>
          <p className={styles.claudeInfo}>Claude automatically created all necessary files, implemented the API integration, and styled the entire application without requiring any manual coding.</p>
        </div>

        <footer className={styles.footer}>
          <p>Powered by Visual Crossing Weather API</p>
          <p>Created for OpenShift sandbox environment</p>
          <p>Built with <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude AI</a> by Anthropic</p>
        </footer>
      </main>
    </div>
  );
}
