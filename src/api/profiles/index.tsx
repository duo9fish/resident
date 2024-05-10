import { supabase } from "@/lib/supabase";
//import { Feedback } from "@/types";
import {  Tables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useProfileList = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const { data, error } = await supabase.from('profiles').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useProfile = (id: number) => {
    return useQuery({
        queryKey: ['id', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('id').select('*').eq('id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}
