# Weather Forecast App

A simple web application that displays weather forecast data from the Visual Crossing Weather API.

## Features

- Displays current weather conditions for Denmark
- Shows today's forecast with high/low temperatures
- Provides hourly forecast data
- Responsive design for all device sizes

## Technology Stack

- Next.js - React framework
- Axios - HTTP client for API requests
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (version 14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ErikGJacobsen/WeatherForecast.git
   ```

2. Navigate to the project directory:
   ```
   cd WeatherForecast
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is designed to be deployed on OpenShift. Build the application with:

```
npm run build
```

Then start the production server:

```
npm start
```

## API Information

This application uses the Visual Crossing Weather API with the following endpoint:
```
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/denmark/today?unitGroup=us&key=2J54LYG6Z5E737LLZPANNC3BQ&contentType=json
```

## License

MIT
