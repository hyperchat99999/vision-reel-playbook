# AI Generation Methods

AI generation is useful when it supports the product story, with the product staying central.

This page describes generic image/video generation patterns. It does not include private prompts, client assets, or proprietary source material.

## Replaceable Tool Families

The method works with several replaceable tool families:

- Image and video generation for character frames and short clips.
- Start-frame to end-frame video models for short animation.
- Editable vector generation for diagrams and asset drafts.
- Voice-generation services for consistent narration.

Treat all services as replaceable. The durable method is the approval gate, contact sheet, first-frame/last-frame review, cost preflight, and UI proof discipline.

## Cost Gate

Paid generation can burn credits quickly.

Before running jobs:

- Estimate cost.
- Get approval.
- Run one small de-risk test.
- Scale only after the test passes.
- Keep source prompts and generated files out of public repos unless they are safe to publish.

## Character Consistency Pattern

Use a two-stage workflow.

Stage A: build approved scene frames.

- Use a neutral contact sheet for identity.
- Generate a first frame and last frame.
- Keep the aspect ratio final-film native, usually 16:9.
- Review identity, wardrobe, hands, face, background, and screen geometry.

Stage B: animate.

- Use the approved first frame.
- Use the approved last frame.
- Add audio only if the clip needs speech or lip sync.
- Keep references minimal.

The identity should already be baked into the frames before video generation.

## Contact Sheets

A contact sheet is one image containing several views of the same character:

- Face front.
- Face three-quarter.
- Neutral expression.
- Explaining pose.
- Working pose.
- Full body or waist-up wardrobe reference.

Use a clean neutral background. Do not include logos, real office signage, or brand-sensitive artifacts.

## Shot Prompt Structure

Use structured shot language:

```text
1 shot, 6 seconds, 16:9.
Camera: slow push-in from medium shot to laptop screen.
Subject: professional product manager reviewing a workflow.
Action: glances at the screen, nods, gestures once.
Environment: modern neutral office, plain walls, no logos, no readable signage.
Style: calm, realistic, premium business film.
```

Keep prompts about composition, motion, and constraints. Avoid client names and private product names.

## UI And Character Seams

The hardest transition is generated human footage into flat product UI.

Useful seams:

- Person looks at laptop, then dip to full-screen UI.
- Over-the-shoulder shot with a blank glowing screen, then match-cut to real UI.
- Short neutral dip between styles.
- Use a screen-glow bridge frame.

Do not rely on generated models to invent accurate UI. Composite real UI or cut to real UI.

## Generated Clip Rules

- Use generated humans for context, emotion, or framing.
- Use real UI for product proof.
- Avoid hallucinated logos, badges, text, or dashboards.
- Avoid long lip-sync clips when short narrator-led shots will work.
- If speech quality or sync is uncertain, use a held portrait or gesture shot and let narrator audio carry the beat.
