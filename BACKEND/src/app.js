const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Allow requests from the frontend dev server
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl, Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error(`CORS: origin ${origin} not allowed`));
        },
        credentials: true,
    })
);

app.use(express.json());

// Serve uploaded images publicly
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

// Error middleware always last
app.use(errorMiddleware);

module.exports = app;
