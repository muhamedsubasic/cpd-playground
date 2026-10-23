import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../lab2/styles";
import Temperature from "./Temperature";
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
          <View
            key={date}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            <Text style={styles.muted}>{date}</Text>

            <Temperature celsius={data.daily.temperature_2m_min[i]} />

            <Text style={styles.muted}>/</Text>

            <Temperature celsius={data.daily.temperature_2m_max[i]} />
          </View>
        ))
      ) : (
        <Text style={styles.muted}>No forecast data available.</Text>
      )}
    </View>
  );
}
