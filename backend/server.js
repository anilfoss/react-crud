import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://anilkthink:Dp5NkGWQfGpFC1mu@cluster0.yxu1gtt.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const todo = mongoose.Schema({
    todo: String,
    completed: Boolean,
    userId: String,
});

const TodoModel = new mongoose.model("TodoModel", todo);

app.get("/getAllTodo", async (req, res) => {
    try {
        let allTOdo = await TodoModel.find({});
        return res.status(200).json(allTOdo);
    } catch (err) {
        console.log(err);
    }
});

// app.post("/add", async (req, res) => {
//     const { todo, completed, userId, _id } = req.body;
//     if (_id) {
//         await TodoModel.updateOne(
//             { _id: _id },
//             { todo: todo, completed: completed }
//         );
//         res.send({ message: "Data updated successfully" });
//     } else {
//         const data = new TodoModel({
//             todo: todo,
//             completed: completed,
//             userId: userId,
//         });
//         try {
//             await data.save();
//             res.send({ message: "Added Successfully" });
//         } catch (err) {
//             res.send(err);
//         }
//     }
// });

app.post("/add", async (req, res) => {
    const { todo, completed, userId } = req.body;

    const data = new TodoModel({
        todo: todo,
        completed: completed,
        userId: userId,
    });
    try {
        await data.save();
        res.send({ message: "Item added successfully!" });
    } catch (err) {
        res.send(err);
    }
});

app.patch("/edit", async (req, res) => {
    const { todo, completed, _id } = req.body;

    await TodoModel.updateOne(
        { _id: _id },
        { todo: todo, completed: completed }
    );
    res.send({ message: "Item updated successfully!" });
});

app.delete("/deleteTodo/:id", (req, res) => {
    TodoModel.deleteOne({ _id: req.params.id }).then(() => {
        res.send({ message: "Item deleted successfull!" });
    });
});

app.listen(4000, () => {
    console.log("server started!");
});
