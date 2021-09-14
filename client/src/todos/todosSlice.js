import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


//getTodosAsync  icerisindeki createAsynThunk islemi backend tarafindan api dan verileri almak icin kullandigimiz yapidir.
// senkron olmayan yapilari kullanirken AsyncThunk kullanilir
//axios ve fetch iki kullanimida yapiyorum( pekistirme amacli)
export const getTodosAsync= createAsyncThunk('todos/getTodosAsync/', async () => {
  const res = await fetch('http://localhost:7000/todos');
  return await res.json();
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(data) => {
  const res = await axios.post('http://localhost:7000/todos', data) //data yazma sebebimiz post bodyi gondermemiz gerektiginden
  return res.data; //axios kullanimi fetch ile darklari gorulsun diye kullanildi
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async (data, id) =>{
  const res = await axios.patch('http://localhost:7000/todos/${id}', data);
  return res.data;
})



export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: 'all',
  },

  reducers: {
    // addTodo: (state, action) => {
    //     state.items.push(action.payload); //state icerisindeki items a action payload ile belirlenen verileri push la
    // }, ***************** backend kismindan veri cekilecegi icin orda bu tanimlar mevcut o yuzden tekrar kullanmaya gerek yok 

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

  //extreReducers kavramida backend ten gelen verilerin uc halini kullanabilmek icin kullanilir.
  // panding: verileri beklerken
  // fullfield: islem gerceklestiginde
  //rejected: islem reddedildiginde 

  extraReducers: { 
    //get todos
    [getTodosAsync.pending] : (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled] : (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected] : (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //add todo
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload)
    },
    //toggle todo
    [toggleTodoAsync.fulfilled]
  }
});

export const selectTodos = (state) => state.todos.items; //selector kullanirken surekli bu ifadeyi yazmak yerine 
//bir defa burada tanimlayip export edip daha kisa olacak sekilde bunu tanimlayip kullanabiliriz.

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
