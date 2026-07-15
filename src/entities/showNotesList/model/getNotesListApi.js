import { api } from "@/app/baseApi/baseApi";
import DbOperations from "@/shared/service/DbOperations";
const db = new DbOperations("clients");
const notesListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      async queryFn() {
        try {
          const data = db.getList();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["notesList"],
    }),
  }),
});

export const { useGetAllNotesQuery } = notesListApi;
