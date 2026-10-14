-- Bu ekleme mevcut proje üzerinde uygulanıp doğrulandı. Tekrar çalıştırmak güvenlidir.
alter table public.company_settings add column if not exists slogan text not null default '', add column if not exists solutions jsonb not null default '[]'::jsonb;
do $$ begin if not exists (select 1 from pg_constraint where conname='company_settings_solutions_array_max5' and conrelid='public.company_settings'::regclass) then alter table public.company_settings add constraint company_settings_solutions_array_max5 check (jsonb_typeof(solutions)='array' and jsonb_array_length(solutions)<=5); end if; end $$;
