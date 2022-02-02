import renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import CardView, { CardViewProps } from "../CardView";

describe("CardView component", () => {
  const props: CardViewProps = {
    values: {
      cardNumber: "1234567812345678",
      cardHolder: "Tet Test",
      month: "02",
      year: "26",
      CVV: "1234",
    },
    isDarkModeActive: false,
  };

  const component = shallow(<CardView {...props} />);

  it("renders card holder in upper case when given a name", () => {
    const cardHolder = component.find(".card-holder");
    expect(cardHolder.text()).toBe(props.values.cardHolder.toUpperCase());
  });
});

// __________

const values = {
  cardNumber: "1234567812345678",
  cardHolder: "Alec Bow",
  month: "02",
  year: "23",
  CVV: "123",
};
const isDarkModeActive = false;

describe("CardView tests", () => {
  it("displays card binding", async () => {
    render(<CardView values={values} isDarkModeActive={isDarkModeActive} />);
    await waitFor(() => {
      expect(screen.getByText(values.cardNumber)).toBeInTheDocument();
    });
  });

  it("displays card holder in upper case", async () => {
    render(<CardView values={values} isDarkModeActive={isDarkModeActive} />);
    await waitFor(() => {
      expect(
        screen.getByText(values.cardHolder.toUpperCase())
      ).toBeInTheDocument();
    });
  });
});

// __________

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
});

it("renders correctly when there are no items", () => {
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

  const tree = renderer.create(<CardView {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
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
