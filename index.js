// require mongoose and dotenv, and establish MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define a Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  favoriteFoods: {
    type: [String],
    default: [],
  },
});

// create a Person model based on the schema
const Person = mongoose.model('Person', personSchema);

// create a new person and save it to the database
const newPerson = new Person({
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['pizza', 'sushi'],
});
newPerson.save((err, savedPerson) => {
  if (err) return console.error(err);
  console.log(savedPerson);
});

// create an array of people and save them to the database
const arrayOfPeople = [
  { name: 'Khalil Mas3oudi', age: 35, favoriteFoods: ['mlou5ia', 'ice cream'] },
  { name: 'Ons Ben Amor', age: 27, favoriteFoods: ['jelbana', 'borghol'] },
  { name: 'Brahim Lefi', age: 42, favoriteFoods: ['roz jerbi', 'slata mechouia'] },
];
Person.create(arrayOfPeople, (err, createdPeople) => {
  if (err) return console.error(err);
  console.log(createdPeople);
});

// find people with a given name and log the result
const nameToSearch = 'John Doe';
Person.find({ name: nameToSearch }, (err, foundPeople) => {
  if (err) return console.error(err);
  console.log(foundPeople);
});

// find a person with a given favorite food and log the result
const foodToSearch = 'pizza';
Person.findOne({ favoriteFoods: foodToSearch }, (err, foundPerson) => {
  if (err) return console.error(err);
  console.log(foundPerson);
});

// find a person by ID, update their favorite food, and log the updated person
const personId = '609097e8dd9a0c1f12345678'; 
Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  person.favoriteFoods.push('hamburger');
  person.save((err, updatedPerson) => {
    if (err) return console.error(err);
    console.log(updatedPerson);
  });
});

// find a person by name and update their age, and log the updated person
const personName = 'John Doe'; 
Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log(updatedPerson);
  }
);

// Find and remove the person with the given ID
const person_Id = '60c9d42f1f13b9278f6e0c79';
Person.findByIdAndRemove(person_Id, (err, removedPerson) => {
  if (err) return console.error(err);
  console.log(removedPerson);
});

// Remove all people with the name "Mary"
const deleteQuery = { name: "Mary" };
Person.remove(deleteQuery, (err, result) => {
  if (err) return console.error(err);
  console.log(result);
});

// Define the query to find people who like "mlou5ia", sort by name, limit to 2, and hide their age
const query = Person.find({ favoriteFoods: "mlou5ia" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
