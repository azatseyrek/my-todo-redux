import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [
            {
            id: "1",
            title: 'learn React',
            completed: true
        },
        {
            id:"2",
            title:'read a book',
            completed: false

        }
    
    
    ],
    },

    reducers: {

        addTodo: (state, action) => {
            state.items.push(action.payload); //state icerisindeki items a action payload ile belirlenen verileri push la
        },

        toggle: (state, action) => {
            const {id} = action.payload //toggle(isaretleme) icin tiklananin idsini al

            const item = state.items.find(item => item.id === id) //tiklanan degerli id yi bulup almak icin

            item.completed = !item.completed;
        }

    },

});
export const {addTodo, toggle} = todosSlice.actions;

export default todosSlice.reducer;