import { supabase } from "@/lib/supabase";
//import { Feedback } from "@/types";
import {  Tables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useFacilityList = () => {
    return useQuery({
        queryKey: ['facilities'],
        queryFn: async () => {
            const { data, error } = await supabase.from('facilities').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useFacility= (facility_id: number) => {
    return useQuery({
        queryKey: ['facilities', facility_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('facilities').select('*').eq('facility_id', facility_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertFacility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('facilities').insert({
                start_time: data.start_time,
                end_time: data.end_time,
                date: data.date,
                status: data.status,
                type: data.type,
                no_of_pax: data.no_of_pax,
                remark: data.remark,
            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['facilities'] });
        },
    });
};

//Update
export const useUpdateFacility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ facility_id, ...update }: any) {
            const { data, error } = await supabase
                .from('facilities')
                .update(update)
                .eq('facility_id', facility_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { facility_id }) {
            await queryClient.invalidateQueries({ queryKey: ['facilities'] });
            await queryClient.invalidateQueries({ queryKey: ['facilities', facility_id] });
        },
    });
};

export const useDeleteFacility = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(facility_id: number) {
        const { error } = await supabase.from('facilities').delete().eq('facility_id', facility_id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['facilities'] });
      },
    });
  };
