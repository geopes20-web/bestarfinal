
-- Drop ALL restrictive policies and recreate as PERMISSIVE

-- APPOINTMENTS
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins doctors can manage appointments" ON public.appointments;

CREATE POLICY "Anyone can create appointments" ON public.appointments AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins doctors can manage appointments" ON public.appointments AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- CONSULTATIONS
DROP POLICY IF EXISTS "Anyone can create consultations" ON public.consultations;
DROP POLICY IF EXISTS "Admins doctors can manage consultations" ON public.consultations;

CREATE POLICY "Anyone can create consultations" ON public.consultations AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins doctors can manage consultations" ON public.consultations AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- CONTACT MESSAGES
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins doctors can manage messages" ON public.contact_messages;

CREATE POLICY "Anyone can send contact messages" ON public.contact_messages AS PERMISSIVE FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins doctors can manage messages" ON public.contact_messages AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- BEFORE AFTER CASES
DROP POLICY IF EXISTS "Published cases are viewable" ON public.before_after_cases;
DROP POLICY IF EXISTS "Admins doctors manage cases" ON public.before_after_cases;

CREATE POLICY "Published cases are viewable" ON public.before_after_cases AS PERMISSIVE FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins doctors manage cases" ON public.before_after_cases AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- BLOG POSTS
DROP POLICY IF EXISTS "Published posts are viewable" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins doctors manage posts" ON public.blog_posts;

CREATE POLICY "Published posts are viewable" ON public.blog_posts AS PERMISSIVE FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins doctors manage posts" ON public.blog_posts AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- SERVICES
DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
DROP POLICY IF EXISTS "Admins doctors manage services" ON public.services;

CREATE POLICY "Services are viewable by everyone" ON public.services AS PERMISSIVE FOR SELECT TO public USING (true);
CREATE POLICY "Admins doctors manage services" ON public.services AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- TESTIMONIALS
DROP POLICY IF EXISTS "Published testimonials are viewable" ON public.testimonials;
DROP POLICY IF EXISTS "Admins doctors manage testimonials" ON public.testimonials;

CREATE POLICY "Published testimonials are viewable" ON public.testimonials AS PERMISSIVE FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admins doctors manage testimonials" ON public.testimonials AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- DOCTOR SCHEDULE
DROP POLICY IF EXISTS "Schedule is viewable by everyone" ON public.doctor_schedule;
DROP POLICY IF EXISTS "Admins doctors manage schedule" ON public.doctor_schedule;

CREATE POLICY "Schedule is viewable by everyone" ON public.doctor_schedule AS PERMISSIVE FOR SELECT TO public USING (true);
CREATE POLICY "Admins doctors manage schedule" ON public.doctor_schedule AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

-- USER ROLES
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Users can read own roles" ON public.user_roles AS PERMISSIVE FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage roles" ON public.user_roles AS PERMISSIVE FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
