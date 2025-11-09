import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function ConnectScreen() {
  const [ip, setIp] = useState("192.168.1.45"); // IP local de tu Raspberry
  const [status, setStatus] = useState("Desconectado");

  const connectToAlma = async () => {
    try {
      setStatus("Conectando...");
      const response = await fetch(`http://${ip}:5000/status`);
      const data = await response.json();
      if (data.status === "online") {
        setStatus(`Conectado a ${data.name} ✅`);
      } else {
        setStatus("No se pudo conectar ❌");
      }
    } catch (e) {
      setStatus("Error de conexión ❌");
      console.error(e);
    }
  };

  const sendToAlma = async (text: string) => {
    try {
      await fetch(`http://${ip}:5000/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
    } catch (e) {
      console.error("Error enviando mensaje:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conexión con Alma 🤖</Text>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={setIp}
        placeholder="IP de la Raspberry Pi"
      />
      <Button title="Conectarse" onPress={connectToAlma} />
      <Text style={styles.status}>{status}</Text>

      {status.includes("Conectado") && (
        <Button
          title="Haz que Alma hable"
          onPress={() => sendToAlma("Hola, soy tu asistente Alma.")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  status: { marginTop: 10, fontSize: 16 },
});
