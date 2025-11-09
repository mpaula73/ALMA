import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

interface EventItem {
  id: string;
  name: string;
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  /** 🔁 Cargar eventos guardados */
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("events");
        if (saved) setEvents(JSON.parse(saved));
      } catch (err) {
        console.error("Error cargando eventos:", err);
      }
    })();
  }, []);

  /** 💾 Guardar eventos cada vez que cambian */
  useEffect(() => {
    AsyncStorage.setItem("events", JSON.stringify(events)).catch(console.error);
  }, [events]);

  /** 📅 Seleccionar día */
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  /** ➕ Agregar o editar evento */
  const handleSaveEvent = () => {
    if (!eventName.trim()) return;

    setEvents((prev) => {
      const newEvents = { ...prev };
      const dateEvents = newEvents[selectedDate] || [];

      if (editingEvent) {
        // editar evento existente
        newEvents[selectedDate] = dateEvents.map((e) =>
          e.id === editingEvent.id ? { ...e, name: eventName } : e
        );
      } else {
        // crear nuevo evento
        newEvents[selectedDate] = [
          ...dateEvents,
          { id: Date.now().toString(), name: eventName },
        ];
      }

      return newEvents;
    });

    setEventName("");
    setEditingEvent(null);
    setModalVisible(false);
  };

  /** 🗑️ Eliminar evento */
  const handleDeleteEvent = (id: string) => {
    Alert.alert("Eliminar evento", "¿Deseas eliminar este evento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setEvents((prev) => {
            const newEvents = { ...prev };
            newEvents[selectedDate] = newEvents[selectedDate].filter(
              (e) => e.id !== id
            );
            return newEvents;
          });
        },
      },
    ]);
  };

  /** ✏️ Editar evento */
  const handleEditEvent = (event: EventItem) => {
    setEventName(event.name);
    setEditingEvent(event);
    setModalVisible(true);
  };

  const marked = Object.keys(events).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: "#E91E63",
      selected: selectedDate === date,
      selectedColor: "#F8BBD0",
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={{
          ...marked,
          [selectedDate]: { selected: true, selectedColor: "#E91E63" },
        }}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: "#E91E63",
          todayTextColor: "#E91E63",
          arrowColor: "#E91E63",
        }}
      />

      {selectedDate ? (
        <View style={styles.eventList}>
          <Text style={styles.eventHeader}>Eventos para {selectedDate}:</Text>

          {events[selectedDate]?.length ? (
            <FlatList
              data={events[selectedDate]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.eventRow}>
                  <Text style={styles.eventItem}>• {item.name}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleEditEvent(item)}>
                      <Text style={styles.edit}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
                      <Text style={styles.delete}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noEvents}>No hay eventos</Text>
          )}
        </View>
      ) : (
        <Text style={styles.selectText}>
          Selecciona una fecha para ver o agregar eventos
        </Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (!selectedDate)
            return Alert.alert("Selecciona una fecha primero");
          setEventName("");
          setEditingEvent(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editingEvent
                ? `Editar evento (${selectedDate})`
                : `Nuevo evento para ${selectedDate}`}
            </Text>
            <TextInput
              placeholder="Nombre del evento"
              style={styles.input}
              value={eventName}
              onChangeText={setEventName}
            />
            <Button
              title={editingEvent ? "Guardar cambios" : "Agregar"}
              color="#E91E63"
              onPress={handleSaveEvent}
            />
            <Button
              title="Cancelar"
              color="#777"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  selectText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  eventList: { marginTop: 20 },
  eventHeader: { fontSize: 18, fontWeight: "bold", color: "#E91E63" },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  eventItem: { fontSize: 16, flex: 1 },
  actions: { flexDirection: "row", gap: 10 },
  edit: { color: "#E91E63", fontWeight: "600" },
  delete: { color: "#d11a2a", fontWeight: "600" },
  noEvents: { marginTop: 5, fontSize: 16, color: "#777" },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#E91E63",
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  addButtonText: { color: "white", fontSize: 28 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E91E63",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
