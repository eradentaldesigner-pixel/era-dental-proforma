-- Davetli hesap baska bir sirkete uye olsa da bu sirketin davetini kabul edebilir.
-- Mevcut sirket/uyelik ve roller korunur. Yalnizca dogrulanmis e-posta icin
-- halen gecerli, hedef sirkete ait davet kabul edilir.
begin;

create or replace function proera_private.accept_company_invitation(p_company_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $fn$
declare
  v_actor uuid := auth.uid();
  v_email text;
  v_invitation public.company_invitations%rowtype;
begin
  if v_actor is null then raise exception 'Giriş gerekli'; end if;
  select lower(u.email) into v_email
    from auth.users u
    where u.id = v_actor and u.email_confirmed_at is not null;
  if v_email is null then raise exception 'Önce e-posta adresinizi doğrulayın'; end if;

  -- Yalnizca davet edilen sirketin mevcut uyesi ise yeniden katilmaya gerek yok.
  if exists (select 1 from public.company_members m
             where m.company_id = p_company_id and m.user_id = v_actor) then
    return p_company_id;
  end if;

  select * into v_invitation from public.company_invitations i
    where i.company_id = p_company_id and i.email = v_email
      and i.accepted_at is null and i.expires_at > now()
    for update;
  if not found then return null; end if;

  insert into public.company_members (company_id,user_id,role)
    values (v_invitation.company_id,v_actor,v_invitation.role);
  update public.company_invitations
    set accepted_at = now(), accepted_by = v_actor
    where id = v_invitation.id;
  return v_invitation.company_id;
end $fn$;

revoke all on function proera_private.accept_company_invitation(uuid) from public, anon;
grant execute on function proera_private.accept_company_invitation(uuid) to authenticated;
commit;

-- Kontrol: cagrı merkezi daveti var mi? Sonucta rol 'call_center' olmali.
select i.email, c.name as sirket, i.role, i.expires_at, i.accepted_at
from public.company_invitations i
join public.companies c on c.id = i.company_id
where i.email = 'ozlem@eradental.com';
