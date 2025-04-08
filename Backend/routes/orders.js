const express = require("express");
const router = express.Router();

const Order = require("../models/orders");
const Component = require("../models/component");
const OrderItem = require("../models/orderitem");

router.post("/create", async (req, res) => {
  try {
    const { username, items } = req.body;

    if (!username || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Fetch components and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const component = await Component.findByPk(item.componentId);

      if (!component || component.stock < item.quantity) {
        return res.status(400).json({
          message: `Component ${item.componentId} is unavailable or has insufficient stock`,
        });
      }

      const price = parseFloat(component.price);
      const quantity = parseInt(item.quantity);

      totalAmount += price * quantity;

      orderItems.push({
        componentId: component.id,
        quantity,
        price,
      });

      // Optionally reduce stock
      component.stock -= quantity;
      await component.save();
    }

    // Create the order
    const order = await Order.create({
      username,
      totalAmount,
    });

    // Add order items
    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        componentId: item.componentId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    return res.status(201).json({ message: "Order placed successfully", orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;