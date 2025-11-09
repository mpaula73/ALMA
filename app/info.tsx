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

export default function InfoScreen() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const articles = [
    {
      id: "1",
      title: "Cuidados prenatales: lo que debes saber",
      source: "Organización Mundial de la Salud (OMS)",
      image:
        "https://www.who.int/images/default-source/mca/antenatal-care.jpg?sfvrsn=3f8f3c4_4",
      url: "https://www.who.int/news/item/07-11-2016-new-guidelines-on-antenatal-care-for-a-positive-pregnancy-experience",
    },
    {
      id: "2",
      title: "Síntomas del embarazo: lo que ocurre primero",
      source: "Mayo Clinic",
      image:
        "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2019/12/19/17/04/my01120_im02239_mcdc7_pregnancy-8col.jpg",
      url: "https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/symptoms-of-pregnancy/art-20043853",
    },
    {
      id: "3",
      title: "Atención prenatal y pruebas: lo que debes saber",
      source: "NICHD",
      image:
        "https://www.nichd.nih.gov/sites/default/files/styles/scale_crop_1440x810/public/preconception-prenatal-care.jpg",
      url: "https://www.nichd.nih.gov/health/topics/factsheets/preconceptioncare",
    },
    {
      id: "4",
      title: "Nutrición y embarazo: impacto en la madre y el bebé",
      source: "PAHO/OMS",
      image:
        "https://www.paho.org/sites/default/files/styles/hero_image_desktop/public/2023-07/pregnancy-nutrition-woman.jpg",
      url: "https://www.paho.org/en/topics/maternal-health",
    },
    {
      id: "5",
      title: "Embarazo saludable: bienestar general",
      source: "Office on Women’s Health (EE.UU.)",
      image:
        "https://www.womenshealth.gov/sites/default/files/styles/scale_crop_1440x810/public/pregnancy-wellness.jpg",
      url: "https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests",
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
      <Text style={styles.header}>Información confiable</Text>
      <Text style={styles.subheader}>
        Aprende sobre tu embarazo con fuentes oficiales 💗
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
    backgroundColor: "#f8bbd0",
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
