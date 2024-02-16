import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return <button className="button" onClick={onClick}>{children}</button>
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }
  function handleSelectFriend(friend) {
    setSelectedFriend((curr) => curr?.id === friend.id ? null : friend);
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend?.id ? { ...friend, balance: friend.balance + value } : friend))
    setSelectedFriend(null);
  }

  return <div className="app">
    <div className="sidebar">
      <FriendsList friends={friends} onSelection={handleSelectFriend} selectedFriend={selectedFriend} />
      {showAddFriend && <FormAddFriend onSubmit={handleAddFriend} />}
      <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : "Add friend"}</Button>
    </div>
    {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />}
  </div>
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return <ul>
    {
      friends.map(friend =>
        <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
      )
    }
  </ul>
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id
  return <li className={isSelected ? "selected":""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} €</p>}
    {friend.balance > 0 && <p className="green"> {friend.name} owns you {Math.abs(friend.balance)} €</p>}
    {friend.balance === 0 && <p >You owe {friend.name} are even</p>}
    <Button onClick={() => onSelection(friend)}>
      {isSelected ? "Close" : "Select"}
    </Button>
  </li>
}

function FormAddFriend({ onSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }
    onSubmit(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return <form action="" className="form-add-friend">
    <label>Friend name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <label> Image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

    <Button onClick={e => handleSubmit(e)}>Add</Button>
  </form>
}

function FormSplitBill({ friend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [youExpense, setYouExpense] = useState("");
  const friendExpense = billValue ? billValue - youExpense : "";
  const [whoIsPay, setWhoIsPay] = useState("user");

  function handleBillValue(billValue) {
    !isNaN(billValue) &&
      setBillValue(Number(billValue));
  }

  function handleYouExpense(yourExpense) {
    if (!isNaN(yourExpense)) {
      if (billValue === "" || (Number(yourExpense) <= billValue)) {
        setYouExpense(yourExpense);
      }
    }
    return;
  }

  function handleWhoIsPay(whoIsPay) {
    setWhoIsPay(whoIsPay)
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!billValue || !youExpense) return;
    onSplitBill(whoIsPay === 'user' ? friendExpense : -youExpense)
  }

  return <form action="" className="form-split-bill" onSubmit={e => onSubmit(e)}>
    <h2>Split a bill with {friend.name}</h2>

    <label>Bill value</label>
    <input type="text" onChange={(e) => handleBillValue(e.target.value)} />

    <label>Your expense</label>
    <input type="text" value={youExpense} onChange={(e) => handleYouExpense(e.target.value)} />

    <label>{friend.name}'s expense</label>
    <input type="text" disabled value={friendExpense} />

    <label >
      Who is paying a bill?
    </label>
    <select name="" id="" value={whoIsPay} onChange={(e) => handleWhoIsPay(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{friend.name}</option>
    </select>

    <Button>Split bill</Button>
  </form>
}