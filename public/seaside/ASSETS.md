# Kamakura reference artwork layers

Generated with the built-in imagegen tool from the user-supplied Kamakura Seaside Train Station.png. Source files are retained at their generated locations; project copies live here.

Prompt set:
- Background: faithfully retain the reference watercolor colors, grain, blue ocean, cumulus clouds, island, sailboat, platform, railing and road. Remove train, station canopy/supports, signs, bench, all overhead wires, poles, pantograph and crossing gate. Reveal the hidden background without changing the medium.
- Station: extract only the reference canopy, timber beams/supports, station sign, timetable and bench onto a transparent landscape canvas. Preserve brushwork, cream sunlit edges and blue shadows. Exclude train, ground, sea, sky, wires and poles.
- Train: extract/reconstruct only the cream and green right-facing Enoden carriage on transparency, preserving watercolor texture, reflective windows, passenger silhouettes, logo, doors and undercarriage. Fill occluded areas consistently; remove all roof equipment, wires, station objects, railing and background.

The extracted foreground layers were registered in SeasideScene.jsx to match the reference object footprints. These are painted depth layers in Three.js, not complete volumetric train or station meshes. Hidden surfaces are inferred; the asset is not an exact pixel reproduction.

## Revision: transparent sky and complete train

Built-in imagegen edits:
- Background v2: remove ONLY blue sky above the ocean horizon, replace with genuine transparency, retain white cumulus clouds and their painted blue shading. Preserve the ocean, island, sailboat, railing, platform and road in place.
- Train v2: produce a complete two-carriage connected train with both rounded outer cabs fully visible, a central accordion/coupler, reflective windows, passengers and wheels. Retain the cream/green watercolor reference style; no roof antenna, background or ground; transparent wide canvas with padding.

## Revision: left-high/right-low composition

Built-in imagegen prompt: move the tall cumulus mass from the right to the left, keeping the lower sea, island, sailboat, railing, platform and road in place. Clouds peak in the left 0–35%, taper through 35–55%, leaving the upper right transparent. Preserve watercolor texture and transparent sky. Asset: background-v3.png.

The decor occupies 68% of the desktop frame. The WebGL canvas spans the full frame so the complete two-car train can travel off the right edge without the decor mask clipping it.

## Revision: continuous coastal background

Built-in imagegen edit/outpaint prompt: extend the source into a 2.55:1 transparent watercolor plate, with the reference at the left 68%. Tall left clouds taper into a low right coastal ribbon; the upper right remains transparent. Continue sparkling ocean, low white railing, yellow strip, horizontal railway at 79–83% image height, and roadway all the way to the right edge. Preserve brushwork and palette; no train, station canopy, poles, wires or new buildings. No hard triangular cut or mid-scene fade. Asset: background-v4.png.

The full-width background replaces the previous background fade. The train and foreground station remain separately animated/rendered layers. Mobile crops the right outpaint to retain the station's scale.

## Current runtime: watercolor depth layers

`SeasideScene.jsx` uses the original watercolor assets as three registered DOM layers: background-v4.png, train-v2.png, and station.png. GSAP brings the train in once, decelerating to a fixed platform stop. The station overlays the train; restrained contact shadows and small pointer-driven depth offsets support the painted perspective. All layers share one responsive composition, including its mobile crop. Reduced-motion mode parks the train immediately. Animation pauses off the home section and in hidden browser tabs.

This is a 2.5D painted composition, not volumetric geometry. The experimental procedural model and its Three.js dependency have been removed. Earlier asset-generation notes above describe the source artwork history, not the current renderer.

## Village-style sign lettering

Runtime foreground: `station-village.png`, edited with built-in imagegen from `station.png`; original retained. Prompt: change only the hanging sign lettering to rounded, hand-painted blue fictional glyphs inspired by Animal Crossing signage, replace the round badge character with a leaf pictogram, and preserve the watercolor station, green arrows, framing and transparency. Generated source: `exec-b104904d-08bf-4ff6-97a4-73930fd3e31a.png`.

## Village train badges and softer palette

`train-village.png` is a built-in imagegen edit of `train-v2.png`. Prompt: replace both Japanese/ENODEN emblems with hand-painted leaves and rounded fictional glyphs, preserving the train geometry, watercolor texture, transparent padding and placement. Original asset retained. Scene-wide CSS saturation is 68%; the coastal background fades diagonally from 24% to fully transparent at 65% along a 35-degree gradient.

Round badge revision: `train-village-round.png`, edited with built-in imagegen. Prompt: change only both leaf emblems into compact round green badges with cream circular rims and a leaf inside, retaining fictional glyphs below, framing, transparency and the watercolor train. Runtime uses this version; saturation and fade remain unchanged.

Norah badge revision: runtime `train-n-badge.png`, built-in imagegen edit. Prompt: replace only the cream leaf inside both round green badges with a clear, friendly hand-painted capital N for Norah; preserve circular rims, fictional lettering, train placement, watercolor and alpha. Source: exec-bfb00492-2f97-4b92-b6b0-d796ff54ca51.png.
