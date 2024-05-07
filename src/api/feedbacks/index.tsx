import { supabase } from "@/lib/supabase";
//import { Feedback } from "@/types";
import {  Tables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useFeedbackList = () => {
    return useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const { data, error } = await supabase.from('feedbacks').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useFeedback = (feedback_id: number) => {
    return useQuery({
        queryKey: ['feedbacks', feedback_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('feedbacks').select('*').eq('feedback_id', feedback_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('feedbacks').insert({
                title: data.title,
                image: data.image,
                comment: data.comment,
                date: data.date,
                status: data.status,
                category: data.category,
                solution: data.solution,
            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
        },
    });
};

//Update
export const useUpdateFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ feedback_id, ...update }: any) {
            const { data, error } = await supabase
                .from('feedbacks')
                .update(update)
                .eq('feedback_id', feedback_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { feedback_id }) {
            await queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
            await queryClient.invalidateQueries({ queryKey: ['feedbacks', feedback_id] });
        },
    });
};

export const useDeleteFeedback = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(feedback_id: number) {
        const { error } = await supabase.from('feedbacks').delete().eq('feedback_id', feedback_id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      },
    });
  };
