import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import styles from "../../App.styles";
import FilmFlatList from "../components/FilmFlatList";

function FilmListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  const onChangeTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const onChangeDirector = (value) => {
    setValues({ ...values, director: value });
  };

  const onChangeReleaseYear = (value) => {
    setValues({ ...values, releaseYear: value });
  };

  useEffect(() => {
    getFilms();
  }, []);

  const getFilms = async () => {
    try {
      const response = await fetch(`https://demo-film-database.herokuapp.com/api/v1/films`);
      const json = await response.json();
      setFilms(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveFilm = async () => {
    try {
      setLoading(true);
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      })
        .then((response) => {
          setLoading(false);
          response.text();
          console.log(values);
        })
        .then(() => getFilms());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack("HomeScreen")}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Movie List</Text>

      <FlatList
        data={films}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.film} onPress={() => navigation.navigate("Film")}>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"Film Title"}
          onChangeText={(value) => onChangeTitle(value)}
          style={styles.input}
        />
        <TextInput
          placeholder={"Film Director"}
          onChangeText={(value) => onChangeDirector(value)}
          style={styles.input}
        />
        <TextInput
          placeholder={"Film Release Year"}
          onChangeText={(value) => onChangeReleaseYear(value)}
          style={styles.input}
        />
        <TouchableOpacity onPress={saveFilm} style={styles.addButton}>
          <Text style={styles.buttonText}>{loading ? `Waiting` : `Add Film`}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default FilmListScreen;
