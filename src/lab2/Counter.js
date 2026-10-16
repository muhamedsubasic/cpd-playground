import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export default function Counter() {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount((c) => Math.max(0, c - 1));
  };

  const increment = () => {
    setCount((c) => c + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Count: {count}</Text>

      <View style={styles.row}>
        <Pressable style={[styles.button, count === 0 && { backgroundColor: "grey" }]} onPress={decrement} disabled={count === 0}>
          <Text style={styles.buttonText}>−1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
