// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// ---------------------- Load & Save Helpers ----------------------
const loadFromStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

// ---------------------- Products Slice ----------------------
const productsSlice = createSlice({
  name: "products",
  initialState: {
    Veg: [
      { id: 101, name: "Okra", price: 35, imageurl: "./public/Images/okra.png" },
      { id: 102, name: "Potato", price: 25, imageurl: "./public/Images/Potato.jpg" },
      { id: 103, name: "Tomato", price: 30, imageurl: "./public/Images/Tomato.png" },
      { id: 104, name: "Cucumber", price: 47, imageurl: "./public/Images/Cucumber.jpeg" },
      { id: 105, name: "Bitter Gourd", price: 52, imageurl: "./public/Images/BitterGuard.jpeg" },
      { id: 106, name: "Egg Plant", price: 40, imageurl: "./public/Images/EggPlant.jpg" },
      { id: 107, name: "Capsicum", price: 28, imageurl: "./public/Images/Capsicum.jpeg" },
      { id: 108, name: "Carrot", price: 33, imageurl: "./public/Images/carrot.png" },
      { id: 109, name: "Cabbage", price: 50, imageurl: "./public/Images/Cabbage.avif" },
      { id: 110, name: "Spinach", price: 20, imageurl: "./public/Images/Spinach.jpg" },
      { id: 111, name: "Onion", price: 40, imageurl: "./public/Images/Onion.jpg" },
      { id: 112, name: "Cauliflower", price: 60, imageurl: "./public/Images/Cauliflower.jpg" },
      { id: 113, name: "Radish", price: 45, imageurl: "./public/Images/Radish.jpg" },
      { id: 114, name: "Beetroot", price: 50, imageurl: "./public/Images/Beetroot.jpeg" },
      { id: 115, name: "Peas1", price: 35, imageurl: "./public/Images/Peas1.jpg" },
      { id: 116, name: "Drumstick", price: 20, imageurl: "./public/Images/Drumstick.jpeg" },
      { id: 117, name: "Coriander leaves", price: 10, imageurl: "./public/Images/Coriander leaves.jpg" },
      { id: 118, name: "Yam", price: 30, imageurl: "./public/Images/Yam.jpg" },
      { id: 119, name: "Broccoli", price: 35, imageurl: "./public/Images/Broccoli.jpeg" },
      { id: 120, name: "Snake gourd", price: 50, imageurl: "./public/Images/Snake gourd.webp" }
    ],
    NonVeg: [
      { id: 1001, name: "Chiken Biryani", price: 300, imageurl: "./public/Images/chikenbiryani.avif" },
      { id: 1002, name: "Crab Curry", price: 280, imageurl: "./public/Images/crab1.jpg" },
      { id: 1003, name: "Duck Roast", price: 250, imageurl: "./public/Images/Duck Roast.jpg" },
      { id: 1004, name: "Fish Curry", price: 180, imageurl: "./public/Images/fishcurry.jpg" },
      { id: 1005, name: "Mutton Rogan Josh", price: 450, imageurl: "./public/Images/mutton.webp" },
      { id: 1006, name: "Pwans Masala", price: 300, imageurl: "./public/Images/prawns.jpg" },
      { id: 1007, name: "Tandoori Chiken", price: 400, imageurl: "./public/Images/Tandoori.jpg" },
      { id: 1008, name: "Butter Chiken", price: 280, imageurl: "./public/Images/buttechicken.jpg" },
      { id: 1009, name: "Pork Belly", price: 300, imageurl: "./public/Images/Pork Belly.jpeg" },
      { id: 1010, name: "Beef Steak", price: 500, imageurl: "./public/Images/Beef Steak.jpg" },
      { id: 1011, name: "Lamb Chops", price: 400, imageurl: "./public/Images/Lamb Chops.jpeg" },
      { id: 1012, name: "Pork Ribs", price: 350, imageurl: "./public/Images/Pork Ribs.jpg" },
      { id: 1013, name: "Salmon", price: 250, imageurl: "./public/Images/Salmon.jpg" },
      { id: 1014, name: "Chiken 65", price: 160, imageurl: "./public/Images/Chiken 65.jpg" },
      { id: 1015, name: "King Fish", price: 150, imageurl: "./public/Images/King Fish.webp" },
      { id: 1016, name: "Chicken Wings", price: 250, imageurl: "./public/Images/Chicken Wings.jpg" },
      { id: 1017, name: "KFC", price: 500, imageurl: "./public/Images/KFC.png" },
      { id: 1018, name: "Lobster", price: 180, imageurl: "./public/Images/Lobster.jpeg" },
      { id: 1019, name: "Chiken Lollipop", price: 250, imageurl: "./public/Images/chiken Lalipop.jpg" },
      { id: 1020, name: "Mutton Keema", price: 500, imageurl: "./public/Images/Mutton Keema.jpeg" }
    ],
    Milk: [
      { id: 10, name: "Lassi", price: 40, imageurl: "./public/Images/Lassi.webp" },
      { id: 11, name: "MilkShake", price: 60, imageurl: "./public/Images/Milkshake.jpg" },
      { id: 12, name: "Butter Milk", price: 30, imageurl: "./public/Images/Buttermilk.webp" },
      { id: 13, name: "Butter", price: 220, imageurl: "./public/Images/Butter.jpg" },
      { id: 14, name: "Condensed Milk", price: 52, imageurl: "./public/Images/Condensed Milk.jpg" },
      { id: 15, name: "Curd", price: 60, imageurl: "./public/Images/curd.avif" },
      { id: 16, name: "Evaporated Milk", price: 120, imageurl: "./public/Images/Evaporated Milk.jpeg" },
      { id: 17, name: "Panner", price: 280, imageurl: "./public/Images/Paneer.jpg" },
      { id: 18, name: "Whole Milk", price: 150, imageurl: "./public/Images/Whole Milk.webp" },
      { id: 19, name: "Toned Milk", price: 50, imageurl: "./public/Images/Toned Milk.png" },
      { id: 20, name: "Flavoured Milk", price: 30, imageurl: "./public/Images/Flavoured Milk.webp" },
      { id: 21, name: "Lactose-free Milk", price: 50, imageurl: "./public/Images/Lactose-free Milk.webp" },
      { id: 22, name: "Whipped Cream", price: 50, imageurl: "./public/Images/Whipped Cream.jpg" },
      { id: 23, name: "Mozzarella Cheese", price: 100, imageurl: "./public/Images/Mozzarella Cheese.jpg" },
      { id: 24, name: "Parmesan Cheese", price: 150, imageurl: "./public/Images/Parmesan Cheese.jpg" },
      { id: 25, name: "Processed Cheese", price: 100, imageurl: "./public/Images/Processed Cheese.jpg" },
      { id: 26, name: "Greek Yogurt", price: 80, imageurl: "./public/Images/Greek Yogurt.avif" },
      { id: 27, name: "Kulfi", price: 50, imageurl: "./public/Images/Kulfi.jpeg" }
    ],
    Chacolate: [
      { id: 50, name: "5 Star", price: 20, imageurl: "./public/Images/5 Star.png" },
      { id: 51, name: "Munch", price: 10, imageurl: "./public/Images/Munch.jpeg" },
      { id: 52, name: "KitKat", price: 30, imageurl: "./public/Images/KitKat.jpg" },
      { id: 53, name: "MilkyBar", price: 20, imageurl: "./public/Images/Milkybar.jpg" },
      { id: 54, name: "Bourneville", price: 180, imageurl: "./public/Images/Bourneville.jpg" },
      { id: 55, name: "Perk", price: 10, imageurl: "./public/Images/Perk.jpeg" },
      { id: 56, name: "Dairy Milk", price: 40, imageurl: "./public/Images/Dairy Milk.jpeg" },
      { id: 57, name: "Temptations", price: 160, imageurl: "./public/Images/Temptations.webp" },
      { id: 58, name: "Royce", price: 200, imageurl: "./public/Images/Royce.webp" },
      { id: 59, name: "Guylian", price: 150, imageurl: "./public/Images/Guylian.jpeg" },
      { id: 60, name: "Neuhauss", price: 500, imageurl: "./public/Images/Neuhaus.webp" },
      { id: 61, name: "Leonidas", price: 600, imageurl: "./public/Images/Leonidas.jpg" },
      { id: 62, name: "Snickers", price: 20, imageurl: "./public/Images/Snickers.jpeg" }
    ]
  },
  reducers: {}
});

// ---------------------- Cart Slice ----------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromStorage("cart", []),
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.Quantity += 1;
      } else {
        state.push({ ...action.payload, Quantity: 1 });
      }
      saveToStorage("cart", state);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.Quantity += 1;
      saveToStorage("cart", state);
    },
    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      let newState;
      if (item && item.Quantity > 1) {
        item.Quantity -= 1;
        newState = state;
      } else {
        newState = state.filter((i) => i.id !== action.payload);
      }
      saveToStorage("cart", newState);
      return newState;
    },
    removeFromCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveToStorage("cart", newState);
      return newState;
    },
    clearCart: () => {
      saveToStorage("cart", []);
      return [];
    }
  }
});

// ---------------------- Orders Slice ----------------------
const ordersSlice = createSlice({
  name: "orders",
  initialState: loadFromStorage("orders", []),
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
      saveToStorage("orders", state);
    },
    clearOrders: () => {
      saveToStorage("orders", []);
      return [];
    }
  }
});

// ---------------------- Users Slice ----------------------
const usersSlice = createSlice({
  name: "users",
  initialState: loadFromStorage("users", {
    registeredUsers: [],
    currentUser: null
  }),
  reducers: {
    registerUser: (state, action) => {
      const existingUser = state.registeredUsers.find(
        (u) => u.email === action.payload.email
      );
      if (!existingUser) {
        state.registeredUsers.push(action.payload);
        saveToStorage("users", state);
      }
    },
    loginUser: (state, action) => {
      const user = state.registeredUsers.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        saveToStorage("users", state);
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      saveToStorage("users", state);
    }
  }
});

// ---------------------- Store Configuration ----------------------
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    users: usersSlice.reducer
  }
});

// Export actions
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export const { addOrder, clearOrders } = ordersSlice.actions;
export const { registerUser, loginUser, logoutUser } = usersSlice.actions;

export default store;
