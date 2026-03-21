
-- Fix ALL RLS policies: change from RESTRICTIVE to PERMISSIVE

-- appointments
DROP POLICY IF EXISTS "Admins doctors can manage appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anon can create appointments" ON public.appointments;
CREATE POLICY "Admins doctors can manage appointments" ON public.appointments FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Anon can create appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);

-- consultations
DROP POLICY IF EXISTS "Admins doctors can manage consultations" ON public.consultations;
DROP POLICY IF EXISTS "Anon can create consultations" ON public.consultations;
CREATE POLICY "Admins doctors can manage consultations" ON public.consultations FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Anon can create consultations" ON public.consultations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- contact_messages
DROP POLICY IF EXISTS "Admins doctors can view messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anon can send contact messages" ON public.contact_messages;
CREATE POLICY "Admins doctors can view messages" ON public.contact_messages FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Anon can send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

-- before_after_cases
DROP POLICY IF EXISTS "Admins doctors manage cases" ON public.before_after_cases;
DROP POLICY IF EXISTS "Published cases are viewable" ON public.before_after_cases;
CREATE POLICY "Admins doctors manage cases" ON public.before_after_cases FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Published cases are viewable" ON public.before_after_cases FOR SELECT TO public USING (is_published = true);

-- blog_posts
DROP POLICY IF EXISTS "Admins doctors manage posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Published posts are viewable" ON public.blog_posts;
CREATE POLICY "Admins doctors manage posts" ON public.blog_posts FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Published posts are viewable" ON public.blog_posts FOR SELECT TO public USING (is_published = true);

-- testimonials
DROP POLICY IF EXISTS "Admins doctors manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Published testimonials are viewable" ON public.testimonials;
CREATE POLICY "Admins doctors manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Published testimonials are viewable" ON public.testimonials FOR SELECT TO public USING (is_published = true);

-- services
DROP POLICY IF EXISTS "Admins doctors can manage services" ON public.services;
DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
CREATE POLICY "Admins doctors can manage services" ON public.services FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT TO public USING (true);

-- doctor_schedule
DROP POLICY IF EXISTS "Admins doctors manage schedule" ON public.doctor_schedule;
DROP POLICY IF EXISTS "Schedule is viewable by everyone" ON public.doctor_schedule;
CREATE POLICY "Admins doctors manage schedule" ON public.doctor_schedule FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));
CREATE POLICY "Schedule is viewable by everyone" ON public.doctor_schedule FOR SELECT TO public USING (true);

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- Storage: allow anon uploads to clinic-uploads
CREATE POLICY "Anyone can upload consultation photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'clinic-uploads');
CREATE POLICY "Anyone can view consultation photos" ON storage.objects FOR SELECT TO public USING (bucket_id = 'clinic-uploads');
