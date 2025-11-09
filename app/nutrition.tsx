import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

export default function NutritionScreen() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const articles = [
    {
      id: "1",
      title: "Pregnancy Nutrition Tips",
      source: "JM Nutrition",
      image:
        "https://www.julienutrition.com/wp-content/uploads/2022/08/pregnancy-nutrition.jpg",
      url: "https://www.julienutrition.com/pregnancy-nutrition-tips/",
    },
    {
      id: "2",
      title: "Pregnancy Nutrition: What to Eat and Foods to Avoid",
      source: "Matteo Silva Osteopata",
      image:
        "https://www.matteosilvaosteopata.com/wp-content/uploads/2021/09/nutrition-in-pregnancy.jpg",
      url: "https://www.matteosilvaosteopata.com/en/nutrition-in-pregnancy-what-to-eat-and-foods-to-avoid/",
    },
    {
      id: "3",
      title: "Pregnancy Diet and Nutrition Information",
      source: "EatingWell",
      image:
        "https://www.eatingwell.com/thmb/udqRuFuzyKqsr9DJT9f5uVhB9U4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pregnancy-diet-nutrition-2000-dc522c6b8c3548439d4a5f77e7de338d.jpg",
      url: "https://www.eatingwell.com/article/8767/pregnancy-diet-and-nutrition-information/",
    },
    {
      id: "4",
      title: "Nutrition During Pregnancy",
      source: "Phoenix Children’s Hospital",
      image:
        "https://phoenixchildrens.org/sites/default/files/styles/hero_image_desktop/public/2023-07/pregnancy-nutrition-hero.jpg",
      url: "https://phoenixchildrens.org/specialties-conditions/nutrition-during-pregnancy",
    },
    {
      id: "5",
      title: "A Comprehensive Guide to Pregnancy Nutrition",
      source: "Huckleberry Care Blog",
      image:
        "https://huckleberrycare.com/static/1cbbfb49b2633bb6eea9aa4f1a06b1e2/9fba3/pregnancy-nutrition-guide.webp",
      url: "https://huckleberrycare.com/blog/a-comprehensive-guide-to-pregnancy-nutrition",
    },
  ];

  const renderArticle = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedArticle(item.url)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.source}>{item.source}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nutrición y bienestar</Text>
      <Text style={styles.subheader}>
        Consejos confiables para una alimentación saludable 💕
      </Text>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={renderArticle}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={!!selectedArticle}
        animationType="slide"
        onRequestClose={() => setSelectedArticle(null)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableOpacity
            onPress={() => setSelectedArticle(null)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>

          {selectedArticle && (
            <WebView
              source={{ uri: selectedArticle }}
              style={{ flex: 1 }}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
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
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: width - 32,
    height: 180,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ad1457",
    marginBottom: 4,
  },
  source: {
    fontSize: 13,
    color: "#880e4f",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#ec407a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
