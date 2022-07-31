import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import styles from "../../App.styles";

function FilmListScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState(null);
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
    setLoading(true);
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films`)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });
          setFilms(data);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveFilm = async () => {
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      }).then(() => getFilms());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveFilm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack("HomeScreen")}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Film List</Text>

      <FlatList
        data={films}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.film}
            onPress={() => navigation.navigate("Film", { _id: item._id })}
          >
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
        <TouchableOpacity onPress={(event) => handleSubmit(event)} style={styles.addButton}>
          <Text style={styles.buttonText}>{loading ? `Waiting` : `Add Film`}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default FilmListScreen;
