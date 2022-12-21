import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AddonVue from "../Addon.vue";
import { Addon } from "@/services/addon.service";

describe("Addon Component", () => {
  const addon = new Addon("TEST");
  addon.description = "A DESCRIPTION";
  addon.size = 54321;

  const wrapper = mount(AddonVue, {
    props: { addon },
    slots: {
      badges: ["<span>Badge!</span>", "<span>Another one!</span>"],
      "quick-actions": ["<button>Click me</button>"],
      controls: ["<button>Action 1</button>", "<button>Action 2</button>"],
    },
  });

  it("renders basic info", () => {
    expect(wrapper.exists());
    // Name
    expect(wrapper.get("h1").text()).toBe("TEST");
    // Description
    expect(wrapper.get("p.description").text()).toBe("A DESCRIPTION");
    // Size
    expect(wrapper.get("div.bottom").text()).toBe("53.05 KB");
  });

  it("renders badges", () => {
    const badges = wrapper.findAll(".badges span");
    expect(badges[0].exists());
    expect(badges[0].text()).toBe("Badge!");

    expect(badges[1].exists());
    expect(badges[1].text()).toBe("Another one!");
  });

  it("renders quick actions", () => {
    const quickActions = wrapper.get(".quick-actions");

    expect(quickActions.get("button").text()).toBe("Click me");

    const githubLink = wrapper.get(".quick-actions .github-link");
    const attributes = githubLink.attributes();
    expect(attributes.href).toBe(
      "https://github.com/carsakiller/LLS-Addons/tree/main/addons/TEST"
    );
    expect(attributes.target).toBe("_blank");
    expect(attributes.title).toBe("View on GitHub");
    expect(attributes.rel).toBe("nofollow noreferrer noopener external");
  });

  it("renders controls", () => {
    const controls = wrapper.findAll(".controls button");

    expect(controls[0].exists());
    expect(controls[0].text()).toBe("Action 1");

    expect(controls[1].exists());
    expect(controls[1].text()).toBe("Action 2");
  });
});
