import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// React v18
function App() {
  return (
    <main>
      <Header />
      <Menu />
      <Footer />
    </main>
  );
}
function Header() {
  const style = {
    textTransform: "uppercase",
  };
  return (
    <header className="header">
      <h1 style={style}>fast react pizza co.</h1>
    </header>
  );
}
function Menu() {
  function Pizza(props) {
    const obj = props.pizza;
    if (obj.soldOut) return null;
    return (
      <li className="pizza">
        <img src={obj.photoName} alt={obj.className} />
        <div>
          <h3>{obj.name}</h3>
          <p>{obj.ingredients}</p>
          <span>{obj.price}</span>
        </div>
      </li>
    );
  }

  return (
    <div class="menu">
      <h2 style={{ textTransform: "uppercase" }}>our menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose fron. All from
        our stone oven, all organic. all delicious.
      </p>
      {pizzaData.length > 0 ? (
        <ul class="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We're still working on our menu. Please comeback later:)</p>
      )}
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  if (!isOpen)
    return (
      <footer className="footer">
        {isOpen ? (
          <Order closeHour={closeHour} />
        ) : (
          <div className="order">
            <p>
              We're happy to welcome you between {closeHour}:00 to {openHour}:00{" "}
            </p>
          </div>
        )}
      </footer>
    );
}

function Order(props) {
  return (
    <div className="order">
      <p>We're open to {props.closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // Before React v18
// React.render(<App/>)
