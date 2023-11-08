import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const {title, description, date} = req.body;

    const newTask = new Task({
        title,
        description,
        date
    });
    const savedTask = await newTask.save();

    res.json(savedTask);
};

export const deleteTask = async (req, res) => {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if(!taskDeleted) return res.status(404).json({message:"Tarea no encontrada"});
    res.json(taskDeleted);
};

export const getTask = async (req, res) => {
    const taskFound = await Task.findById(req.params.id);
    if(!taskFound) return res.status(404).json({message:"Tarea no encontrada"});
    res.json(taskFound);
};

export const updateTask = async (req, res) => {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });
    if(!taskUpdated) return res.status(404).json({message:"Tarea no encontrada"});
    res.json(taskUpdated);
};