import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false); // Single boolean state for the like button

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

      {/* Counter Action Buttons */}
      <View style={styles.row}>
        <Pressable style={[styles.button, count === 0 && { opacity: 0.5 }]} onPress={decrement} disabled={count === 0}>
          <Text style={[styles.buttonText, count === 0 && styles.muted]}>−1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Pressable style={[styles.button, liked && { backgroundColor: "green" }]} onPress={() => setLiked(!liked)}>
        <Text style={styles.buttonText}>{liked ? "Liked (13)" : "Like (12)"}</Text>
      </Pressable>
    </View>
  );
}
