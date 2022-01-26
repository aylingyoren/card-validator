import React from 'react';
import './CardView.css';

function CardView() {
  return (
    <div className="card-body">
      <h2 className="card-number">0000 0000 0000 0000</h2>
      <div className="card-holder">NAME SURNAME</div>
      <div className="exp-date">00 / 00</div>
      <img src={require("../../img/chip-card.png")} alt="card chip" className="chip-img" />
      <img src={require("../../img/visa.png")} alt="visa logo" className="visa-img" />
    </div>
  );
}

export default CardView;
