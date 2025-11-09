import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function HistoryScreen() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const folderUri = `${FileSystem.documentDirectory}history/`;

  useEffect(() => {
    const init = async () => {
      try {
        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        const saved = await AsyncStorage.getItem("history_files");
        if (saved) setFiles(JSON.parse(saved));
      } catch (e) {
        console.error("Error initializing history:", e);
      }
    };
    init();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled || !result.assets?.length) return;

      const file = result.assets[0];
      const newPath = folderUri + file.name;

      await FileSystem.copyAsync({ from: file.uri, to: newPath });

      const newFiles = [...files, { name: file.name, uri: newPath }];
      setFiles(newFiles);
      await AsyncStorage.setItem("history_files", JSON.stringify(newFiles));
    } catch (e) {
      console.error("Error picking document:", e);
    }
  };

  const openFile = (file: any) => {
    setSelectedFile(file);
  };

  if (selectedFile) {
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();

    // PDF o imagen
    if (extension === "pdf" || ["jpg", "jpeg", "png"].includes(extension)) {
      return (
        <View style={{ flex: 1 }}>
          <Button title="← Volver" onPress={() => setSelectedFile(null)} />
          <WebView source={{ uri: selectedFile.uri }} style={{ flex: 1 }} />
        </View>
      );
    }

    // Otros archivos (docx, txt, etc.)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se puede previsualizar este tipo de archivo.</Text>
        <Button title="← Volver" onPress={() => setSelectedFile(null)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Subir documento" onPress={pickDocument} />
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openFile(item)}>
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.name.match(/\.(jpg|jpeg|png)$/i) ? (
                <Image source={{ uri: item.uri }} style={{ width: 40, height: 40, marginRight: 10 }} />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    backgroundColor: "#eee",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>📄</Text>
                </View>
              )}
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
