import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useVisitorList = () => {
    return useQuery({
        queryKey: ['visitors'],
        queryFn: async () => {
            const { data, error } = await supabase.from('visitors').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//read announcement id, which means announcement details
export const useVisitor= (visitor_id: number) => {
    return useQuery({
        queryKey: ['visitors', visitor_id],
        queryFn: async () => {
            const { data, error } = await supabase.from('visitors').select('*').eq('visitor_id', visitor_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;

        }
    });
}

//Insert/Add announcement
export const useInsertVisitor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await supabase.from('visitors').insert({
                name: data.name,
                vehicle_number: data.vehicle_number,
                contact_number: data.contact_number,
                status: data.status,
                date: data.date,
                type: data.type,
            });

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['visitors'] });
        },
    });
};

//Update
export const useUpdateVisitor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({ visitor_id, ...update }: any) {
            const { data, error } = await supabase
                .from('visitors')
                .update(update)
                .eq('visitor_id', visitor_id)
                .select();

            if (error) {
                throw error;
            }
            return data;
        },
        async onSuccess(_, { visitor_id }) {
            await queryClient.invalidateQueries({ queryKey: ['visitors'] });
            await queryClient.invalidateQueries({ queryKey: ['visitors', visitor_id] });
        },
    });
};

export const useDeleteVisitor = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(visitor_id: number) {
        const { error } = await supabase.from('visitors').delete().eq('visitor_id', visitor_id);
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['visitors'] });
      },
    });
  };
