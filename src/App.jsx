import { useReducer } from "react";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import Blackjack from "./components/Blackjack";
import Strategy from "./components/Strategy";

const initialState = { dealerCards: [], playerCards: [], gameStatus: "" };

function reducer(state, action) {
  switch (action.type) {
    case "startNewGame":
      return { ...initialState };
    case "dealPlayer":
      return { ...state, playerCards: action.payload };
    case "dealerTurn":
      return { ...state };
    case "dealDealer":
      return { ...state };
    case "declareGame":
      return { ...state };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ dealerCards, playerCards, gameStatus }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <Header />
      <div className="blackjack flex">
        <Blackjack
          dispatch={dispatch}
          dealerCards={dealerCards}
          playerCards={playerCards}
        />
        <Strategy />
      </div>
      <GameControls dispatch={dispatch} gameStatus={gameStatus} />
    </div>
  );
}

export default App;
