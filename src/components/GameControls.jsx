function GameControls({ dispatch, gameStatus }) {
  return (
    <div>
      <h2>Game Controls</h2>
      <p>{gameStatus}</p>
      <button onClick={() => dispatch({ type: "startNewGame", payload: [] })}>
        Start New Game
      </button>
      <button onClick={() => dispatch({ type: "dealPlayer" })}>Hit</button>

      {/*maybe call a different function here*/}
      <button onClick={() => dispatch({ type: "dealerTurn" })}>Stay</button>
    </div>
  );
}

export default GameControls;
