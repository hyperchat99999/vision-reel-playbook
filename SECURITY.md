# Security And Privacy

This repo is designed to avoid sensitive material.

## Do Not Report Publicly

If you find an accidental secret, private path, real client name, real person name, private prompt, or proprietary asset, do not open a public issue with the sensitive value.

Instead, open a minimal issue that says a safety concern exists and identify the file without copying the sensitive string.

## Safety Checks

Run:

```bash
npm run scan:ip
```

The built-in scanner is intentionally conservative. Teams should add their own denylist before publishing.

