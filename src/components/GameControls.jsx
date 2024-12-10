function GameControls({ dispatch }) {
  return (
    <div>
      <h2>Game Controls</h2>
      <button onClick={() => dispatch({ type: "startNewGame", payload: [] })}>
        Start New Game
      </button>
      <button
        onClick={() =>
          dispatch({ type: "dealPlayer", payload: ["card", "another card"] })
        }
      >
        Hit
      </button>
      <button>Stay</button>
    </div>
  );
}

export default GameControls;
