import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user:req.user.id
    }).populate('user');
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const {title, description, date} = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user:req.user.id
    });
    const savedTask = await newTask.save();

    res.json(savedTask);
};

export const deleteTask = async (req, res) => {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if(!taskDeleted) return res.status(404).json({message:"Tarea no encontrada"});
    return res.sendStatus(204);
};

export const getTask = async (req, res) => {
    const taskFound = await Task.findById(req.params.id).populate('user');
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