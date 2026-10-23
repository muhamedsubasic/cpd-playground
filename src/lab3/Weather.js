import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../lab2/styles";
import Forecast from "./Forecast";
import Temperature from "./Temperature";
import { UnitsContext } from "./UnitsContext";
import { useFetch } from "./useFetch";

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
  const [unit, setUnit] = useState("C");

  const { data, loading, error } = useFetch(currentUrl(city));

  function selectCity(selectedCity) {
    if (selectedCity.name === city.name) {
      return;
    }

    setCity(selectedCity);
  }

  return (
    <UnitsContext value={unit}>
      <View style={styles.screen}>
        <View style={styles.row}>
          {["C", "F"].map((item) => {
            const selected = unit === item;

            return (
              <Pressable
                key={item}
                style={[
                  styles.button,
                  !selected && {
                    backgroundColor: "#E6EEF7",
                  },
                ]}
                onPress={() => setUnit(item)}
              >
                <Text style={[styles.buttonText, !selected && { color: "#003A6D" }]}>°{item}</Text>
              </Pressable>
            );
          })}
        </View>

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
              <Pressable
                key={item.name}
                style={[
                  styles.button,
                  !selected && {
                    backgroundColor: "#E6EEF7",
                  },
                ]}
                onPress={() => selectCity(item)}
              >
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
          ) : data?.current ? (
            <>
              <Temperature celsius={data.current.temperature_2m} style={styles.title} />

              <Text style={styles.muted}>Wind {data.current.wind_speed_10m} km/h</Text>
            </>
          ) : (
            <Text style={styles.muted}>No weather data available.</Text>
          )}
        </View>

        <Forecast city={city} />
      </View>
    </UnitsContext>
  );
}
