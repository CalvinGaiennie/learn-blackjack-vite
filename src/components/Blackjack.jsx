import DealerHand from "./DealerHand";
import PlayerHand from "./PlayerHand";

function Blackjack({ dealerCards, playerCards }) {
  return (
    <div>
      <DealerHand dealerCards={dealerCards} />
      <PlayerHand playerCards={playerCards} />
    </div>
  );
}

export default Blackjack;
