import { api } from "@/app/baseApi/baseApi";
import { notesDb } from "@/entities/showNotesList/model/getNotesListApi";

export const editNoteStatusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    editNoteStatus: builder.mutation({
      queryFn: async ({ id, status }) => {
        try {
          await notesDb.update(id, { status });
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["notesList"],
    }),
  }),
});

export const { useEditNoteStatusMutation } = editNoteStatusApi;
