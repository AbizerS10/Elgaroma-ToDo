import {
  ADD_TASK,
  CLEAR_ALL,
  MARK_AS_COMPLETED,
  MARK_AS_UNCOMPLETED,
  SELECT_TASK,
} from "../types/TaskTypes";

const initialState = {
  tasks: [],
  selectedTask: null,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case SELECT_TASK:
      return { ...state, selectedTask: action.payload };
    case MARK_AS_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) return { ...task, isCompleted: true };
          return task;
        }),
      };
    case MARK_AS_UNCOMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload)
            return { ...task, isCompleted: false };
          return task;
        }),
      };
    case CLEAR_ALL:
      return { ...state, tasks: [] };
    default:
      return state;
  }
};

export default TaskReducer;
