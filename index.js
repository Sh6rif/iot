const express = require("express");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./iotlab-ff718-firebase-adminsdk-c8txy-528892c5ac.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iotlab-ff718-default-rtdb.firebaseio.com",
});

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

// Root route
app.get("/", (req, res) => {
  res.render("iot.ejs");
});

// Endpoint to change LED status
app.post("/change-led-status", async (req, res) => {
  try {
    const newValue = req.body.newValue; // Assuming the new value is passed in the request body
    // Update the value of the LED in the Firebase Realtime Database
    await admin.database().ref("/led").set(newValue); // Assuming "led" is the correct path
    res.status(200).send("LED status updated successfully.");
  } catch (error) {
    console.error("Error updating LED status:", error);
    res.status(500).send("Error updating LED status.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
