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

// vi.mock("@clerk/nextjs", () => {
//   // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
//   const mockedFunctions = {
//     auth: () => new Promise((resolve) => resolve({ userId: null })),
//     ClerkProvider: ({ children }) => <div>{children}</div>,
//     useUser: () => ({
//       isSignedIn: false,
//       user: null,
//     }),
//   };

//   return mockedFunctions;
// });

describe("Home UI tests", () => {
  vi.mock("next/font/google", () => {
    return {
      Inter: () => ({ className: "inter" }),
    };
  });

  test(`Home Snapshot test`, async () => {
    const home = render(await Home());
    expect(home).toMatchSnapshot();
  });

  test(`Testing Home page render basic text`, async () => {
    const screen = render(await Home());

    expect(screen.getByText("ScribeMe")).toBeTruthy();
    expect(screen.getByText("Get started")).toBeTruthy();

    const childComponent = screen.getByTestId("typewriter-wrapper");
    expect(childComponent).toBeInTheDocument();
  });

  test(`Testing dynamic routing when user is logged in`, async () => {
    const url = "/scribe";
    const screen = render(await Home());
    const dynamicLink = screen.getByTestId("routing");
    expect(dynamicLink).toHaveAttribute("href", url);
  });

  // test(`Testing dynamic routing when user is not signed in`, async () => {
  //   const url = "/new-user";
  //   const screen = render(await Home());
  //   const dynamicLink = screen.getByTestId("routing");
  //   expect(dynamicLink).toHaveAttribute("href", url);
  // });
});
