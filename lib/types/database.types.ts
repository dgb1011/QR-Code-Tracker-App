export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          name: string
          date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          date?: string | null
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          event_id: string | null
          name: string
          staff_code: string
          password_hash: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          name: string
          staff_code: string
          password_hash: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          name?: string
          staff_code?: string
          password_hash?: string
          is_active?: boolean
          created_at?: string
        }
      }
      attendees: {
        Row: {
          id: string
          event_id: string | null
          name: string
          email: string | null
          photo_url: string | null
          qr_code: string
          checked_in: boolean
          checked_in_at: string | null
          checked_in_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          name: string
          email?: string | null
          photo_url?: string | null
          qr_code: string
          checked_in?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          name?: string
          email?: string | null
          photo_url?: string | null
          qr_code?: string
          checked_in?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          created_at?: string
        }
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
  }
}

