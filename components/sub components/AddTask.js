import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TASK, SELECT_TASK } from "../../store/types/TaskTypes";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const AddTask = () => {
  const task = {
    title: "",
    description: "",
  };
  const [newTask, setNewTask] = useState(task);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const dispatch = useDispatch();

  //Add a new task handler
  const addTask = () => {
    if (newTask.title.length === 0) return;
    let add = {
      ...newTask,
      id:
        newTask.title.split(" ").join("_").substring(0, 5) +
        Math.floor(Math.random() * 100 + 1),
      isCompleted: false,
    };
    dispatch({ type: ADD_TASK, payload: add });
    dispatch({ type: SELECT_TASK, payload: add });
    close();
  };

  //close modal
  const close = () => {
    setAddTaskModal(false);
    setNewTask(task);
  };

  //text change handler
  const handleChange = (name, value) => {
    setNewTask((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.addTaskBtn}
        onPress={() => setAddTaskModal(true)}
      >
        <MaterialIcon name="plus" color={"#98A2B3"} size={25} />
        <Text style={styles.addTaskBtnText}>Add Task</Text>
      </TouchableOpacity>

      {/* add task modal */}
      <Modal
        visible={addTaskModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddTaskModal(false)}
      >
        <View style={styles.container}>
          <View style={styles.backdrop}></View>
          <View style={styles.main}>
            <Text style={{ fontSize: 20, color: "#5D6B98" }}>Add a Task</Text>
            <Text style={styles.subHeadings}>Task Title</Text>
            <TextInput
              onChangeText={(text) => handleChange("title", text)}
              style={styles.title}
            />
            <Text style={styles.subHeadings}>Description</Text>
            <TextInput
              onChangeText={(text) => handleChange("description", text)}
              style={styles.description}
              multiline={true}
              numberOfLines={5}
              maxLength={210}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={close} style={styles.buttons}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addTask} style={styles.buttons}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  main: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    padding: 15,
  },
  subHeadings: {
    fontWeight: 500,
    fontSize: 14,
    color: "#5D6B98",
  },
  title: {
    fontSize: 20,
    color: "#1D2939",
    borderWidth: 1,
    borderColor: "#98A2B3",
    borderRadius: 15,
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: "#111322",
    borderWidth: 1,
    borderColor: "#98A2B3",
    borderRadius: 15,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    width: "48%",
    backgroundColor: "#7F56D9",
    borderRadius: 15,
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  addTaskBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 72,
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9FB",
    borderRadius: 16,
    marginTop: 12,
  },
  addTaskBtnText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#ABB6C8",
  },
});

export default AddTask;
