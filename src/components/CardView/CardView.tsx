import React from 'react';
import './CardView.css';

type CardViewProps = {
  cardNumber: string;
  cardHolder: string;
  CVV: string;
  month: string;
  year: string;
}

function CardView({cardNumber, cardHolder, CVV, month, year}: CardViewProps) {
  return (
    <div className="card-body">
      <h2 className="card-number">{cardNumber? `${cardNumber.slice(0,4)} ${cardNumber.slice(4,8)} ${cardNumber.slice(8,12)} ${cardNumber.slice(12,16)}`  : '0000 0000 0000 0000'}</h2>
      <div className="card-holder">{cardHolder ? cardHolder :'NAME SURNAME'}</div>
      <div className="exp-date">{month ? month  : '00'} / {year ? year :'00'}</div>
      <div className="cvv">CVV: {CVV ? CVV : '000(0)'}</div>
      <img src={require("../../img/chip-card.png")} alt="card chip" className="chip-img" />
      <img src={require("../../img/visa.png")} alt="visa logo" className="visa-img" />
    </div>
  );
}

export default CardView;
