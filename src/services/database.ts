import { createClient } from '@supabase/supabase-js';

const databaseUrl = import.meta.env.VITE_DATABASE_URL!;
const key = import.meta.env.VITE_DB_KEY!;
const database = createClient(databaseUrl, key);

export default database;
