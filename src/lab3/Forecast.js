import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../lab2/styles";
import { useFetch } from "./useFetch";

function forecastUrl(city) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=temperature_2m_min,temperature_2m_max&forecast_days=3&timezone=auto`;
}

export default function Forecast({ city }) {
  const { data, loading, error } = useFetch(forecastUrl(city));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>3-Day Forecast</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={{ color: "red" }}>Error: {error}</Text>
      ) : data?.daily ? (
        data.daily.time.map((date, i) => (
          <Text key={date} style={styles.muted}>
            {date} {data.daily.temperature_2m_min[i]} °C / {data.daily.temperature_2m_max[i]} °C
          </Text>
        ))
      ) : (
        <Text style={styles.muted}>No forecast data available.</Text>
      )}
    </View>
  );
}
