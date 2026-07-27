# Contributing

Thank you for improving Lightning IT Documentation. By contributing, you agree
that your contribution is licensed under the MIT License.

## Before writing

Read [AGENTS.md](./AGENTS.md). Confirm that the material is intentionally public
and does not depend on private infrastructure or customer context. Open a
private security report instead of a public issue when publication safety is
uncertain.

## Authoring workflow

1. Create a branch from `develop`.
2. Install exact dependencies with `npm ci`.
3. Add or edit Markdown; use MDX only for justified interaction.
4. Add proportionate document metadata and an explicit navigation entry.
5. Update redirects only for previously published stable paths.
6. Run `npm run validate` and `git diff --check`.
7. Review the rendered light, dark, mobile, keyboard, and search experience.
8. Open a pull request to `develop` and complete every applicable checklist
   item.

The pull request records technical review, but it does not by itself turn
pending document metadata into an approval claim. A contributor must not
self-approve. Product owners approve product positioning; security/compliance
maintainers approve related claims and mappings; code owners approve platform
changes. An approval record must identify the exact deterministic
documentation-tree digest and covered document identifiers. Propose the final
status fields before generating that digest; any later documentation change
requires a new request and independent review before the approval is effective.
Each approval record must use the approver role declared by its documents and a
reviewer explicitly authorized for that role in the protected authority policy.

## Review expectations

Reviewers verify public classification, accuracy, ownership, intended audience,
metadata, navigation, links, commands, accessible structure, and assurance
language. Operational instructions require a tested rollback or recovery path.
Migration reviews compare the approved source, transformation, sanitization,
and checksums without putting private findings in this repository.

## Generated references

Generated content must identify its public source repository and immutable
source commit. Update the generator and its validation together. Never make a
public pull-request workflow clone a private repository.

## Release flow

Validated content lands on `develop`. A separate reviewed promotion pull
request moves `develop` to `main`. Cloudflare deploys only `main`. Release and
rollback details are in [RELEASE.md](./RELEASE.md).
