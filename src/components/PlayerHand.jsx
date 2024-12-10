function PlayerHand({ playerCards }) {
  return (
    <div>
      <h2>Player Hand</h2>
      <div className="flex">
        {playerCards.map((card, index) => {
          return (
            <p className="card" key={index}>
              {card}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerHand;
