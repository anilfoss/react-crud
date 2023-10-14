import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../constants/constants";
import axios from "axios";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoAll: [],
        todoDelete: null,
        todoAdd: {},
        status: STATUS.IDLE,
    },
    reducers: {
        setTodoAll(state, action) {
            state.todoAll = action.payload;
        },
        setTodoDelete(state, action) {
            state.todoDelete = action.payload;
        },
        setTodoAdd(state, action) {
            state.todoAdd = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setTodoAll, setTodoDelete, setTodoAdd, setStatus } =
    todoSlice.actions;
export default todoSlice.reducer;

// all items
export function getTodoAll() {
    return async function getTodoAllThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const todoAllAPI = await axios.get(
                `http://localhost:4000/getAllTodo`
            );
            console.log("todoAllAPI = ", todoAllAPI);
            dispatch(setTodoAll(todoAllAPI.data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// add item
export function getTodoAdd(item) {
    return async function getTodoAddThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const todoAddAPI = await axios.post(
                `http://localhost:4000/add`,
                item
            );
            console.log("todo add = ", todoAddAPI);
            if (todoAddAPI?.status === 200) {
                dispatch(getTodoAll());
            }
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
// export function getTodoAdd(item) {
//     return async function getTodoAddThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING));
//         try {
//             const todoAddAPI = await axios.post(
//                 `http://localhost:4000/add`,
//                 item
//             );
//             console.log("todoAddAPI Adddd = ", todoAddAPI);
//             if (todoAddAPI?.status === 200) {
//                 dispatch(getTodoAll());
//             }
//             dispatch(setStatus(STATUS.IDLE));
//         } catch (error) {
//             console.error(error);
//             dispatch(setStatus(STATUS.ERROR));
//         }
//     };
// }

// edit item
export function getTodoEdit(item) {
    return async function getTodoEditThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const todoEditAPI = await axios.patch(
                `http://localhost:4000/edit`,
                item
            );
            console.log("edit item = ", item);
            console.log("todo edit = ", todoEditAPI);
            if (todoEditAPI?.status === 200) {
                dispatch(getTodoAll());
            }
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// delete item
export function getTodoDelete(id) {
    return async function getTodoDeleteThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const todoDeleteAPI = await axios.delete(
                `http://localhost:4000/deleteTodo/${id}`
            );
            console.log("todoDeleteAPI = ", todoDeleteAPI);
            if (todoDeleteAPI?.status === 200) {
                dispatch(getTodoAll());
            }
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
