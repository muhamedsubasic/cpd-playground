import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../lab2/styles";

export default function Index() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [running]);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Seconds: {seconds}</Text>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => setRunning((r) => !r)}>
          <Text style={styles.buttonText}>{running ? "Pause" : "Resume"}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setSeconds(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
