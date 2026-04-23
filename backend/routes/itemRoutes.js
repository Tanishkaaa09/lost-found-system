const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

router.post("/items", auth, async (req, res) => {
  const item = new Item({
    userId: req.user,
    ...req.body
  });

  await item.save();

  res.json({
    message: "Item Added"
  });
});

router.get("/items", auth, async (req, res) => {
  const items = await Item.find();

  res.json(items);
});

router.get("/items/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  res.json(item);
});

router.put("/items/:id", auth, async (req, res) => {
  await Item.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.json({
    message: "Item Updated"
  });
});

router.delete("/items/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);

  res.json({
    message: "Item Deleted"
  });
});

router.get("/items/search/:name", auth, async (req, res) => {
  const items = await Item.find({
    itemName: {
      $regex: req.params.name,
      $options: "i"
    }
  });

  res.json(items);
});

module.exports = router;