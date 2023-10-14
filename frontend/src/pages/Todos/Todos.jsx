import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTodoAdd,
    getTodoAll,
    getTodoDelete,
    getTodoEdit,
} from "../../store/todoSlice";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import { useForm, useFormState } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        id: "",
        todoName: "",
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (id, todo) => {
        setShow(true);

        setSelectedItem({
            _id: id,
            todoName: todo,
        });
    };

    const dispatch = useDispatch();
    const { todoAll, todoAdd } = useSelector((state) => state.todo);

    useEffect(() => {
        if (todoAll.length === 0) {
            dispatch(getTodoAll());
        }
    }, []);

    // handle delete
    const handleDelete = (id) => {
        console.log("===", id);
        dispatch(getTodoDelete(id));
        setShow(false);
    };

    // handle edit
    const handleEdit = (e, item) => {
        console.log("edit clicked!", item);
        setOpen(true);
        setValue("todoName", item.todo);
        setValue("status", item.completed);
        setValue("_id", item._id);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValue,
        formState: {
            errors,
            isDirty,
            isSubmitting,
            touchedFields,
            submitCount,
        },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data) => {
        const item = {
            todo: data.todoName,
            completed: data.status,
            userId: uuidv4(),
            _id: data?._id ? data._id : null,
        };
        if (data._id) {
            dispatch(getTodoEdit(item));
        } else {
            dispatch(getTodoAdd(item));
        }

        reset();
    };

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-sm-12 d-flex flex-wrap justify-content-between align-items-center ">
                            <h4 className="fw-bold mb-0">Todos</h4>
                            <Button
                                className="btn btn-success"
                                onClick={() => setOpen(!open)}
                                aria-controls="add-todo-item"
                                aria-expanded={open}
                            >
                                Add Item
                            </Button>
                        </div>
                        <div className="col-sm-12 pt-3">
                            <Collapse in={open}>
                                <div id="add-todo-item" className="">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="ms-auto w-100"
                                    >
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Todo Name
                                            </label>
                                            <input
                                                {...register("todoName", {
                                                    required: true,
                                                    minLength: 1,
                                                    maxLength: 20,
                                                })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Status
                                            </label>
                                            <select
                                                className="form-control"
                                                {...register("status", {
                                                    required: true,
                                                    maxLength: 20,
                                                })}
                                            >
                                                <option value="">Select</option>
                                                <option value="false">
                                                    Pending
                                                </option>
                                                <option value="true">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Table striped bordered hover className="w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Todo Name</th>
                                        <th>User Id</th>
                                        <th>Status</th>
                                        <th width="12%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todoAll.map((list, index) => {
                                        // console.log("list = ", list);
                                        return (
                                            <tr key={list._id}>
                                                <td>{list._id}</td>
                                                <td>{list.todo}</td>
                                                <td>{list.userId}</td>
                                                <td
                                                    className={
                                                        list.completed === true
                                                            ? "text-success"
                                                            : "text-warning"
                                                    }
                                                >
                                                    {list.completed === true
                                                        ? "Completed"
                                                        : "Pending"}
                                                </td>
                                                <td>
                                                    <Link
                                                        className="btn btn-sm btn-primary py-0 me-3"
                                                        onClick={(e) =>
                                                            handleEdit(e, list)
                                                        }
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        className="btn btn-sm btn-danger py-0"
                                                        onClick={(e) =>
                                                            handleShow(
                                                                list._id,
                                                                list.todo
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                selecteditem={selectedItem}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Todo Item </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{" "}
                    <span className="fw-bold">
                        #{selectedItem._id} {selectedItem.todoName}
                    </span>{" "}
                    todo item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={(e) => handleDelete(selectedItem._id)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Todos;
