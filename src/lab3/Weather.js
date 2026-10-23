import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../lab2/styles";

const CITIES = [
  { name: "Sarajevo", latitude: 43.86, longitude: 18.41 },
  { name: "Mostar", latitude: 43.34, longitude: 17.81 },
  { name: "Banja Luka", latitude: 44.77, longitude: 17.19 },
  { name: "Tuzla", latitude: 44.54, longitude: 18.67 },
  { name: "Zenica", latitude: 44.2, longitude: 17.91 },
  { name: "Bihać", latitude: 44.82, longitude: 15.87 },
];

function currentUrl(city) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m`;
}

export default function Weather() {
  const [city, setCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(currentUrl(city));

        if (!res.ok) {
          throw new Error(`Request failed: HTTP ${res.status}`);
        }

        const json = await res.json();

        if (!ignore) {
          setWeather({
            temperature: json.current.temperature_2m,
            wind: json.current.wind_speed_10m,
          });
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load weather.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [city]);

  function selectCity(selectedCity) {
    if (selectedCity.name === city.name) {
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setCity(selectedCity);
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        style={{ flexGrow: 0, flexShrink: 0 }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingRight: 8,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {CITIES.map((item) => {
          const selected = item.name === city.name;

          return (
            <Pressable key={item.name} style={[styles.button, !selected && { backgroundColor: "#E6EEF7" }]} onPress={() => selectCity(item)}>
              <Text style={[styles.buttonText, !selected && { color: "#003A6D" }]}>{item.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.card}>
        <Text style={styles.title}>{city.name}</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: "red" }}>Error: {error}</Text>
        ) : weather ? (
          <>
            <Text style={styles.title}>{weather.temperature} °C</Text>
            <Text style={styles.muted}>Wind {weather.wind} km/h</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}
