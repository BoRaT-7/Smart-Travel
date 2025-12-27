// src/controllers/order.controller.js
const { ObjectId } = require("mongodb");

let ordersCollection;

function init(db) {
  ordersCollection = db.collection("gearOrders");
}

// POST /api/orders
async function createOrder(req, res, next) {
  try {
    console.log("📦 Incoming order:", req.body);

    const {
      name,
      email,
      phone,
      address,
      quantity,
      productId,
      productName,
      productPrice,
      productImage,
      productDescription,
    } = req.body;

    if (!name || !email || !phone || !address || !productId || !productName) {
      return res.status(400).send({
        success: false,
        message:
          "Name, email, phone, address, productId and productName are required",
      });
    }

    const qty = Number(quantity) || 1;
    const unit = parseFloat(String(productPrice).replace(/[^0-9.]/g, "")) || 0;
    const total = qty * unit;

    const order = {
      customer: { name, email, phone, address },
      product: {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription,
      },
      quantity: qty,
      unitAmount: unit,
      totalAmount: Number(total.toFixed(2)),
      status: "pending",
      createdAt: new Date(),
    };

    const result = await ordersCollection.insertOne(order);

    return res.send({
      success: true,
      message: "Order created successfully",
      orderId: result.insertedId,
    });
  } catch (err) {
    console.error("Create order error:", err);
    next(err);
  }
}

// GET /api/orders
async function getAllOrders(req, res, next) {
  try {
    const orders = await ordersCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(orders);
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const order = await ordersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.send(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { init, createOrder, getAllOrders, getOrderById };
