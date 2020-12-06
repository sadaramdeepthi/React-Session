import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("checking if App component is loaded", () => {
    const component = mount(<App />);
    const app = component.find(".app-container");
    expect(app.exists()).toBe(true);
  });
});
