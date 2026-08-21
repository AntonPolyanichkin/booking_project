import { api } from "@/app/baseApi/baseApi";
import DbOperations from "@/shared/service/DbOperations";
export const notesDb = new DbOperations("clients");
const notesListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      async queryFn() {
        try {
          const data = await notesDb.getList();
          const notes = data?.map((note) => ({
            ...note,
            date: note.date.toMillis(),
          }));
          return { data: notes };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["notesList"],
    }),
   
  }),
});

export const { useGetAllNotesQuery,} = notesListApi;
