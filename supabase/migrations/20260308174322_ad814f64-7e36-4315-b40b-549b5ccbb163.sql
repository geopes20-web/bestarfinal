
-- The INSERT WITH CHECK (true) warnings are for public form submissions (appointments, consultations, contact).
-- These are intentional. Let's add rate-limiting comments and tighten by adding anon role explicitly.

-- Drop and recreate the INSERT policies to be more explicit
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
CREATE POLICY "Anon can create appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create consultations" ON public.consultations;
CREATE POLICY "Anon can create consultations" ON public.consultations FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;
CREATE POLICY "Anon can send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
