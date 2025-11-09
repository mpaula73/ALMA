import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirige automáticamente a login por ahora
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#e48bb1" />
      <Text style={{ marginTop: 16 }}>Cargando Alma...</Text>
    </View>
  );
}
