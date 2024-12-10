function GameControls({ dispatch, gameStatus, dealerTurn }) {
  return (
    <div>
      <h2>Game Controls</h2>
      <p>{gameStatus}</p>
      <button onClick={() => dispatch({ type: "startNewGame", payload: [] })}>
        Start New Game
      </button>
      <button onClick={() => dispatch({ type: "dealPlayer" })}>Hit</button>
      <button
        onClick={() => {
          console.log(dealerTurn);
          dispatch({ type: "dealerTurn", payload: !dealerTurn });
        }}
      >
        Stay
      </button>
    </div>
  );
}

export default GameControls;
