import React from "react";
import { MyFormValues } from "../Card/Card";
import "./CardView.css";

export interface CardViewProps {
  values: MyFormValues;
  isDarkModeActive: boolean;
}

function CardView({ values, isDarkModeActive }: CardViewProps) {
  const { cardNumber, cardHolder, month, year, CVV } = values;
  return (
    <div
      data-testid="card-body"
      className={isDarkModeActive ? "card-body light-card-border" : "card-body"}
    >
      <h2 className="card-number" data-testid="card-number">
        {cardNumber
          ? `${cardNumber.slice(0, 4)} ${cardNumber.slice(
              4,
              8
            )} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12, 16)}`
          : "0000 0000 0000 0000"}
      </h2>
      <div className="card-holder" data-testid="card-holder">
        {cardHolder ? cardHolder : "NAME SURNAME"}
      </div>
      <div className="exp-date" data-testid="exp-date">
        {month ? month : "00"} / {year ? year : "00"}
      </div>
      <div className="" data-testid="cvv">
        CVV: {CVV ? CVV : "000(0)"}
      </div>
      <img
        src={require("../../img/chip-card.png")}
        alt="card chip"
        className=""
        data-testid="chip-img"
      />
      <img
        src={require("../../img/visa.png")}
        alt="visa logo"
        className=""
        data-testid="visa-img"
      />
    </div>
  );
}

export default CardView;
