import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../App.styles";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Film List Homepage</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FilmList")}>
        <Text style={styles.buttonText}>Film List</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default HomeScreen;
