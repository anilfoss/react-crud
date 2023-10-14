import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos/Todos";
import AddTodo from "./pages/AddTodo/AddTodo";
import Todo from "./pages/Todo/Todo";

const Navigation = () => {
    return (
        <>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Todos />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/add-todo" element={<AddTodo />} />
                    <Route path="/todos/:id" element={<Todo />} />
                </Routes>
            </main>
        </>
    );
};

export default Navigation;
