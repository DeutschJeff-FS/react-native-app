import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../App.styles";

export default function Film({ route, navigation }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  const { id } = route.params.id;

  const onChangeTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const onChangeDirector = (value) => {
    setValues({ ...values, director: value });
  };

  const onChangeReleaseYear = (value) => {
    setValues({ ...values, releaseYear: value });
  };

  const getFilm = async () => {
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({ values });
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getFilm();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const updateFilm = async () => {
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films/${id}`, {
        method: `PATCH`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })
        .then((response) => {
          response.json();
          navigation.push("FilmList");
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFilm = async () => {
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films/${id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })
        .then((response) => {
          response.json();
          navigation.push("FilmList");
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FilmList")}>
        <Text style={styles.buttonText}>Film List</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Film Info</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"Film Title"}
          onChangeText={(value) => onChangeTitle(value)}
          value={values.title}
          style={styles.input}
        />
        <TextInput
          placeholder={"Film Director"}
          onChangeText={(value) => onChangeDirector(value)}
          value={values.director}
          style={styles.input}
        />
        <TextInput
          placeholder={"Film Release Year"}
          onChangeText={(value) => onChangeReleaseYear(value)}
          value={values.releaseYear}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={updateFilm} style={styles.addButton}>
            <Text style={styles.buttonText}>{loading ? "Waiting" : "Edit Film Info"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteFilm} style={styles.addButton}>
            <Text style={styles.buttonText}>{loading ? "Waiting..." : "Delete Film"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
