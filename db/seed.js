const db = require("./connection");
const Genre = require("./genre");

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

async function seed() {
  try {
    await Genre.deleteMany();
    await Genre.insertMany(genres);
    console.log("Database seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
