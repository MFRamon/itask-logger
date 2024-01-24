import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SelectedTaskDetail from "@/components/SelectedTaskDetail/SelectedTaskDetail";
import { Task } from "@/pages";

describe("SelectedTaskDetail", () => {
  it("should be able to render", () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 0,
    };
    render(<SelectedTaskDetail task={mockTask} />);
    const element = screen.getByTestId("selected-task-detail");
    expect(element).toBeInTheDocument();
  });

  it('should have a "Selected Task:" heading', () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 0,
    };
    render(<SelectedTaskDetail task={mockTask} />);
    const headerText = screen.getByRole("heading", {
      name: "Selected Task:",
    });
    expect(headerText).toHaveTextContent("Selected Task:");
  });

  it("should render the task description", () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 0,
    };
    render(<SelectedTaskDetail task={mockTask} />);

    const description = screen.getByTestId("task-0-description");
    expect(description).toHaveTextContent("Description: To paint");
  });

  it("should render the task status", () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 30,
    };
    render(<SelectedTaskDetail task={mockTask} />);

    const description = screen.getByTestId("task-0-status");
    expect(description).toHaveTextContent("Status: PENDING");
  });

  it("should render the task duration", () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 30,
    };
    render(<SelectedTaskDetail task={mockTask} />);

    const description = screen.getByTestId("task-0-duration");
    expect(description).toHaveTextContent("Duration: 60");
  });

  it("should render the task duration", () => {
    const mockTask: Task = {
      id: 0,
      description: "To paint",
      duration: 60,
      status: "PENDING",
      timeToFinish: 30,
    };
    render(<SelectedTaskDetail task={mockTask} />);

    const description = screen.getByTestId("task-0-remaining-time");
    expect(description).toHaveTextContent("Remaining minutes: 30");
  });

  it("should render a placeholder if not task is passed", () => {
    render(<SelectedTaskDetail task={undefined} />);
    const noTaskPlaceholder = screen.getByTestId("selected-task-placeholder");
    expect(noTaskPlaceholder).toHaveTextContent("No task selected");
  });
});
