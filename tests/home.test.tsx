import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../app/page";

vi.mock("@clerk/nextjs", () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) => resolve({ userId: "test_user_id_vite" })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "test_user_id_vite",
        fullName: "test_user vitest",
      },
    }),
  };

  return mockedFunctions;
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  };
});

test(`Testing Home page render`, async () => {
  const home = render(await Home());
  expect(
    screen.getByText("Journel and reflect on yourself over time.")
  ).toBeTruthy();
  expect(screen.getByText("Get started")).toBeTruthy();

  expect(home).toMatchSnapshot();
});
