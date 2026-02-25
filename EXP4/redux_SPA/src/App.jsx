import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./store";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="glass-card">
      <h1>Redux Counter</h1>

      <div className="counter-display">
        {count}
      </div>

      <div className="button-container">
        <button className="btn-dec" onClick={() => dispatch(decrement())}>
          −
        </button>

        <button className="btn-inc" onClick={() => dispatch(increment())}>
          +
        </button>

        <button className="btn-reset" onClick={() => dispatch(reset())} style={{ width: '100%', marginTop: '0.5rem' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
