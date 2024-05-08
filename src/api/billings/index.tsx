import { supabase } from "@/lib/supabase";

import {  Tables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useBillingList = () => {
    return useQuery({
        queryKey: ['billings'],
        queryFn: async () => {
            const { data, error } = await supabase.from('billings').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useBilling = (billing_id: number) => {
    return useQuery({
        queryKey: ['billings', billing_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('billings').select('*').eq('billing_id', billing_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertBilling = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('billings').insert({
                title: data.title,
                price: data.price,
                status: data.status,
                due_date: data.due_date,
                
            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['billings'] });
        },
    });
};

//Update
export const useUpdateBilling = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ billing_id, ...update }: any) {
            const { data, error } = await supabase
                .from('billings')
                .update(update)
                .eq('billing_id', billing_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { billing_id }) {
            await queryClient.invalidateQueries({ queryKey: ['billings'] });
            await queryClient.invalidateQueries({ queryKey: ['billings', billing_id] });
        },
    });
};

export const useDeleteBilling = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(billing_id: number) {
        const { error } = await supabase.from('billings').delete().eq('billing_id', billing_id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['billings'] });
      },
    });
  };
