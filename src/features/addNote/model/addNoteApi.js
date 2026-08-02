import { api } from "@/app/baseApi/baseApi";
import { notesDb } from "@/entities/showNotesList/model/getNotesListApi";

export const addNote = api.injectEndpoints({
  endpoints: (builder) => ({
    addNote: builder.mutation({
      queryFn: async (credentials) => {
        try {
          await notesDb.add({ ...credentials, status: "Заплановано" });
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["notesList"],
    }),
  }),
});

export const { useAddNoteMutation } = addNote;
