import { KontenbaseClient } from '@kontenbase/sdk';

export const kontenbase = new KontenbaseClient({
  apiKey: process.env.NEXT_PUBLIC_KONTENBASE_API_KEY,
});
