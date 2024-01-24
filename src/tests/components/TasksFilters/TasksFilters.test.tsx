import TasksFilters  from "@/components/TasksFilters/TasksFilters";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event"

describe("TasksFilters", () => {
    it("should be able to render", () => {
      const setSelectedFilterHandler = jest.fn();
      render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);

      const element = screen.getByTestId("tasks-filters");
      expect(element).toBeInTheDocument();
    });

    it("should display the title", () => {
        const setSelectedFilterHandler = jest.fn();
        render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);
  
        const title = screen.getByTestId("test-filters-title");
        expect(title).toBeInTheDocument();
    });

    it("short handler filter should have been called", async () => {
        user.setup();
        const setSelectedFilterHandler = jest.fn();
        render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);
  
        const shortDurationButton = screen.getByRole('button', { name: "Short"});
        await user.click(shortDurationButton);
        expect(setSelectedFilterHandler).toHaveBeenCalledTimes(1);
    });

    it("medium handler filter should have been called", async () => {
        user.setup();
        const setSelectedFilterHandler = jest.fn();
        render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);
  
        const shortDurationButton = screen.getByRole('button', { name: "Medium"});
        await user.click(shortDurationButton);
        expect(setSelectedFilterHandler).toHaveBeenCalledTimes(1);
    });

    it("high handler filter should have been called", async () => {
        user.setup();
        const setSelectedFilterHandler = jest.fn();
        render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);
  
        const shortDurationButton = screen.getByRole('button', { name: "High"});
        await user.click(shortDurationButton);
        expect(setSelectedFilterHandler).toHaveBeenCalledTimes(1);
    });

    it("reset handler filter should have been called", async () => {
        user.setup();
        const setSelectedFilterHandler = jest.fn();
        render(<TasksFilters title="Mock Title" setSelectedFilter={setSelectedFilterHandler}  />);
  
        const shortDurationButton = screen.getByRole('button', { name: "Reset"});
        await user.click(shortDurationButton);
        expect(setSelectedFilterHandler).toHaveBeenCalledTimes(1);
    });
  });