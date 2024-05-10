import { supabase } from "@/lib/supabase";

import { Tables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { initialisePaymentSheet } from '@/lib/stripe'


export const useContactList = () => {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const { data, error } = await supabase.from('contacts').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useContact= (contact_id: number) => {
    return useQuery({
        queryKey: ['contacts', contact_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('contacts').select('*').eq('contact_id', contact_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('contacts').insert({
                title: data.title,
                icon: data.icon,
                number: data.number,
                category: data.category,

            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });
};

//Update
export const useUpdateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ contact_id, ...update }: any) {
            const { data, error } = await supabase
                .from('contacts')
                .update(update)
                .eq('contact_id', contact_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { contact_id }) {
            await queryClient.invalidateQueries({ queryKey: ['contacts'] });
            await queryClient.invalidateQueries({ queryKey: ['contacts', contact_id] });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(contact_id: number) {
            const { error } = await supabase.from('contacts').delete().eq('contact_id', contact_id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });
};
