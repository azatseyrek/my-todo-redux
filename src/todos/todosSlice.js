import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
    
    ],
    activeFilter: 'all',
  },

  reducers: {
    addTodo: (state, action) => {
        state.items.push(action.payload); //state icerisindeki items a action payload ile belirlenen verileri push la
    },

    toggle: (state, action) => {
      const { id } = action.payload; //toggle(isaretleme) icin tiklananin idsini al

      const item = state.items.find((item) => item.id === id); //tiklanan degerli id yi bulup almak icin

      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter(item => item.id !== id);

      state.items = filtered;
    },

    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearCompleted: (state, action) => { 
      const filterCompleted = state.items.filter((item )=> item.completed === false);
      state.items = filterCompleted;

    }
  },
});
export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
