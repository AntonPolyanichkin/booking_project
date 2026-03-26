
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "notes",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["note", "notesList"],
  endpoints: () => ({}),
});
