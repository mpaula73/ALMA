import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

export default function ExerciseScreen() {
  const [selectedTrimester, setSelectedTrimester] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videosByTrimester = {
    1: [
      {
        id: "t1-1",
        title: "30 Min – Primer trimestre: rutina prenatal",
        youtubeId: "Ia6dNwVs1M8",
      },
      {
        id: "t1-2",
        title: "35 Min – Entreno para principiantes embarazadas",
        youtubeId: "quMHccQuH6A",
      },
      {
        id: "t1-3",
        title: "30 Min – Cuerpo completo embarazo 1º trimestre",
        youtubeId: "4xH3DCHFyOo",
      },
    ],
    2: [
      {
        id: "t2-1",
        title: "30 Min – Fuerza embarazo 2º trimestre",
        youtubeId: "dnE4ZqXrc5k",
      },
      {
        id: "t2-2",
        title: "20 Min – Cardio sin sentadillas ni zancadas",
        youtubeId: "Qd4QBIoKrJM",
      },
      {
        id: "t2-3",
        title: "30 Min – Preparación para parto, seguro 1º-3º trimestre",
        youtubeId: "lKx0sOz31C4",
      },
    ],
    3: [
      {
        id: "t3-1",
        title: "35 Min – Pilates embarazo 3º trimestre",
        youtubeId: "qkhLev3bKd0",
      },
      {
        id: "t3-2",
        title: "Relajación y estiramientos 3º trimestre",
        youtubeId: "uOQBTaPVk9U",
      },
      {
        id: "t3-3",
        title: "Estiramientos espalda embarazo 3º trimestre",
        youtubeId: "zQqj3Jv9FS0",
      },
    ],
  };

  const currentVideos = videosByTrimester[selectedTrimester as 1 | 2 | 3];

  const renderVideo = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedVideo(item.youtubeId)}
    >
      <WebView
        source={{
          uri: `https://img.youtube.com/vi/${item.youtubeId}/0.jpg`,
        }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ejercicios y bienestar</Text>
      <Text style={styles.subheader}>
        Videos recomendados para tu etapa del embarazo 💕
      </Text>

      <View style={styles.trimesterSelector}>
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.trimesterButton,
              selectedTrimester === num && styles.trimesterButtonActive,
            ]}
            onPress={() => setSelectedTrimester(num)}
          >
            <Text
              style={[
                styles.trimesterText,
                selectedTrimester === num && styles.trimesterTextActive,
              ]}
            >
              {num}º Trimestre
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={currentVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal del video */}
      <Modal
        visible={!!selectedVideo}
        animationType="slide"
        onRequestClose={() => setSelectedVideo(null)}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <TouchableOpacity
            onPress={() => setSelectedVideo(null)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Cerrar</Text>
          </TouchableOpacity>

          {selectedVideo && (
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${selectedVideo}?autoplay=1&playsinline=1`,
              }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={true}
              startInLoadingState={true}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fde4ec",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#d81b60",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#880e4f",
    marginBottom: 16,
  },
  trimesterSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  trimesterButton: {
    backgroundColor: "#f8bbd0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trimesterButtonActive: {
    backgroundColor: "#ec407a",
  },
  trimesterText: {
    color: "#ad1457",
    fontWeight: "600",
  },
  trimesterTextActive: {
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  thumbnail: {
    width: width - 52,
    height: 180,
    borderRadius: 10,
    backgroundColor: "#f8bbd0",
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#ad1457",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 6,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
});
