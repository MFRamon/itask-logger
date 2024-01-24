import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { getTodaysDate } from "@/helpers";

describe("LogoHeader", () => {
  it("should be able to render", () => {
    render(<LogoHeader />);
    const element = screen.getByTestId("logo-header");
    expect(element).toBeInTheDocument();
  });

  it("should display todays date", () => {
    render(<LogoHeader />);
    const { getByText } = within(screen.getByTestId("logo-header-date"));
    expect(getByText(getTodaysDate())).toBeInTheDocument();
  });

  it("should display the email address", () => {
    render(<LogoHeader />);

    const description = screen.getByTestId("logo-header-email");
    expect(description).toHaveTextContent("ramon.manfig@gmail.com");
  });

  it("should display the authors name", () => {
    render(<LogoHeader />);

    const description = screen.getByTestId("logo-header-author");
    expect(description).toHaveTextContent("Created By Ramon Manrique");
  });
});
