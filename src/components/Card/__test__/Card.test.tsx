import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import Card, { CardProps } from "../Card";

it("Success test", async () => {
  const handleSubmit = jest.fn();

  const { getByTestId } = render(
    <Card isDarkModeActive onSubmit={handleSubmit} />
  );

  const completeForm = getByTestId("card-fields");
  const cardNumberInput = getByTestId("cardNumberInput");
  const cardHolderInput = getByTestId("cardHolderInput");
  const monthInput = getByTestId("monthInput");
  const yearInput = getByTestId("yearInput");
  const cvvInput = getByTestId("cvvInput");

  await waitFor(() => {
    fireEvent.change(cardNumberInput, {
      target: { value: "1234567812345678" },
    });
    fireEvent.change(cardHolderInput, { target: { value: "aylin gyoren" } });
    fireEvent.change(monthInput, { target: { value: "02" } });
    fireEvent.change(yearInput, { target: { value: "23" } });
    fireEvent.change(cvvInput, { target: { value: "0123" } });
  });

  await waitFor(() => fireEvent.submit(completeForm));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      cardNumber: "1234567812345678",
      cardHolder: "aylin gyoren",
      month: "02",
      year: "23",
      CVV: "0123",
    })
  );
});

it("should show validation on blur", async () => {
  const { getByTestId } = render(<Card isDarkModeActive onSubmit={() => {}} />);
  const cardNumberInput = getByTestId("cardNumberInput");
  fireEvent.blur(cardNumberInput);
  await waitFor(() => {
    expect(getByTestId("errorCardNumber")).not.toBe(null);
    expect(getByTestId("errorCardNumber")).toHaveTextContent("Required");
  });
});

function renderCard(props: Partial<CardProps> = {}) {
  const defaultProps: CardProps = {
    isDarkModeActive: false,
    onSubmit: () => {},
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
  screen.getByText("Submit");

  expect(submitBtn).not.toHaveAttribute("disabled");
  expect(header).toHaveClass("header");
  expect(header).not.toHaveClass("header light-text");

  expect(container).toHaveFormValues({
    cardNumber: "",
    cardHolder: "",
    month: "",
    year: "",
    CVV: "",
  });

  render(<Card isDarkModeActive onSubmit={() => {}} />);
});

it("renders correctly when there are no items", () => {
  const tree = renderer
    .create(<Card isDarkModeActive onSubmit={() => {}} />)
    .toJSON();
  //   expect(tree).toMatchSnapshot();
});
