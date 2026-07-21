## Summary

Describe the user-visible change and why it is needed.

## Public-content review

- [ ] Every source and asset is classified `PUBLIC` or reviewed `PUBLIC_AFTER_SANITIZATION`.
- [ ] No customer, private, environment, credential, recovery, audit, or unresolved material is included.
- [ ] Sanitized examples use only reserved example domains and addresses.
- [ ] Product, security, and compliance claims are supported and do not imply certification.

## Documentation quality

- [ ] Owner, audience, status, classification, and review metadata are proportionate and current.
- [ ] Navigation, related pages, redirects, links, images, and alt text are updated.
- [ ] Commands and examples were tested where feasible; destructive steps include recovery.
- [ ] Light, dark, keyboard, mobile, and search behavior were reviewed when affected.

## Validation

- [ ] `npm ci`
- [ ] `npm run validate`
- [ ] `git diff --check`

## Release and rollback

State preview/deployment impact, evidence location, and rollback. Write “No deployment change” when not applicable.
