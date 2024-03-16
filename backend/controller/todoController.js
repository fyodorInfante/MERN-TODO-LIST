import mongoose from "mongoose";
import todoModel from "../model/todoModel.js";


// create a task
const createTask = async (req, res) => {
    const {task, status} = req.body;

    try{
        const todo = await todoModel.create({task, status})
        res.status(200).json(todo)
    }catch(error){
        res.status(404).json({error: error.message})
    }

}

// get all tasks
const getTasks = async (req, res) => {
    const tasks = await todoModel.find({}).sort({createdAt: -1});
    res.status(200).json(tasks);
}

// get a single task
const getTask = async(req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such task"})
    }
    
    const task = await todoModel.findById(id);

    if(!task){
        return res.status(404).json({error: "no such task"})
    }

    res.status(200).json(task);

}

// delete task

const deleteTask = async(req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such task"});
    }

    const task = await todoModel.findByIdAndDelete({_id: id});

    if(!task){
        return res.status(404).json({error: "no such task"});
    }

    res.status(200).json(task);
}

// update task

const updateTask = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such task"})
    }

    const task = await todoModel.findOneAndUpdate({_id: id}, {...req.body});

    if(!task){
        return res.status(404).json({error: "no such task"})
    }

    res.status(200).json(task);
}

export {getTasks, getTask, createTask, deleteTask, updateTask};
