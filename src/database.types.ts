export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          announcement_id: number
          content: string
          created_at: string
          date: string | null
          image: string | null
          sender: string
          title: string
        }
        Insert: {
          announcement_id?: number
          content: string
          created_at?: string
          date?: string | null
          image?: string | null
          sender: string
          title: string
        }
        Update: {
          announcement_id?: number
          content?: string
          created_at?: string
          date?: string | null
          image?: string | null
          sender?: string
          title?: string
        }
        Relationships: []
      }
      billings: {
        Row: {
          billing_id: number
          created_at: string
          dueDate: string | null
          price: number
          status: string
          title: string
        }
        Insert: {
          billing_id?: number
          created_at?: string
          dueDate?: string | null
          price: number
          status: string
          title: string
        }
        Update: {
          billing_id?: number
          created_at?: string
          dueDate?: string | null
          price?: number
          status?: string
          title?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          category: string
          contact_id: number
          created_at: string
          icon: string
          number: string
          title: string
        }
        Insert: {
          category: string
          contact_id?: number
          created_at?: string
          icon: string
          number: string
          title: string
        }
        Update: {
          category?: string
          contact_id?: number
          created_at?: string
          icon?: string
          number?: string
          title?: string
        }
        Relationships: []
      }
      facilities: {
        Row: {
          created_at: string
          date: string | null
          end_time: string | null
          facility_id: number
          no_of_pax: string | null
          start_time: string | null
          status: string | null
          type: string | null
          remark: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          end_time?: string | null
          facility_id?: number
          no_of_pax?: string | null
          start_time?: string | null
          status?: string | null
          type?: string | null
          remark?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          end_time?: string | null
          facility_id?: number
          no_of_pax?: string | null
          start_time?: string | null
          status?: string | null
          type?: string | null
          remark?: string | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          category: string | null
          comment: string
          created_at: string
          date: string | null
          feedback_id: number
          image: string | null
          solution: string | null
          status: string | null
          title: string
          remark: string | null
        }
        Insert: {
          category?: string | null
          comment: string
          created_at?: string
          date?: string | null
          feedback_id?: number
          image?: string | null
          solution?: string | null
          status?: string | null
          title: string
          remark?: string | null
        }
        Update: {
          category?: string | null
          comment?: string
          created_at?: string
          date?: string | null
          feedback_id?: number
          image?: string | null
          solution?: string | null
          status?: string | null
          title?: string
          remark?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          group: string
          id: string
          phone_no: string | null
          unit_no: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          group?: string
          id: string
          phone_no?: string | null
          unit_no?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          group?: string
          id?: string
          phone_no?: string | null
          unit_no?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          contact_number: string
          created_at: string
          date: string
          name: string
          status: string | null
          type: string | null
          vehicle_number: string | null
          visitor_id: number
          remark: string 
        }
        Insert: {
          contact_number: string
          created_at?: string
          date: string
          name: string
          status?: string | null
          type?: string | null
          vehicle_number?: string | null
          visitor_id?: number
          remark?: string 
        }
        Update: {
          contact_number?: string
          created_at?: string
          date?: string
          name?: string
          status?: string | null
          type?: string | null
          vehicle_number?: string | null
          visitor_id?: number
          remark?: string 
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
