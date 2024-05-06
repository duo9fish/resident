import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

// Type definition for the authentication data that will be held in context.
type AuthData = {
    session: Session | null; // The current user session
    loading: boolean;
    profile: any;
    isAdmin: boolean;
};

// Creating a context for authentication with a default value.
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
});

// AuthProvider component which will wrap the application and provide authentication context.
export default function AuthProvider({ children }: PropsWithChildren) {

    // State hooks to keep track of session, profile, and loading state
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect to perform side effects related to authentication.
    useEffect(() => {

        // A function to fetch and set the user's session and profile.
        const fetchSession = async () => {
            // Fetching the current session.
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);// Updating session state.

            // If a session exists, fetch the user's profile
            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }
            setLoading(false); // Set loading to false after fetching session and profile.
        }
        fetchSession();

        // Listening to authentication state changes (e.g., login, logout)
        //redirect to sign in page after user sign out
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session); // Update the session state on auth changes.
        });


    }, []);

    console.log(profile);


    return <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>{children}</AuthContext.Provider>;
}

// Custom hook to provide easy access to the authentication context.
export const useAuth = () => useContext(AuthContext);