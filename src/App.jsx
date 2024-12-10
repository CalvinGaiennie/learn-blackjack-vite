import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import Blackjack from "./components/Blackjack";
import Strategy from "./components/Strategy";

const initialState = { dealerCards: [], playerCards: [], gameStatus: "" };

function generateRandomCard() {
  const possibleCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  const randomNumber = Math.floor(Math.random() * 13);
  const newCard = possibleCards[randomNumber];
  return newCard;
}
function checkHand(cards) {
  const handTotal = cards.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return handTotal;
}

function reducer(state, action) {
  const newCard = generateRandomCard();

  switch (action.type) {
    case "startNewGame":
      return {
        ...initialState,
        playerCards: [generateRandomCard(), generateRandomCard()],
        dealerCards: [generateRandomCard(), generateRandomCard()],
      };
    case "dealPlayer":
      return { ...state, playerCards: [...state.playerCards, newCard] };
    case "dealerTurn":
      return { ...state };
    case "dealDealer":
      return { ...state, dealerCards: [...state.dealerCards, newCard] };
    case "declareGame":
      return { ...state, gameStatus: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ dealerCards, playerCards, gameStatus }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const playerHandStatus = checkHand(playerCards);
    const dealerHandStatus = checkHand(dealerCards);

    if (playerHandStatus > 21) {
      dispatch({
        type: "declareGame",
        payload: `Player Busts. Dealer Hand: ${dealerHandStatus}. Player Hand: ${playerHandStatus}`,
      });
      return;
    }
    if (dealerHandStatus > 21) {
      dispatch({
        type: "declareGame",
        payload: `Dealer Busts. Dealer Hand: ${dealerHandStatus}. Player Hand: ${playerHandStatus}`,
      });
      return;
    }
    console.log("DealerHand", dealerHandStatus, "PlayerHand", playerHandStatus);
  }, [playerCards, dealerCards]);
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
