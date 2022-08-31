import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { addReservation, removeReservation } from "./redux/reservationSlice";
import { addCustomer, addFoodToCustomer } from "./redux/customerSlice";
import { v4 as uuid } from "uuid";

function App() {
  const [reservationNameInput, setReservationNameInput] = useState("");
  const [foodNameInput, setFoodNameInput] = useState("");
  const reservations = useSelector((state) => state.reservations.value);
  const customers = useSelector((state) => state.customers.value);

  const dispatch = useDispatch();

  const handleAddReservation = () => {
    if (!reservationNameInput) return;
    dispatch(addReservation(reservationNameInput));
    setReservationNameInput("");
  };

  return (
    <div className="App">
      <div className="container">
        {/* Reservations */}
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((name, index) => (
                <div
                  key={index}
                  className="reservation-card-container"
                  onClick={() => {
                    dispatch(removeReservation(index));
                    dispatch(
                      addCustomer({
                        id: uuid(),
                        name,
                        food: [],
                      })
                    );
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <input
              value={reservationNameInput}
              onChange={(e) => setReservationNameInput(e.target.value)}
            />
            <button onClick={handleAddReservation}>Add</button>
          </div>
        </div>

        {/* Customers Cards */}
        <div className="customer-food-container">
          {customers.map((customer, index) => (
            <div key={index} className="customer-food-card-container">
              <p>{customer.name}</p>
              <div className="customer-foods-container">
                <div className="customer-food">
                  {customer.food.map((f, index) => (
                    <p key={index}>{f}</p>
                  ))}
                </div>
                <div className="customer-food-input-container">
                  <input
                    value={foodNameInput}
                    onChange={(e) => setFoodNameInput(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if(!foodNameInput)return
                      dispatch(
                        addFoodToCustomer({
                          id: customer.id,
                          food: foodNameInput,
                        })
                      );
                      setFoodNameInput("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
