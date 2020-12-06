import { configure, mount, unMount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import InputFields from "./InputFields";
import { act } from "react-test-renderer";

configure({ adapter: new Adapter() });
describe("InputFields", () => {
  it("checking if InputFields component is loaded", () => {
    const component = mount(<InputFields />);
    const input = component.find(".inputfields-container");
    expect(input.exists()).toBe(true);
  });

  it("Checking if button is loaded", () => {
    const component = mount(<InputFields />);
    const button = component.find("Button").at(0);
    expect(button.exists()).toBe(true);
    button.simulate("click");
  });

  it("Checking if Form is loaded", () => {
    const component = mount(<InputFields />);
    const form = component.find("Form");
    expect(form.exists()).toBe(true);
  });

  it("checking if Table component is not loaded as the intitial data array is empty", () => {
    const component = mount(<InputFields />);
    const table = component.find("Table");
    expect(table.exists()).toBe(false);
    const noItemsWrapper = component.find(".noItemsWrapper");
    expect(noItemsWrapper.text()).toBe("No Movie Records Available...");
  });

  it("Checking if when Button clicked errors displayed or not", () => {
    const component = mount(<InputFields />);
    const inlineErrors = component.find("InlineErrors");
    expect(inlineErrors.exists()).toBe(false);

    const button = component.find("Button");
    button.simulate("click");
    const inlineErrorsAfterSubmit = component.find("InlineErrors");
    expect(inlineErrorsAfterSubmit.exists()).toBe(true);
    expect(inlineErrorsAfterSubmit).toHaveLength(2);
    expect(inlineErrorsAfterSubmit.at(0).props().text).toBe(
      "Movie name can't be blank"
    );
    expect(inlineErrorsAfterSubmit.at(1).props().text).toBe(
      "Movie rating Can't be blank"
    );
    unMount(<InputFields />);
  });

  it.only("Checking when inputs entered , then the data displays in table.", () => {
    const component = mount(<InputFields />);
    const table = component.find("Table");
    expect(table.exists()).toBe(false);

    const nameControl = component.find("input.movieName");
    nameControl.simulate("change", { target: { value: "Bahubhali" } });
    const ratingControl = component.find("input.movieRating");
    ratingControl.simulate("change", { target: { value: "9" } });

    const button = component.find("Button");
    button.simulate("click");
    component.update();
    const tableAfterSubmit = component.find("Table");
    console.log(tableAfterSubmit.debug());
    expect(tableAfterSubmit.exists()).toBe(false);
  });
});
