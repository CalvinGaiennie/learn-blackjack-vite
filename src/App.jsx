import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import Blackjack from "./components/Blackjack";
import Strategy from "./components/Strategy";

const blackjackStrategy = {
  hardTotals: {
    8: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    9: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    10: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    11: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    12: {
      2: "H",
      3: "H",
      4: "S",
      5: "S",
      6: "S",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    13: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    14: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    15: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    16: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    17: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "S",
      8: "S",
      9: "S",
      10: "S",
      11: "S",
    },
  },
  softTotals: {
    13: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    14: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    15: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    16: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "H",
      8: "H",
      9: "H",
      10: "H",
      11: "H",
    },
    17: {
      2: "H",
      3: "H",
      4: "H",
      5: "H",
      6: "H",
      7: "S",
      8: "S",
      9: "H",
      10: "H",
      11: "H",
    },
    18: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "S",
      8: "S",
      9: "H",
      10: "H",
      11: "H",
    },
    19: {
      2: "S",
      3: "S",
      4: "S",
      5: "S",
      6: "S",
      7: "S",
      8: "S",
      9: "S",
      10: "S",
      11: "S",
    },
  },
};

const initialState = {
  dealerCards: [],
  playerCards: [],
  gameStatus: "",
  dealerTurn: false,
  dealerDealt: false,
  strategy: "",
};

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
    case "dealDealer":
      return { ...state, dealerCards: [...state.dealerCards, newCard] };
    case "dealerTurn":
      return { ...state, dealerTurn: action.payload };
    case "dealerDealt":
      return { ...state, dealerDealt: true };
    case "declareGame":
      return { ...state, gameStatus: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { dealerCards, playerCards, gameStatus, dealerTurn, dealerDealt, strategy },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("check game called");
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
    if (dealerDealt === true && dealerHandStatus > playerHandStatus) {
      dispatch({
        type: "declareGame",
        payload: `Dealer wins. Dealer Hand: ${dealerHandStatus}. Player Hand: ${playerHandStatus}`,
      });
      return;
    }
    if (dealerDealt === true && dealerHandStatus < playerHandStatus) {
      dispatch({
        type: "declareGame",
        payload: `Player wins. Dealer Hand: ${dealerHandStatus}. Player Hand: ${playerHandStatus}`,
      });
      return;
    }
    if (dealerDealt === true && dealerHandStatus == playerHandStatus) {
      dispatch({
        type: "declareGame",
        payload: `Tie. Dealer Hand: ${dealerHandStatus}. Player Hand: ${playerHandStatus}`,
      });
      return;
    }
    console.log("DealerHand", dealerHandStatus, "PlayerHand", playerHandStatus);
  }, [playerCards, dealerCards, dealerDealt, dealerTurn]);

  useEffect(() => {
    const dealerHandStatus = checkHand(dealerCards);
    if (dealerTurn == true && dealerHandStatus < 16) {
      dispatch({ type: "dealDealer" });
      return;
    } else if (dealerTurn == true && dealerHandStatus >= 16) {
      dispatch({ type: "dealerDealt" });
    }
  }, [dealerTurn, dealerCards]);

  return (
    <div>
      <Header />
      <div className="blackjack flex">
        <Blackjack
          dispatch={dispatch}
          dealerCards={dealerCards}
          playerCards={playerCards}
        />
        <Strategy strategy={strategy} />
      </div>
      <GameControls
        dispatch={dispatch}
        gameStatus={gameStatus}
        dealerTurn={dealerTurn}
      />
    </div>
  );
}

export default App;
