import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Información",
      route: "/info",
      icon: <Ionicons name="information-circle-outline" size={32} color="#880E4F" />,
    },
    {
      title: "Calendario",
      route: "/calendar",
      icon: <MaterialIcons name="calendar-today" size={32} color="#880E4F" />,
    },
    {
      title: "Historial",
      route: "/history",
      icon: <FontAwesome5 name="history" size={28} color="#880E4F" />,
    },
    {
      title: "Ejercicios",
      route: "/exercise",
      icon: <Ionicons name="barbell-outline" size={30} color="#880E4F" />,
    },
    {
      title: "Nutrición",
      route: "/nutrition",
      icon: <MaterialIcons name="restaurant-menu" size={30} color="#880E4F" />,
    },
    {
      title: "Conexión",
      route: "/connect",
      icon: <Ionicons name="people-outline" size={30} color="#880E4F" />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "#E91E63",
        }}
      >
        Bienvenida, Alma 🌸
      </Text>

      <FlatList
        data={menuItems}
        numColumns={2}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(item.route)}
            style={{
              flex: 1,
              backgroundColor: "#F8BBD0",
              margin: 8,
              paddingVertical: 25,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            {item.icon}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#880E4F",
                marginTop: 10,
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
