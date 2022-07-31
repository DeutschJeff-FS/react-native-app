import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  pageTitle: {
    fontSize: 36,
    color: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#00b4d8",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
  },
  film: {
    padding: 10,
    backgroundColor: "#5fa8d3",
    borderRadius: 5,
    marginVertical: 5,
  },
  movieTitle: {
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cae9ff",
    padding: 10,
    marginBottom: 20,
    width: "80%",
    borderRadius: 10,
  },
  input: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#1b4965",
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    width: "100%",
  },
  addButton: {
    padding: 10,
    backgroundColor: "#1b4965",
    borderRadius: 5,
    marginVertical: 10,
  },
  logSignButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
