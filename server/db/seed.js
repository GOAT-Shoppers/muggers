const Promise = require("bluebird");
const {
  Address,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User
} = require('./models');
console.log(Category)
const db = require('./index.js');

const data = {
  category: [
    {
      name: 'Mug'
    },
    {
      name: 'Jar'
    },
    {
      name: 'Shot glass'
    },
    {
      name: 'Recycled can'
    }
  ],
  product: [
    {
      name: 'Mason',
      description: "Elegant in design, the Mason can hold all the water you might want to drink in one sitting. Lightly branded, this conveys a cool and relaxed environment. This jar says that you didn't try to decorate your home, it just happened. The Mason tells people you believe in recycling.",
      price: 15,
      stock: 10000,
      categoryId: 2
    },
    {
      name: 'Avery',
      description: "Imagine a Mason but with a handle. That mean it's more portable, it's fancy, and best of all, there is no branding. This is the ideal drinking jar for anyone that wants to prove they're not limited by the restrains of capitalism. The Avery holds just as much liquid as the Mason, but speaks to a more independent water drinker. The Avery can also be used to drink soda, juice, and milk.",
      price: 20,
      stock: 5000,
      categoryId: 2
    },
    {
      name: 'Borris',
      description: "Best for cold winter nights, this mug is a perfect gift for the tea drinker. With a thick layer of ceramic, this mug is perfect for the hottest of beverages. It's tall and skinny in design, allowing you to hold as much liquid as you want, without it getting cold.",
      price: 17,
      stock: 2500,
      categoryId: 1
    },
    {
      name: 'Cleopatra',
      description: "This is our fun mug. Curvy in design, it has drawn inspiration from middle eastern designs. If you want a mug to add color to your cabinet, this is the one to get. Currently available in regal blue, you can drink coffee or tea out of this mug and feel confident that you've made the right choice.",
      price: 35,
      stock: 10000,
      categoryId: 1
    },
    {
      name: 'Rivington',
      description: "The Rivington was once a diet coke can. Since then, it has been washed, re-used, and re-cycled. We've added a layer of ceramic to insulate the interior of the can. We've left the outside branding intact, so it continues to look like the adored silver and red coke can we all know and love. If you know someone who is trying to ween off diet coke and onto cappucinos, get them this gift today.",
      price: 28,
      stock: 10000,
      categoryId: 4
    },
    {
      name: 'Kesha',
      description: "Your every day shot glass. This shot glass can hold up to one shot and a half. Don't forget that when you fill it to the top and think you're only taking one shot. It's more than one! The Kesha is sleek in design but has a color scheme that conveys 'fun'. If you take this shot glass to a party, your friends will know you're about to have a good night.",
      price: 10,
      stock: 50000,
      categoryId: 3
    }
  ]
}

db
.sync({ force: true })
.then(function() {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function(name) {
    return Promise.map(data[name], function(item) {
      return db.model(name).create(item);
    });
  });
})
.then(() => {
  console.log("Finished inserting data");
})
.catch((err) => {
  console.error("There was totally a problem", err, err.stack);
})
.finally(function() {
  db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});
