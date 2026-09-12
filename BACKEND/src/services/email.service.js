const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async ({
  email,
  customerName,
  orderNumber,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
}) => {
  if (!email) {
    throw new Error("Customer email is missing");
  }

  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #ddd;">
            ${item.name}
          </td>

          <td style="padding:10px;border-bottom:1px solid #ddd;">
            ${item.quantity}
          </td>

          <td style="padding:10px;border-bottom:1px solid #ddd;">
            ₹${item.itemTotal}
          </td>
        </tr>
      `
    )
    .join("");

  const info = await transporter.sendMail({
    from: `"Cosmetics Store" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: `Order Placed Successfully - ${orderNumber}`,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        "
      >

        <h2>🎉 Order Placed Successfully</h2>

        <p>Hi ${customerName},</p>

        <p>
          Your order has been placed successfully.
        </p>

        <h3>
          Order ID: ${orderNumber}
        </h3>

        <p>
          <strong>Status:</strong> Pending
        </p>

        <table
          style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          "
        >

          <thead>
            <tr>

              <th style="text-align:left;padding:10px;">
                Product
              </th>

              <th style="text-align:left;padding:10px;">
                Qty
              </th>

              <th style="text-align:left;padding:10px;">
                Price
              </th>

            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>

        </table>

        <hr />

        <p>
          Subtotal: ₹${subtotal}
        </p>

        <p>
          Discount: -₹${discount}
        </p>

        <p>
          Delivery:
          ${
            deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee}`
          }
        </p>

        <h2>
          Total: ₹${total}
        </h2>

        <p>
          Thank you for shopping with us ❤️
        </p>

      </div>
    `,
  });

  // Debug information
  // console.log("========== EMAIL RESULT ==========");

  // console.log("FROM:", process.env.EMAIL_USER);
  // console.log("TO:", email);
  // console.log("MESSAGE ID:", info.messageId);
  // console.log("RESPONSE:", info.response);
  // console.log("ACCEPTED:", info.accepted);
  // console.log("REJECTED:", info.rejected);

  // console.log("==================================");
};

module.exports = {
  sendOrderConfirmationEmail,
};