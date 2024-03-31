import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
    },
    removeTodos: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodos: (state, action) => {
      const { id, priority, status } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.priority = priority;
        todoToUpdate.status = status;
      }
    },
    completeTodos: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    },
    progressTodos: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.progress = true;
      }
    },
    deployTodos: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.deployed = true;
      }
    },
    deferTodos: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.deferred = true;
      }
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodos, progressTodos, deployTodos, deferTodos } = todoSlice.actions;

export default todoSlice.reducer;

