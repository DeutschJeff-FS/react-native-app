import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../App.styles";

export default function FilmFlatList() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [films, setFilms] = useState([]);

  const getFilms = async () => {
    setLoading(true);
    try {
      await fetch(`https://demo-film-database.herokuapp.com/api/v1/films`)
        .then((res) => res.json())
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

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getFilms();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <FlatList
      data={films}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.film} onPress={() => navigation.push("Film")}>
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
