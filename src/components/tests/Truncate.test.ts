import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Truncate from "../Truncate.vue";

describe("Truncate", () => {
  it("truncates long text", () => {
    const wrapper = mount(Truncate, {
      props: { text: "Some text that is longer than permitted", limit: 20 },
    });
    expect(wrapper.exists());
    expect(wrapper.text()).toEqual("Some text that is lo...");
  });
  it("leaves text of permitted length alone", () => {
    const wrapper = mount(Truncate, {
      props: { text: "Short Text", limit: 10 },
    });
    expect(wrapper.exists());
    expect(wrapper.text()).toEqual("Short Text");
  });
});
