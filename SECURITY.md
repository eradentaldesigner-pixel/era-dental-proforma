# Proera Security Baseline — V19
Implemented:
- Vercel security headers (HSTS, nosniff, DENY framing, referrer/permissions policy, CSP).
- Supabase audit_logs table + triggers on core business tables.
- Duplicate-submit protection on Proforma, CRM and Technical Service save actions.
- Online/offline user warning.
- Mobile quick navigation.

Still requires a dedicated migration/test cycle before enabling:
- Private `service-photos` bucket + signed URLs (existing public URL records must be migrated safely).
- Role-enforced RLS matrix for owner/admin/sales/service/accounting/viewer.
- Soft-delete/trash retention for business records.
- CAPTCHA/MFA/leaked-password protection in Supabase Auth.
- Automated tenant-isolation penetration tests.
