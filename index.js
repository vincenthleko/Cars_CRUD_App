import express from "express";
import cors from "cors";
import { cars, nissansFromCK } from "./nissansFromCK.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// get all cars
app.get("/api/cars", (req, res) => {
  res.json({ cars });
});

// filters nissan cars with "CK" reg number
app.get("/api/filterNissansFromCK", (req, res) => {
  const filteredCars = nissansFromCK(cars);
  res.json({ filteredCars });
});

// add new car
app.post('/api/add-car', (req, res) => {
  const newCar = req.body;
  
  
  if (!newCar.color || !newCar.make || !newCar.model || !newCar.reg_number) {
      return res.status(400).send({ error: "All fields (color, make, model, reg_number) are required." });
  }
  
  cars.push(newCar);
  res.status(201).send({ message: "Car added successfully.", car: newCar });
});

// remove car
app.delete('/api/delete-car/:make', (req, res) => {
  const carMake = req.params.make.toLowerCase();

  const initialLength = cars.length;
  let deletedCount = 0;

  for (let i = cars.length - 1; i >= 0; i--) {
      if (cars[i].make.toLowerCase() === carMake) {
          cars.splice(i, 1);
          deletedCount++;
      }
  }

  if (deletedCount === 0) {
      return res.status(404).send({ error: "No cars found with the specified make." });
  }

  res.send({ message: "Cars deleted successfully.", deletedCount });
});

app.listen(PORT, function() {
  console.log(`Example add listening on port ${PORT}!`);
});
