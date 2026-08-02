import { api } from "@/app/baseApi/baseApi";
import { notesDb } from "@/entities/showNotesList/model/getNotesListApi";

export const deleteNoteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteNote: builder.mutation({
      queryFn: async (id) => {
        try {
          await notesDb.delete(id);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["notesList"],
    }),
  }),
});

export const { useDeleteNoteMutation } = deleteNoteApi;
