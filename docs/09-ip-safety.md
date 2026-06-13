# IP Safety

Public repos and public films need a safety pass.

## Never Publish

- Client names.
- Client logos.
- Internal project names.
- Real employee names.
- Real screenshots.
- Proprietary prompts.
- API keys.
- Voice files from private projects.
- Generated assets with unclear rights.
- Local absolute paths.
- Meeting notes, review comments, or production logs.

## Use Fictional Examples

Use neutral placeholders:

- Acme Skills Platform.
- Jordan Lee.
- Riley Chen.
- Finance Analyst.
- Customer Success Manager.
- North Region.
- Example Corp.

Keep sample numbers generic and clearly fictional.

## Prompt Safety

Before publishing prompt templates:

- Remove client context.
- Remove real brand palettes.
- Remove private character descriptions.
- Remove references to private screenshots.
- Keep only reusable structure.

## Text Scan

Scan for:

- Company names.
- Real people.
- Internal codenames.
- Local paths.
- API key patterns.
- Private tool IDs.
- Proprietary product terms.

The starter includes a generic `ip-scan` script. Expand its denylist for your organization before publishing.

## Asset Provenance

Every public asset should have one of:

- Created specifically for this repo.
- Licensed for public reuse.
- Generated with rights suitable for publishing.
- Replaced by a placeholder.

When unsure, leave it out.

