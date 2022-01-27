import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import CardView, { CardViewProps } from "../CardView";

describe("<CardView />", () => {
  test("should display a blank card form, with light theme set by default", async () => {
    // ???
  });
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
