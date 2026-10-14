-- OPTIONAL: not applied to the live database. Local drafts work without this table.
begin;
create table if not exists public.proforma_drafts (
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now(),
  primary key (company_id, user_id)
);
alter table public.proforma_drafts enable row level security;
revoke all on public.proforma_drafts from anon;
grant select, insert, update on public.proforma_drafts to authenticated;
-- No DELETE permission is needed by this application.
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='proforma_drafts' and policyname='own_company_draft_read') then
    create policy own_company_draft_read on public.proforma_drafts for select to authenticated
    using (user_id=(select auth.uid()) and exists (select 1 from public.company_members m where m.company_id=proforma_drafts.company_id and m.user_id=(select auth.uid())));
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='proforma_drafts' and policyname='own_company_draft_insert') then
    create policy own_company_draft_insert on public.proforma_drafts for insert to authenticated
    with check (user_id=(select auth.uid()) and exists (select 1 from public.company_members m where m.company_id=proforma_drafts.company_id and m.user_id=(select auth.uid())));
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='proforma_drafts' and policyname='own_company_draft_update') then
    create policy own_company_draft_update on public.proforma_drafts for update to authenticated
    using (user_id=(select auth.uid()) and exists (select 1 from public.company_members m where m.company_id=proforma_drafts.company_id and m.user_id=(select auth.uid())))
    with check (user_id=(select auth.uid()) and exists (select 1 from public.company_members m where m.company_id=proforma_drafts.company_id and m.user_id=(select auth.uid())));
  end if;
end $$;
commit;
-- Verify: select tablename,policyname,cmd from pg_policies where schemaname='public' and tablename='proforma_drafts';
