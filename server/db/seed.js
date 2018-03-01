const Promise = require("bluebird");
const {
  Address,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User,
  db
} = require('./models');
//const db = require('./index.js');

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
      photo: 'https://www.amazon.com/32oz-Regular-Mouth-Canning-Mason/dp/B01N6QBJG0'
    },
    {
      name: 'Avery',
      description: "Imagine a Mason but with a handle. That means it's more portable, it's fancy, and best of all, there is no branding. This is the ideal drinking jar for anyone that wants to prove they're not limited by the restrains of capitalism. The Avery holds just as much liquid as the Mason, but speaks to a more independent water drinker. The Avery can also be used to drink kombucha, coconut milk, and craft Lacroix.",
      price: 20,
      stock: 5000,
      photo: 'https://target.scene7.com/is/image/Target/16728716?wid=520&hei=520&fmt=pjpeg'
    },
    {
      name: 'Borris',
      description: "The Borris is the go to mug for any hot beverage. It's got a handle shaped perfectly for your hand, and a design that works for both tea and coffee. It's tall and skinny in design, allowing you to hold as much liquid as you want, without it getting cold.",
      price: 17,
      stock: 2500,
      photo: 'https://i.pinimg.com/originals/fa/e6/91/fae691db77c4fcdc2325f974fda510fb.jpg'
    },
    {
      name: 'Cleopatra',
      description: "This is our fun mug. Curvy in design, it has drawn inspiration from middle eastern designs. If you want a mug to add patterns to your cabinet, this is the one to get. Currently available in just black and white, it is a classic must have in your collection. You can drink coffee or tea out of this mug and feel confident that you've made the right choice.",
      price: 35,
      stock: 10000,
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSClhZaqCpsMnCdWVX4IzxDgEseg2jOeAoxmxvl7vo53S-Ti2Ef'
    },
    {
      name: 'Rivington',
      description: "The Rivington was once a diet coke can. Since then, it has been washed, re-used, and re-cycled. We've altered both the interior and exterior of the can so that it can hold hot beverages. We've added a handle for every day use, but we've kept the adored Coke logo. If you know someone who is trying to ween off Coke and onto cappucinos, get them this gift today.",
      price: 28,
      stock: 10000,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/61dikCP5C1L._SY355_.jpg'
    },
    {
      name: 'Kesha',
      description: "Your every day glass for espresso. The Kesha was once used for alcoholic shots but has since been remodeled to serve the needs of caffeine addicts everywhere. This comes with a colorful confetti design, which can bring the fun of a party scene into your morning espresso. A perfect gift for an individual who just got into espresso. ",
      price: 10,
      stock: 50000,
      photo: 'https://cdn.shopify.com/s/files/1/1348/9761/products/multi-confetti-glitter-shot-glass-slant-harlan-ruby_1280x1280.jpg?v=1501085771'
    },
    {
      name: 'Bell',
      description: "Airy, light, dynamic, fun. Not sure it's intended to drink out of.",
      price: 5,
      stock: 10000,
    }
  ],
  user: [
    {
      firstName: 'Sylvia',
      lastName: 'Plath',
      email: 'sylvia@plath.com',
      isAdmin: false
    },
    {
      firstName: 'Angelina',
      lastName: 'Jolie',
      email: 'angie@jolie.com',
      isAdmin: false
    },
    {
      firstName: 'Michelle',
      lastName: 'Obama',
      email: 'michelle@obama.com',
      isAdmin: false
    },
    {
      firstName: 'Ellen',
      lastName: 'Degeneres',
      email: 'ellen@gmail.com',
      isAdmin: true
    },
    {
      firstName: 'Spongebob',
      lastName: 'Squarepants',
      email: 'sponge@bob.com',
      isAdmin: true
    },
  ],
  address: [
    {
      street: '123 Somewhere St',
      state: 'New Hampshire',
      city: 'City',
      zip: 12345,
      userId: 1
    },
    {
      street: '456 Place Ave',
      state: 'New York',
      city: 'Another',
      zip: 98765,
      userId: 2,
    },
    {
      street: '789 Nowhere Rd',
      state: 'Nebraska',
      city: 'Place',
      zip: 13579,
      userId: 2
    },
    {
      street: '45 Space Blvd',
      state: 'North Carolina',
      city: 'Suburb',
      zip: 68345,
      userId: 3
    },
    {
      street: '5 Pinapple St',
      state: 'Under Sea',
      city: 'Bikini Bottom',
      zip: 91843,
      userId: 5
    },
    {
      street: '98 Fancy St',
      state: 'California',
      city: 'Las Vegas',
      zip: 23456,
      userId: 4
    },
  ],
  review: [
    {
      text: "The Avery just feels cooler than the Mason. In all honesty, I can never go back to the Mason. It's been a pleasure. Though I will say, I think we could go even more hipster.",
      rating: 3,
      userId: 3,
      productId: 2
    },
    {
      text: "I guess The Borris was fine. I mean, I can't really drink tea under water so maybe it's not as great as I thought. I think I'll return it.",
      rating: 1,
      userId: 5,
      productId: 3
    },
    {
      text: "I love The Cleopatra! It was a beautiful addition to our kitchen. It's been making my mornings. Could not recommend this more. Thanks muggers!",
      rating: 5,
      userId: 2,
      productId: 4
    },
    {
      text: "Love this jar. It's my favorite of jars. I'm going to write a book about this.",
      rating: 4,
      userId: 1,
      productId: 7
    }
  ],
  order: [
    {
      email: 'sylvia@plath.com',
      status: 'shipped',
      userId: 1,
      addressId: 1
    },
    {
      email: 'michelle@obama.com',
      status: 'shopping',
      userId: 3,
      addressId: 4
    },
    {
      email: 'sponge@bob.com',
      status: 'cancelled',
      userId: 4,
      addressId: 5
    },
  ],
  lineItem: [
    {
      quantity: 500,
      price: 10,
      orderId: 1,
      productId: 7,
    },
    {
      quantity: 2,
      price: 17,
      orderId: 2,
      productId: 3,
    },
    {
      quantity: 3,
      price: 35,
      orderId: 2,
      productId: 4,
    },
    {
      quantity: 1,
      price: 20,
      orderId: 3,
      productId: 2,
    },
    {
      quantity: 1,
      price: 17,
      orderId: 3,
      productId: 1,
    },
    {
      quantity: 500,
      price: 35,
      orderId: 3,
      productId: 3,
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
