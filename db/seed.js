const db = require("./connection");
const { Genre } = require("./models/genre");
const { Customer } = require("./models/customer");
const genres = [
  {
    name: "Horror",
  },
  {
    name: "Funny",
  },
  {
    name: "Romantic",
  },
];

const customer = {
  name: "Admin",
  phone: "09355401204",
  isGold: true,
};
async function seed() {
  try {
    await Genre.deleteMany();
    await Customer.deleteMany();
    await Genre.insertMany(genres);
    await Customer.insertMany([customer]);
    console.log("Database seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
