import { useContext } from "react";
import { Text } from "react-native";
import { styles } from "../lab2/styles";
import { UnitsContext } from "./UnitsContext";

export default function Temperature({ celsius, style }) {
  const unit = useContext(UnitsContext);

  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;

  return (
    <Text style={style || styles.muted}>
      {value.toFixed(1)} °{unit}
    </Text>
  );
}
