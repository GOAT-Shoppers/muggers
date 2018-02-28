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
      name: 'Espresso shot'
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
      categoryId: 2,
      photo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F41j9XVxogiL._SL500_AC_SS350_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FBall-Quart-Jar-Wide-Mouth%2Fdp%2FB00CNHCDR6&docid=oL0anP3-V8QRGM&tbnid=HJCpMQM07WJa9M%3A&vet=10ahUKEwjep5Tmp8fZAhVhuVkKHfBAAOQQMwiLAigCMAI..i&w=350&h=350&bih=630&biw=1112&q=mason%20jar&ved=0ahUKEwjep5Tmp8fZAhVhuVkKHfBAAOQQMwiLAigCMAI&iact=mrc&uact=8'
    },
    {
      name: 'Avery',
      description: "Imagine a Mason but with a handle. That means it's more portable, it's fancy, and best of all, there is no branding. This is the ideal drinking jar for anyone that wants to prove they're not limited by the restrains of capitalism. The Avery holds just as much liquid as the Mason, but speaks to a more independent water drinker. The Avery can also be used to drink soda, juice, and milk.",
      price: 20,
      stock: 5000,
      categoryId: 2,
      photo: 'https://target.scene7.com/is/image/Target/16728716?wid=520&hei=520&fmt=pjpeg'
    },
    {
      name: 'Borris',
      description: "The Borris is the go to mug for any hot beverage. It's got a handle shaped perfectly for your hand, and a design that works for both tea and coffee. It's tall and skinny in design, allowing you to hold as much liquid as you want, without it getting cold.",
      price: 17,
      stock: 2500,
      categoryId: 1,
      photo: 'https://i.pinimg.com/originals/fa/e6/91/fae691db77c4fcdc2325f974fda510fb.jpg'
    },
    {
      name: 'Cleopatra',
      description: "This is our fun mug. Curvy in design, it has drawn inspiration from middle eastern designs. If you want a mug to add patterns to your cabinet, this is the one to get. Currently available in just black and white, it is a classic must have in your collection. You can drink coffee or tea out of this mug and feel confident that you've made the right choice.",
      price: 35,
      stock: 10000,
      categoryId: 1,
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSClhZaqCpsMnCdWVX4IzxDgEseg2jOeAoxmxvl7vo53S-Ti2Ef'
    },
    {
      name: 'Rivington',
      description: "The Rivington was once a diet coke can. Since then, it has been washed, re-used, and re-cycled. We've altered both the interior and exterior of the can so that it can hold hot beverages. We've added a handle for every day use, but we've kept the adored Coke logo. If you know someone who is trying to ween off Coke and onto cappucinos, get them this gift today.",
      price: 28,
      stock: 10000,
      categoryId: 4,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/61dikCP5C1L._SY355_.jpg'
    },
    {
      name: 'Kesha',
      description: "Your every day glass for espresso. The Kesha was once used for alcoholic shots but has since been remodeled to serve the needs of caffeine addicts everywhere. This comes with a colorful confetti design, which can bring the fun of a party scene into your morning espresso. A perfect gift for an individual who just got into espresso.",
      price: 10,
      stock: 50000,
      categoryId: 3,
      photo: 'https://cdn.shopify.com/s/files/1/1348/9761/products/multi-confetti-glitter-shot-glass-slant-harlan-ruby_1280x1280.jpg?v=1501085771'
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
