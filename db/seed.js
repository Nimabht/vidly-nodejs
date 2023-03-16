const db = require("./connection");
const Genre = require("./genre");
const User = require("./user");
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

const user = {
  name: "Admin",
  phone: "09355401204",
  isGold: true,
};
async function seed() {
  try {
    await Genre.deleteMany();
    await User.deleteMany();
    await Genre.insertMany(genres);
    await User.insertMany([user]);
    console.log("Database seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
