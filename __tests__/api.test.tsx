import { createNewEntry } from "@/utils/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TODO: Testing NextResponse and NextRequest with new NextJS 13 api router projects is currently
// difficult to do so effectively. Will revist this in future in order to implement proper unit and integration
// testing for the CRUD functions created.

// tried mocking next response but was unsuccesfull revist this

// test("testing if this works", async () => {
//   const res = await createNewEntry();
//   console.log("api", res)
// });
