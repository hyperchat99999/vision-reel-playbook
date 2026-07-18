# Hand-Drawn Story Asset Provenance

The five color masters in `masters/` were generated specifically for Vision Reel with the built-in OpenAI image-generation route. They are original project assets, not copied from the upstream reference repository.

## Shared art direction

- Recurring creator: short dark curly bob, rust-red round glasses, mustard overshirt, cream top, dark teal trousers, coral notebook.
- Premium editorial graphite and dark-brown ink on warm recycled paper.
- Translucent gouache and watercolor washes, colored-pencil grain, restrained ochre/coral/teal palette.
- 3:4 portrait composition with the bottom 15% kept quiet for deterministic captions.
- No readable text, logos, watermarks, brands, or client material.

## Scene prompts

1. **Scattered:** creator at a desk surrounded by disconnected storyboards, waveform phone, photographs, notes, and laptop thumbnails; loose coral thread does not yet connect the evidence.
2. **Question:** same creator clears the clutter and circles one decisive question-shaped focus; coral thread connects her notebook to it.
3. **Shape:** three physical story paths—scroll, launch, and evidence collage—unfold on a worktable; she pulls the coral thread through the selected path.
4. **Proof:** three abstract claim/waveform cards connect one-to-one to three concrete evidence cards; she completes the final coral-thread connection.
5. **Film:** the finished three-part film reaches three engaged viewers; the creator and coral thread complete the causal arc.

Scene 1 established the strict identity and style reference for scenes 2–5. Runtime ink images are not separately generated. `starter/scripts/make-handdraw-layers.py` derives them from these exact masters and exports aligned WebP layers to `starter/app/public/handdraw-story/`.
