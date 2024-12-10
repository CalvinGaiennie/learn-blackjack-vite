function DealerHand({ dealerCards }) {
  return (
    <div>
      <h2>Dealer Hand</h2>
      <div className="flex">
        {dealerCards.map((card, index) => {
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

export default DealerHand;
