import React, { createContext, useState, useEffect, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/supabase";

type SupabaseSessionContextType = {
  session: Session | null;
  loading: boolean;
};

const SupabaseSessionContext = createContext<
  SupabaseSessionContextType | undefined
>(undefined);

export const SupabaseSessionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseSessionContext.Provider value={{ session, loading }}>
      {children}
    </SupabaseSessionContext.Provider>
  );
};

export const useSupabaseSession = () => {
  const context = useContext(SupabaseSessionContext);
  if (context === undefined) {
    throw new Error(
      "useSupabaseSession must be used within a SupabaseSessionProvider"
    );
  }
  return context;
};
