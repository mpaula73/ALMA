import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Por ahora, sin validación: simplemente navega
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenida a tu app de acompañamiento, Alma 💕</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar sesión" onPress={handleLogin} color="#e48bb1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff5f8",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    color: "#e48bb1",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e48bb1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
});
