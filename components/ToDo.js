import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TaskList from "./sub components/TaskList";
import Avatar4 from "./Avatars/Avatar4";
import Avatar3 from "./Avatars/Avatar3";
import Avatar2 from "./Avatars/Avatar2";
import Avatar1 from "./Avatars/Avatar1";
import { capitalize } from "./Utility Functions/utilities";
import AddTask from "./sub components/AddTask";
import DeleteIcon from "./Avatars/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ALL, SELECT_TASK } from "../store/types/TaskTypes";

const ToDo = () => {
  const { selectedTask } = useSelector((state) => state.TaskReducer);
  const dispatch = useDispatch();

  const deleteAllTasks = () => {
    dispatch({ type: CLEAR_ALL });
    dispatch({ type: SELECT_TASK, payload: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Details</Text>
      {selectedTask && (
        <View style={styles.taskContainer}>
          <Text style={styles.subHeadings}>Task Title</Text>
          <Text style={styles.title}>{capitalize(selectedTask?.title)}</Text>
          <Text style={styles.subHeadings}>Descriptions</Text>
          <Text style={styles.description}>{selectedTask?.description}</Text>
          <View style={styles.avatarContainer}>
            <Avatar1 />
            <Avatar2 />
            <Avatar3 />
            <Avatar4 />
          </View>
        </View>
      )}

      <View
        style={{
          ...styles.avatarContainer,
          justifyContent: "space-between",
          marginTop: 28,
          marginBottom: 16,
        }}
      >
        <Text style={styles.subHeadings}>Task List</Text>
        <TouchableOpacity onPress={deleteAllTasks}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
      <TaskList />

      {/* add task component */}
      <AddTask />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    paddingVertical: 60,
  },
  heading: {
    fontWeight: 500,
    fontSize: 16,
    textAlign: "center",
    color: "#111322",
    marginBottom: 40,
  },
  taskContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 15,
  },
  subHeadings: {
    fontWeight: 500,
    fontSize: 14,
    color: "#5D6B98",
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    color: "#1D2939",
  },
  description: {
    fontWeight: 500,
    fontSize: 14,
    color: "#111322",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    transform: [{ translateX: -20 }],
    width: 50,
    height: 50,
  },
});

export default ToDo;
