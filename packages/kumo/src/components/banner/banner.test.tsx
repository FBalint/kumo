import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Banner, bannerVariants } from "./banner";

describe("Banner", () => {
  it("keeps bordered appearance as the default", () => {
    const className = bannerVariants();

    expect(className).toContain("border");
    expect(className).toContain("border-kumo-info/50");
    expect(className).toContain("bg-kumo-info-tint/30");
  });

  it("supports subtle appearance", () => {
    const className = bannerVariants({ appearance: "subtle" });

    expect(className).toContain("border-0");
    expect(className).toContain("bg-kumo-info-tint/70");
    expect(className).not.toContain("bg-kumo-info-tint/30");
  });

  it("supports secondary variant", () => {
    const className = bannerVariants({ variant: "secondary" });

    expect(className).toContain("bg-kumo-recessed");
    expect(className).toContain("text-kumo-subtle");
  });

  it("forwards root div props", () => {
    render(
      <Banner
        role="status"
        data-testid="banner"
        aria-live="polite"
        title="System status"
      />,
    );

    const banner = screen.getByTestId("banner");
    expect(banner.getAttribute("role")).toBe("status");
    expect(banner.getAttribute("aria-live")).toBe("polite");
    expect(banner.textContent).toBe("System status");
  });

  it("nudges description-only structured content into alignment with the icon", () => {
    render(
      <Banner
        icon={<span data-testid="icon" />}
        description="Description without a title"
      />,
    );

    const content = screen.getByText("Description without a title").parentElement
      ?.parentElement?.parentElement;
    expect(content?.className).toContain("pt-px");
  });
});
