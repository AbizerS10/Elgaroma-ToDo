import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  MARK_AS_COMPLETED,
  MARK_AS_UNCOMPLETED,
  SELECT_TASK,
} from "../../store/types/TaskTypes";
import { capitalize } from "../Utility Functions/utilities";

const TaskList = () => {
  const { tasks } = useSelector((state) => state.TaskReducer);
  const dispatch = useDispatch();

  //mark task as completed handler
  const markTaskAsCompleted = (id) => {
    dispatch({ type: MARK_AS_COMPLETED, payload: id });
  };

  //mark task as uncompleted handler
  const markTaskAsUncompleted = (id) => {
    dispatch({ type: MARK_AS_UNCOMPLETED, payload: id });
  };

  //render a task in list
  const renderATask = (itemData) => {
    const item = itemData.item;
    return (
      <TouchableOpacity
        onPress={() => dispatch({ type: SELECT_TASK, payload: item })}
        style={styles.taskItem}
      >
        {item.isCompleted ? (
          <TouchableOpacity onPress={() => markTaskAsUncompleted(item.id)}>
            <MaterialIcon name={"check-circle"} color={"#7F56D9"} size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => markTaskAsCompleted(item.id)}>
            <MaterialIcon
              name="checkbox-blank-circle-outline"
              color={"#98A2B3"}
              size={25}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.taskTitle}>{capitalize(item.title)}</Text>
      </TouchableOpacity>
    );
  };

  return tasks.length !== 0 ? (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
      data={tasks}
      renderItem={renderATask}
    />
  ) : (
    <Text style={styles.taskTitle}>No Tasks Found</Text>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9FB",
    borderRadius: 16,
    height: 72,
    alignItems: "center",
  },
  taskTitle: {
    fontWeight: 500,
    fontSize: 16,
    color: "#30374F",
  },
});

export default TaskList;
