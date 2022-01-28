import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CardView, { CardViewProps } from "../CardView";

function renderCardView(props: Partial<CardViewProps> = {}) {
  const defaultProps: CardViewProps = {
    values: {
      cardNumber: "",
      cardHolder: "",
      month: "",
      year: "",
      CVV: "",
    },
    isDarkModeActive: false,
  };
  return render(<CardView {...defaultProps} {...props} />);
}

test("should display a blank card form, with dark theme set by default", async () => {
  const { findByTestId } = renderCardView();

  const cardBody = await findByTestId("card-body");
  const cardNumber = await findByTestId("card-number");
  const visaImg = await findByTestId("visa-img");

  expect(cardBody).toBeVisible();
  expect(cardBody).toContainElement(cardNumber);
  expect(cardNumber).toContainHTML("0000 0000 0000 0000");
  expect(cardNumber).not.toContainHTML("0000000000000000");
  expect(visaImg).toHaveAccessibleName("visa logo");
  //   expect(cardBody).toContain({
  //     values: {
  //       cardNumber: "",
  //       cardHolder: "",
  //       month: "",
  //       year: "",
  //       CVV: "",
  //     },
  //     isDarkModeActive: false,
  //   });
});

it("renders correctly when there are no items", () => {
  // const tree = renderer.create(<CardView values={} isDarkModeActive />).toJSON();
  // expect(tree).toMatchSnapshot();
});

// test("CardView changes the class when hovered", () => {
//   const component = renderer.create(<CardView values={} isDarkModeActive />);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   //   tree.props.something();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   //   tree.props.somethingElse();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
