import { supabase } from "@/lib/supabase";
//import { Announcement } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAnnouncementList = () => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const { data, error } = await supabase.from('announcements').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useAnnouncement = (announcement_id: number) => {
    return useQuery({
        queryKey: ['announcements', announcement_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('announcements').select('*').eq('announcement_id', announcement_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('announcements').insert({
                title: data.title,
                image: data.image,
                sender: data.sender,
                content: data.content,
                date: data.date,
            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};

//Update
export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ announcement_id, ...update }: any) {
            const { data, error } = await supabase
                .from('announcements')
                .update(update)
                .eq('announcement_id', announcement_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { announcement_id }) {
            await queryClient.invalidateQueries({ queryKey: ['announcements'] });
            await queryClient.invalidateQueries({ queryKey: ['announcements', announcement_id] });
        },
    });
};

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(announcement_id: number) {
        const { error } = await supabase.from('announcements').delete().eq('announcement_id', announcement_id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['announcements'] });
      },
    });
  };