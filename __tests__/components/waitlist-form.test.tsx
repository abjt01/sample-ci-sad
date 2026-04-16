import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "@/components/waitlist-form";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("WaitlistForm", () => {
  it("renders the email input and submit button", () => {
    render(<WaitlistForm />);
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join waitlist/i })).toBeInTheDocument();
  });

  it("submit button is disabled when email is empty", () => {
    render(<WaitlistForm />);
    const btn = screen.getByRole("button", { name: /join waitlist/i });
    expect(btn).toBeDisabled();
  });

  it("enables submit button when valid email is typed", async () => {
    render(<WaitlistForm />);
    const input = screen.getByPlaceholderText("you@company.com");
    await userEvent.type(input, "test@example.com");
    const btn = screen.getByRole("button", { name: /join waitlist/i });
    expect(btn).not.toBeDisabled();
  });

  it("shows success message after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ position: 2401, alreadyRegistered: false }),
    });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/position #2401/i)).toBeInTheDocument();
    });
  });

  it("shows error message on API failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Please enter a valid email address" }),
    });

    render(<WaitlistForm />);
    await userEvent.type(screen.getByPlaceholderText("you@company.com"), "bad@bad.com");
    fireEvent.click(screen.getByRole("button", { name: /join waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });
});
