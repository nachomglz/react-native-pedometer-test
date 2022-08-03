import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Pedometer } from "expo-sensors";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [achieved, setAchieved] = useState(false);
  const [goal, setGoal] = useState(null);
  const [playing, setPlaying] = useState(false);

  const startGoal = () => {
    setPlaying(true);
  };
  const restartGoal = () => {
    setPlaying(false);
    setAchieved(false);
    setCounter(0);
    setGoal(0);
  };

  useEffect(() => {
    Pedometer.watchStepCount((result) => {
      setCounter(result.steps);
    });
  }, []);

  useEffect(() => {
    if (counter >= goal) {
      setAchieved(true);
    }
  }, [counter]);

  if (achieved)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 50 }}>
          Meta Conseguida!!!
        </Text>

        <Button title="Reiniciar" onPress={restartGoal} />
      </SafeAreaView>
    );

  if (playing)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 50 }}>Jugando</Text>

        <Text style={{ fontSize: 45 }}>Pasos: {counter}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 50 }}>
        Introduce la meta
      </Text>
      <TextInput
        style={{
          fontSize: 20,
          marginTop: 50,
          borderColor: "black",
          borderRadius: 7,
          borderStyle: "solid",
          borderWidth: 0.5,
          padding: 10,
          width: "80%",
          marginBottom: 40,
        }}
        onChangeText={(text) => {
          setGoal(parseInt(text));
        }}
      ></TextInput>

      <Button title="Empezar" onPress={startGoal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,
  },
});

export default App;
