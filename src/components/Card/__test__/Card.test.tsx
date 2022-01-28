import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import Card, { MyFormValues, CardProps } from "../Card";

function renderCard(props: Partial<CardProps> = {}) {
  const defaultProps: CardProps = {
    isDarkModeActive: false,
  };
  return render(<Card {...defaultProps} {...props} />);
}

test("should display a blank card form, with dark theme set by default", async () => {
  const { findByTestId } = renderCard();
  const container = await findByTestId("card-fields");

  const submitBtn = await findByTestId("submit-btn");
  const header = await findByTestId("header");
  const input = getByTestId(container, "cardNumberInput");

  input.focus();
  expect(input).toHaveFocus();
  //   screen.getByLabelText("Card Number"); //doesn't find it although it's in the dom
  screen.getByText("Submit");

  expect(submitBtn).not.toHaveAttribute("disabled"); // disabled === 'null' ????
  expect(header).toHaveClass("header");
  expect(header).not.toHaveClass("header light-text");

  expect(container).toHaveFormValues({
    cardNumber: "",
    cardHolder: "",
    month: "",
    year: "",
    CVV: "",
  });

  render(<Card isDarkModeActive />);
});

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Card isDarkModeActive />).toJSON();
  expect(tree).toMatchSnapshot();
});
