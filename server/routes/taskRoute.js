const express = require("express");
const taskModal = require("../modals/taskModal");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const data = await taskModal.create(req.body);
    res.status(201).json({
      success: true,
      message: "task created",
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(400).json({
      message: "Error creating task",
      error: error.message,
    });
  }
});

// Get all tasks
router.get("/getAll", async (req, res) => {
  try {
    const data = await taskModal.find({});
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to get list",
      error: error.message,
    });
  }
});

// Update a task
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await taskModal.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "unable to update task",
      error: error.message,
    });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await taskModal.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "unable to delete task",
      error: error.message,
    });
  }
});

module.exports = router;
