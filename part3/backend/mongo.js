const mongoose = require("mongoose");
// Check args
if (process.argv.length < 3) {
  console.log("Provide the password as an argument: node mongo.js <password>");
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log(
    "Provide both a name and a number: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
} else if (process.argv.length > 5) {
  console.log(
    "Invalid number of arguments, provide: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

// Store args
const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://norbu:${password}@fullstackopen.mg0pikb.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// Create schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create model
const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length === 5) {
      const person = new Person({
        name: newName,
        number: newNumber,
      });

      console.log("Person saved");
      return person.save();
    }

    Person.find({}).then((result) => {
      console.log("Phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.log(err);
    return mongoose.connection.close();
  });
