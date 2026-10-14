-- Separate SQL proposal: NOT applied to the live database.
-- Preserves table/RPC names; permits only the requested cancellation transition.
begin;
do $patch$
declare body text; needle text := 'if new.status is distinct from old.status then raise exception ''Durumu değiştirmek için onay düğmelerini kullanın'';end if;';
begin
  select pg_get_functiondef('proera_private.guard_proforma_approval()'::regprocedure) into body;
  if position(needle in body)=0 then
    raise exception 'Beklenen onay koruma sürümü bulunamadı; SQL uygulanmadı. Mevcut fonksiyonu kontrol edin.';
  end if;
  body:=replace(body,needle,$replacement$
  if old.status='İptal edildi' and (to_jsonb(new)-'updated_at') is distinct from (to_jsonb(old)-'updated_at') then
    raise exception 'İptal edilmiş proforma değiştirilemez';
  end if;
  if new.status is distinct from old.status then
    if new.status='İptal edildi' and old.status is distinct from 'Onaylandı' and old.approval_state is distinct from 'approved' then
      if (to_jsonb(new)-array['status','status_changed_at','updated_at']) is distinct from (to_jsonb(old)-array['status','status_changed_at','updated_at']) then
        raise exception 'İptal sırasında belge içeriği değiştirilemez';
      end if;
    else
      raise exception 'Durumu değiştirmek için onay düğmelerini kullanın';
    end if;
  end if;
$replacement$);
  execute body;
end $patch$;
-- RESTRICTIVE combines with the existing permissive policies rather than replacing them.
do $$ begin
  if not exists(select 1 from pg_policies where schemaname='public' and tablename='proformas' and policyname='a4_proformas_delete_protection') then
    create policy a4_proformas_delete_protection on public.proformas as restrictive for delete to authenticated
    using (public.has_company_role(company_id,array['owner','admin']::text[])
      and status is distinct from 'Onaylandı' and approval_state is distinct from 'approved');
  end if;
end $$;
commit;
-- No rows are modified or deleted by this script.
-- Existing operational lock, approval checks and audit triggers remain active.
-- Verify: select policyname,permissive,cmd,qual from pg_policies where schemaname='public' and tablename='proformas';
