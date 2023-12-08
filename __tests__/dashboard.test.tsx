import { render } from "@testing-library/react";
import { vi } from "vitest";
import DashboardLayout from "../app/(dashboard)/layout";
import ScribePage from "../app/(dashboard)/scribe/page";
import JournalEditorPage from "../app/(dashboard)/scribe/[id]/page";

vi.mock("@clerk/nextjs", () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) => resolve({ userId: "test_user_id_vite" })),
    UserButton: (props) => <div></div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "test_user_dashboard_id_vite",
        fullName: "test_user vitest",
      },
    }),
  };

  return mockedFunctions;
});

describe("Dashboard UI tests", () => {
  test(`Dashboard Snapshot test with journal list page`, async () => {
    const dashboard = render(await DashboardLayout(<ScribePage />));
    expect(dashboard).toMatchSnapshot();
  });

  test(`Dashboard Snapshot test with journal editor page`, async () => {
    const dashboard = render(await DashboardLayout(<JournalEditorPage />));
    expect(dashboard).toMatchSnapshot();
  });

  test(`Dashboard testing basic ui and routing`, async () => {
    const screen = render(await DashboardLayout(<div>Test</div>));

    const li = screen.container.getElementsByTagName("li");
    expect(li).toHaveLength(3);

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Journals")).toBeTruthy();
    expect(screen.getByText("History")).toBeTruthy();

    const links = screen.container.getElementsByTagName("a");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/scribe");
    expect(links[2]).toHaveAttribute("href", "/history");
  });
});
