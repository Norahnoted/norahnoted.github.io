'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRouter } from 'next/navigation';
import { workData } from '@/assets/assets';
import { tagCls, tagLabel } from './tagStyles';
import Spotlight from './Spotlight';

const RESUME_HREF = '/NorahZhou_Resume_2603.pdf';

// The three folders in the archive box, front-to-back, mapped to the Work tabs.
// `short` is what fits on the physical tab (~40x9px on screen); the full label still
// shows in the hover hint.
const FOLDERS = [
  { node: 'folderA', label: 'Web Development', short: 'WEB DEV' },
  { node: 'folderB', label: 'Business Analysis', short: 'BUSINESS' },
  { node: 'folderC', label: 'Product Design', short: 'PRODUCT' },
];

// The cards carry the full Recent Work layout, which is taller than the frame can
// take at full size — sit them back a little so the folder still shows behind. A
// phone is tighter still: the same card wraps to nearly twice the height there.
const CARD_SCALE = 0.82;
const CARD_SCALE_NARROW = 0.76;

// The opened folder's prints fan out like a hand of cards instead of a static
// scatter: one project centred and forward-facing, the rest spread to either side,
// tilted and dropped along an arc. This also means a category isn't capped at a
// fixed number of slots — every project in it is reachable by paging through.
const CAROUSEL_STEP = 14; // % horizontal offset per card, one step off-centre
const CAROUSEL_STEP_NARROW = 18; // narrow frame: cards sit closer, so space them out more
const CAROUSEL_VISIBLE = 2; // cards rendered on each side of centre, wide screens
const CAROUSEL_VISIBLE_NARROW = 1; // a phone only has room either side for one
const FAN_ANGLE = 11; // degrees of tilt per step off-centre
const FAN_DROP = 5; // % the fan arcs downward per step off-centre

// Signed distance from the centred card, taking the shortest way around the loop
// (so paging past the last card wraps to the first from whichever side is nearer).
function carouselOffset(index, center, total) {
  let diff = index - center;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

// Position, scale, tilt and fade for a card at a given signed offset from centre —
// a fanned hand of cards: forward, level and full-size at 0, smaller/tilted/fainter
// and dropped along the arc the further out, and clipped past `visible` so far-side
// cards wait off-frame instead of crowding in.
function carouselLayout(offset, { step, visible, cardScale }) {
  const abs = Math.abs(offset);
  const clamped = Math.max(-(visible + 1), Math.min(visible + 1, offset));
  return {
    x: 50 + clamped * step,
    y: abs * FAN_DROP,
    // The front card also gets a small scale bump of its own, on top of the usual
    // shrink-with-distance — it should visibly pop forward, not just sit unshrunk.
    scale: cardScale * (abs < 0.5 ? 1.05 : Math.max(0.48, 1 - abs * 0.18)),
    rotate: clamped * FAN_ANGLE,
    // Falls off hard: a side card should read as background, not a near-twin of the
    // centred one. Saturation/brightness dim alongside it for the same reason.
    opacity: abs > visible ? 0 : Math.max(0.22, 1 - abs * 0.42),
    saturate: Math.max(0.5, 1 - abs * 0.3),
    brightness: Math.max(0.72, 1 - abs * 0.14),
    z: 100 - abs,
    interactive: abs <= visible,
  };
}

// Papers spill out of the folder's mouth, a little below the middle of the frame.
const SPILL_ORIGIN = { x: 50, y: 46 };
// Vertical centre of the carousel — sits over the folder's upper half, near where the
// tab and open flap read, rather than the viewport's own middle.
const CAROUSEL_ORIGIN_Y = 30;

// The spotlight's default pick, previewed on the closed laptop screen.
const PREVIEW_PROJECT_ID = 'elections-ontario';

const HOVER_COPY = {
  printer: 'Print my resume',
  laptop: 'Recent work',
};

// A square 90deg shut lands the lid flat on the base (verified against the render;
// past ~95deg it swings through the base and exposes the keyboard again). The small
// lift clears the keycaps, which top out just above the hinge height.
const LID_CLOSED_ANGLE = Math.PI / 2;
const LID_CLOSED_LIFT = 0.004;

// The screen panel leans back about 18deg; the close-up camera sits on that normal.
const SCREEN_TILT = 0.32;

// The archive box out-scales the printer and laptop in the raw model; bring it back in
// line. Its origin is bottom-centre, so a uniform scale keeps it seated on the desk.
const ARCHIVE_BOX_SCALE = 0.82;

// Outline meshes ship as flat siblings under `outlines`; re-parent each one onto the
// mesh it outlines so it follows that part when the part animates. They are LINES
// primitives, which Three.js raycasts against a world-unit threshold — on a scene this
// small that makes every outline hit from any pointer position, so opt them out entirely.
function reparentOutlines(root) {
  const outlines = root.getObjectByName('outlines');
  if (!outlines) return;
  for (const outline of [...outlines.children]) {
    outline.raycast = () => {};
    const sourceName = outline.name.replace(/Outline$/, '');
    const source = root.getObjectByName(sourceName);
    if (source && source !== outline) source.attach(outline);
  }
  if (outlines.children.length === 0) outlines.removeFromParent();
}

// The three folders share their body material in the GLB (they're copies of one
// asset), so tinting one would tint all of them — clone each mesh's material first,
// then tint just that folder's copy. `skip` carries objects that must stay their own
// colour (the tab's printed plate, the paper sheets inside) even though they hang
// off the same folder group.
function tintFolderBody(folder, skip, hex) {
  if (!folder) return;
  const color = new THREE.Color(hex);
  const skipSet = new Set(skip.filter(Boolean));
  folder.traverse((child) => {
    if (!child.isMesh || !child.material || skipSet.has(child)) return;
    child.material = Array.isArray(child.material)
      ? child.material.map((m) => m.clone())
      : child.material.clone();
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    mats.forEach((m) => {
      if (m.color) {
        m.color.copy(color);
        m.needsUpdate = true;
      }
    });
  });
}

// Each folder gets its own colour so a visitor can pick a category out at a
// glance: Web Development a pale butter cream, Business Analysis a soft sky
// blue, Product Design a pale sage green (`null` would skip a folder and keep
// the GLB's own colour, unused here since all three are tinted). Ordered to
// match FOLDERS above.
const FOLDER_TINTS = ['#FFF8D6', '#BFDDE6', '#C7D5A6'];

// What the laptop shows before it is opened: a small still of the spotlight section,
// so the screen previews what clicking it leads to.
function makeScreenPreview(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 620;
  canvas.height = 392; // the panel is ~1.58:1
  const ctx = canvas.getContext('2d');

  const draw = (image) => {
    ctx.fillStyle = '#F7F6F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Intro on one line, mirroring the open screen: grey copy either side of the
    // green category the wheel is parked on.
    const greyFont = '400 19px Helvetica, Arial, sans-serif';
    const greenFont = '600 22px Helvetica, Arial, sans-serif';
    const lead = 'Only have time for one';
    const category = project.description || 'Service Design';
    const tail = 'work? See this.';

    ctx.textAlign = 'left';
    ctx.font = greyFont;
    const leadW = ctx.measureText(lead).width;
    const tailW = ctx.measureText(tail).width;
    ctx.font = greenFont;
    const catW = ctx.measureText(category).width;
    const gap = 16;
    let cursor = (canvas.width - (leadW + catW + tailW + gap * 2)) / 2;
    const introY = 62;

    ctx.font = greyFont;
    ctx.fillStyle = '#8d8677';
    ctx.fillText(lead, cursor, introY);
    cursor += leadW + gap;
    ctx.font = greenFont;
    ctx.fillStyle = '#9DB86A';
    ctx.fillText(category, cursor, introY);
    cursor += catW + gap;
    ctx.font = greyFont;
    ctx.fillStyle = '#8d8677';
    ctx.fillText(tail, cursor, introY);

    // The project card.
    const cardX = 52, cardY = 104, cardW = canvas.width - 104, cardH = 190;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e5e2da';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    const imgW = cardW * 0.58;
    if (image && image.complete && image.naturalWidth) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, imgW, cardH, [16, 0, 0, 16]);
      ctx.clip();
      const scale = Math.max(imgW / image.naturalWidth, cardH / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      ctx.drawImage(image, cardX + (imgW - w) / 2, cardY + (cardH - h) / 2, w, h);
      ctx.restore();
    }

    const textX = cardX + imgW + 24;
    const textW = cardW - imgW - 48;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1f2937';
    ctx.font = '600 21px Helvetica, Arial, sans-serif';
    const words = (project.title || '').split(' ');
    let lineText = '';
    let lineY = cardY + 58;
    for (const word of words) {
      const next = lineText ? `${lineText} ${word}` : word;
      if (ctx.measureText(next).width > textW) {
        ctx.fillText(lineText, textX, lineY);
        lineY += 27;
        lineText = word;
      } else {
        lineText = next;
      }
    }
    if (lineText) ctx.fillText(lineText, textX, lineY);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '400 17px Helvetica, Arial, sans-serif';
    ctx.fillText(project.description || '', textX, lineY + 30);

    // Tag chip.
    const tag = project.tags?.[0];
    if (tag) {
      ctx.font = '400 15px Helvetica, Arial, sans-serif';
      const tagW = ctx.measureText(tag).width + 26;
      ctx.fillStyle = '#e5e0cd';
      ctx.beginPath();
      ctx.roundRect(textX, lineY + 46, tagW, 28, 14);
      ctx.fill();
      ctx.fillStyle = '#5c5340';
      ctx.fillText(tag, textX + 13, lineY + 65);
    }

    // "See all projects →", bold in the brand accent, matching the real link.
    ctx.textAlign = 'center';
    ctx.font = '700 18px Helvetica, Arial, sans-serif';
    ctx.fillStyle = '#7a8f4a';
    const linkY = cardY + cardH + 42;
    ctx.fillText('See all projects  →', canvas.width / 2, linkY);

    texture.needsUpdate = true;
  };

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  draw(null);
  if (project.bgImage) {
    const image = new Image();
    image.onload = () => draw(image);
    image.src = project.bgImage;
  }

  return texture;
}

// Folder tab labels. The plate is 0.07 x 0.016 (a 4.4:1 strip), so the texture matches
// that ratio and the text is drawn large within it to survive the downscale.
function makeTabLabelTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fdfcf7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#4a4436';
  ctx.font = '700 64px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Squeeze to fit rather than overflow the plate on the longer words.
  const maxWidth = canvas.width - 48;
  const width = ctx.measureText(text).width;
  if (width > maxWidth) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(maxWidth / width, 1);
    ctx.fillText(text, 0, 4);
    ctx.restore();
  } else {
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// The printed page: the top of a resume drawn small, so the sheet leaving the printer
// reads as an actual document rather than a blank rectangle.
function makeResumeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 660;
  canvas.height = 468; // matches the sheet's 0.155 x 0.11 top face
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fdfbf6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const left = 54;
  const right = canvas.width - 54;

  ctx.fillStyle = '#2f2a22';
  ctx.font = '600 44px Georgia, serif';
  ctx.fillText('Norah Zhou', left, 84);

  ctx.fillStyle = '#7a8f4a';
  ctx.font = '500 20px Helvetica, Arial, sans-serif';
  ctx.fillText('Product Designer  ·  Toronto, ON', left, 116);

  ctx.strokeStyle = '#c9bfa8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, 138);
  ctx.lineTo(right, 138);
  ctx.stroke();

  // Body text stands in as ruled lines — legible as "text" at the size this renders.
  const line = (x, y, w, shade = '#b9b0a0', h = 7) => {
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, w, h);
  };
  const section = (title, y) => {
    ctx.fillStyle = '#5A6538';
    ctx.font = '600 19px Helvetica, Arial, sans-serif';
    ctx.fillText(title, left, y);
    ctx.strokeStyle = '#ddd5c2';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(left, y + 12);
    ctx.lineTo(right, y + 12);
    ctx.stroke();
  };

  section('EXPERIENCE', 182);
  line(left, 202, 300, '#8d8677');
  line(left, 218, right - left, '#cfc7b6');
  line(left, 232, right - left - 70, '#cfc7b6');
  line(left, 250, 260, '#8d8677');
  line(left, 266, right - left - 30, '#cfc7b6');
  line(left, 280, right - left - 130, '#cfc7b6');

  section('EDUCATION', 326);
  line(left, 346, 340, '#8d8677');
  line(left, 362, right - left - 90, '#cfc7b6');

  section('SKILLS', 404);
  let chipX = left;
  for (const w of [86, 64, 104, 72, 92]) {
    ctx.fillStyle = '#e8ecd8';
    ctx.fillRect(chipX, 420, w, 20);
    chipX += w + 12;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const DeskScene = ({ onReady, onFocusChange }) => {
  const mountRef = useRef(null);
  const router = useRouter();
  // { text, x, y } in canvas pixels — the caption is parked beside the hovered object.
  const [label, setLabel] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  // True once the laptop has been opened: the screen takes over the viewport.
  const [screenOpen, setScreenOpen] = useState(false);
  // Index of the folder that has popped out to the middle of the frame. Set once it
  // lands, cleared the moment it starts back, so the prints spill and gather with it.
  const [openFolder, setOpenFolder] = useState(null);
  // True from the instant a folder leaves the box until it is back in it — the hero
  // copy clears the frame while the folder travels rather than after it arrives.
  const [folderActive, setFolderActive] = useState(false);
  // Screen positions of the open folder's sheets, in canvas percentages.
  const [sheetOrigins, setSheetOrigins] = useState([]);
  // Which spill layout the prints use; narrow screens can't hold the wide one.
  const [narrow, setNarrow] = useState(false);
  // Which project sits centred in the carousel — a continuous value (not just whole
  // steps) so the deck can glide smoothly under the pointer instead of snapping card
  // to card. Resets whenever a different folder opens, so it never starts mid-deck
  // on an unrelated project.
  const [carouselIndex, setCarouselIndex] = useState(0);
  // When the folder opened, so cards can cascade in on that first reveal only — any
  // reposition after that (mouse, wheel, click) should move at once, not stagger.
  const openedAtRef = useRef(0);
  useEffect(() => {
    setCarouselIndex(0);
    if (openFolder !== null) openedAtRef.current = performance.now();
  }, [openFolder]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const resetPrintRef = useRef(() => {});
  // Bridge between React and the render loop for the screen zoom.
  const ctl = useRef({ target: 0, setZoom: () => {} });

  // The hero copy steps aside whenever a folder is out or the screen is open.
  useEffect(() => {
    onFocusChange?.(folderActive || screenOpen);
  }, [folderActive, screenOpen, onFocusChange]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, mount.clientWidth / mount.clientHeight, 0.01, 100);

    // Two framings the camera moves between: the wide desk shot, and a close-up
    // square-on to the laptop screen.
    const CONTENT_HALF_WIDTH = 0.64;
    const LOOK_AT = new THREE.Vector3(0, 0.30, 0);
    const wideView = { pos: new THREE.Vector3(), target: LOOK_AT.clone() };
    const screenView = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
    // Measured from the loaded model; frameCamera() reads it, so it must exist first.
    let screenPanel = null;
    let screenViewReady = false;

    function frameCamera() {
      const halfFovY = (camera.fov * Math.PI) / 360;
      const halfFovX = Math.atan(Math.tan(halfFovY) * camera.aspect);
      const distance = Math.max(CONTENT_HALF_WIDTH / Math.tan(halfFovX), 1.05);
      // Straight-on elevation view — no camera lift, so the desk reads square to the page.
      // Sit slightly above the look target so the desk surface reads at an angle
      // rather than edge-on.
      wideView.pos.set(0, LOOK_AT.y + distance * 0.16, distance);

      // Close-up: sit on the screen's normal (it leans ~18deg back), far enough back
      // that the whole panel fits with the laptop frame still visible around it.
      if (screenPanel) {
        const fitW = (screenPanel.width / 2) / Math.tan(halfFovX);
        const fitH = (screenPanel.height / 2) / Math.tan(halfFovY);
        const dist = Math.max(fitW, fitH) * 1.12;
        const normal = new THREE.Vector3(0, Math.sin(SCREEN_TILT), Math.cos(SCREEN_TILT)).normalize();
        screenView.target.copy(screenPanel.center);
        screenView.pos.copy(screenPanel.center).addScaledVector(normal, dist);
      }

      if (ctl.current.target !== 1) {
        camera.position.copy(wideView.pos);
        camera.lookAt(wideView.target);
      }
    }
    frameCamera();

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(0.6, 1.2, 1.1);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(-1, 0.6, -0.8);
    scene.add(rim);

    // ── Interaction state ─────────────────────────────────────────────────────
    const parts = { printer: null, laptop: null, lid: null, folders: [], folderTabs: [], outputSheet: null, feedSheet: null, screenFace: null };
    // print.phase: idle -> feeding (sheet pulled in) -> emerging (resume slides out) -> done
    const anim = {
      lid: 1,
      lidTarget: 1,
      folderLift: [0, 0, 0],
      print: { phase: 'idle', t: 0 },
      // A clicked folder leaves the box and flies to the middle of the frame.
      pop: { index: -1, t: 0, closing: false, from: new THREE.Vector3(), to: new THREE.Vector3() },
    };
    const pointer = new THREE.Vector2(-10, -10);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.001;
    let hovered = null;
    let sheetHome = null;
    let feedHome = null;
    let lidHomeY = null;
    let folderHomes = [];
    const folderFlaps = [];
    const anchors = { printer: null, laptop: null, folders: [] };
    // 0 = wide desk shot, 1 = filling the laptop screen.
    const zoom = { t: 0 };
    ctl.current.setZoom = (on) => { ctl.current.target = on ? 1 : 0; };

    // The camera never moves, so a hovered object's screen position only needs
    // recomputing when the hover changes or the canvas resizes.
    const projectAnchor = (point) => {
      if (!point) return null;
      const ndc = point.clone().project(camera);
      const rect = renderer.domElement.getBoundingClientRect();
      return { x: ((ndc.x + 1) / 2) * rect.width, y: ((1 - ndc.y) / 2) * rect.height };
    };
    let blankSheetMaterial = null;
    let printedMaterial = null;
    const resumeTexture = makeResumeTexture();

    // ── Load the desk ─────────────────────────────────────────────────────────
    new GLTFLoader().load('/header-table.glb', (gltf) => {
      if (disposed) return;
      const root = gltf.scene;
      reparentOutlines(root);
      scene.add(root);

      parts.printer = root.getObjectByName('printer');
      parts.laptop = root.getObjectByName('laptop');
      parts.lid = root.getObjectByName('laptopLid');
      parts.outputSheet = root.getObjectByName('outputSheet');
      parts.feedSheet = root.getObjectByName('feedSheet');
      parts.screenFace = root.getObjectByName('screenFace');
      parts.folders = FOLDERS.map(f => root.getObjectByName(f.node));

      const archiveBox = root.getObjectByName('archiveBox');
      if (archiveBox) archiveBox.scale.setScalar(ARCHIVE_BOX_SCALE);

      folderHomes = parts.folders.map(f => (f ? f.position.clone() : new THREE.Vector3()));

      // Hinge each folder's front panel on its crease so it can swing open, and keep
      // the sheets so they can rise out of the fold.
      FOLDERS.forEach(({ node }, i) => {
        const folder = parts.folders[i];
        const front = root.getObjectByName(`${node}Front`);
        const crease = root.getObjectByName(`${node}Crease`);
        if (!folder || !front || !crease) return;

        const creaseBox = new THREE.Box3().setFromObject(crease);
        const pivot = new THREE.Group();
        pivot.position.copy(folder.worldToLocal(creaseBox.getCenter(new THREE.Vector3())));
        folder.add(pivot);
        pivot.attach(front);

        const sheets = [0, 1, 2]
          .map(n => root.getObjectByName(`${node}Sheet${n}`))
          .filter(Boolean);
        folderFlaps[i] = { pivot, sheets, sheetHomes: sheets.map(sh => sh.position.y) };
      });

      // Print each category onto its own tab plate. The plates share one `labelFill`
      // material in the GLB, so each needs its own clone before taking a map.
      FOLDERS.forEach(({ node, short }, i) => {
        const plate = root.getObjectByName(`${node}TabLabel`);
        if (!plate) return;
        parts.folderTabs[i] = plate;
        plate.material = plate.material.clone();
        plate.material.map = makeTabLabelTexture(short);
        plate.material.needsUpdate = true;
      });

      FOLDERS.forEach((_, i) => {
        const hex = FOLDER_TINTS[i];
        if (!hex) return;
        const skip = [...(folderFlaps[i]?.sheets || []), parts.folderTabs[i]];
        tintFolderBody(parts.folders[i], skip, hex);
      });

      if (parts.lid) lidHomeY = parts.lid.position.y;

      // Anchor each caption to the top-centre of its object, measured in the pose the
      // model ships in (laptop lid open), so the label clears the object at full height.
      root.updateMatrixWorld(true);
      const anchorOf = (obj) => {
        if (!obj) return null;
        const box = new THREE.Box3().setFromObject(obj);
        return new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y, (box.min.z + box.max.z) / 2);
      };
      anchors.printer = anchorOf(parts.printer);
      anchors.laptop = anchorOf(parts.laptop);
      anchors.folders = parts.folders.map(anchorOf);

      if (parts.screenFace) {
        const preview = workData.find(p => p.id === PREVIEW_PROJECT_ID);
        if (preview) {
          parts.screenFace.material = new THREE.MeshBasicMaterial({
            map: makeScreenPreview(preview),
            toneMapped: false,
          });
        }

        const box = new THREE.Box3().setFromObject(parts.screenFace);
        const size = box.getSize(new THREE.Vector3());
        screenPanel = {
          center: box.getCenter(new THREE.Vector3()),
          width: size.x,
          height: Math.hypot(size.y, size.z), // true height of the tilted panel
        };
        frameCamera();
        screenViewReady = true;
      }

      if (parts.outputSheet) {
        sheetHome = parts.outputSheet.position.clone();
        blankSheetMaterial = parts.outputSheet.material;
        // Own material so the printed page does not repaint every other paperFill mesh.
        printedMaterial = parts.outputSheet.material.clone();
        printedMaterial.map = resumeTexture;
        printedMaterial.needsUpdate = true;
      }
      if (parts.feedSheet) feedHome = parts.feedSheet.position.clone();

      resetPrintRef.current = () => {
        anim.print.phase = 'idle';
        anim.print.t = 0;
        if (parts.outputSheet && sheetHome) {
          parts.outputSheet.position.copy(sheetHome);
          if (blankSheetMaterial) parts.outputSheet.material = blankSheetMaterial;
        }
        if (parts.feedSheet && feedHome) {
          parts.feedSheet.position.copy(feedHome);
          parts.feedSheet.visible = true;
        }
      };

      onReady?.();
    });

    // ── Pointer plumbing ──────────────────────────────────────────────────────
    const setPointerFromEvent = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    function ancestorGroup(object) {
      let node = object;
      while (node) {
        if (node === parts.printer) return { kind: 'printer' };
        if (node === parts.laptop) return { kind: 'laptop' };
        const folderIndex = parts.folders.indexOf(node);
        if (folderIndex !== -1) return { kind: 'folder', index: folderIndex };
        node = node.parent;
      }
      return null;
    }

    function pick() {
      raycaster.setFromCamera(pointer, camera);
      const targets = [parts.printer, parts.laptop, ...parts.folders].filter(Boolean);
      if (!targets.length) return null;
      const tabs = parts.folderTabs.filter(Boolean);
      if (tabs.length) {
        const tabHit = raycaster.intersectObjects(tabs, false)[0];
        if (tabHit) {
          const index = parts.folderTabs.indexOf(tabHit.object);
          if (index !== -1) return { kind: 'folder', index };
        }
      }
      const hits = raycaster.intersectObjects(targets, true);
      return hits.length ? ancestorGroup(hits[0].object) : null;
    }

    const onPointerMove = (e) => {
      if (ctl.current.target === 1) return; // zoomed in; the desk isn't interactive
      setPointerFromEvent(e);
      const target = pick();
      const same = JSON.stringify(target) === JSON.stringify(hovered);
      if (!same) {
        hovered = target;
        renderer.domElement.style.cursor = target ? 'pointer' : 'default';
        anim.lidTarget = target?.kind === 'laptop' ? 0 : 1;

        if (!target) {
          setLabel(null);
        } else {
          const anchor = target.kind === 'folder' ? anchors.folders[target.index] : anchors[target.kind];
          const screen = projectAnchor(anchor);
          const text = target.kind === 'folder' ? FOLDERS[target.index].label : HOVER_COPY[target.kind];
          setLabel(screen ? { text, kind: target.kind, ...screen } : null);
        }
      }
    };

    const onPointerLeave = () => {
      pointer.set(-10, -10);
      hovered = null;
      anim.lidTarget = 1;
      renderer.domElement.style.cursor = 'default';
      setLabel(null);
    };

    // Lift a folder out of the box and fly it to the middle of the frame. Re-parenting
    // to the scene (attach keeps the world transform) lets it travel in world space
    // instead of the box's scaled local space.
    function popFolder(index) {
      const folder = parts.folders[index];
      if (!folder || anim.pop.index !== -1) return;

      folder.updateWorldMatrix(true, false);
      scene.attach(folder);

      setFolderActive(true);
      anim.pop.index = index;
      anim.pop.t = 0;
      anim.pop.closing = false;
      anim.pop.from.copy(folder.position);

      // Park it on the camera's view axis, far enough back that the folder still fits
      // once the flap has swung open (roughly doubling its height).
      const size = new THREE.Box3().setFromObject(folder).getSize(new THREE.Vector3());
      const openHeight = size.y * 1.95;
      const dist = (openHeight / 2) / Math.tan((camera.fov * Math.PI) / 360) * 1.12;
      const forward = new THREE.Vector3().subVectors(wideView.target, wideView.pos).normalize();
      anim.pop.to.copy(wideView.pos).addScaledVector(forward, dist);
    }

    // 0 = shut, 1 = front flap swung open with the sheets lifted clear.
    function openFlap(index, amount) {
      const flap = folderFlaps[index];
      if (!flap) return;
      flap.pivot.rotation.x = amount * 1.75;
      flap.sheets.forEach((sheet, n) => {
        sheet.position.y = flap.sheetHomes[n] + amount * (0.03 + n * 0.008);
      });
    }

    // Where each of a folder's sheets sits on screen, as percentages of the canvas —
    // the cards grow out of exactly those spots.
    function readSheetOrigins(index) {
      const flap = folderFlaps[index];
      if (!flap) return [];
      const v = new THREE.Vector3();
      return flap.sheets.map((sheet) => {
        sheet.getWorldPosition(v).project(camera);
        return { x: (v.x * 0.5 + 0.5) * 100, y: (-v.y * 0.5 + 0.5) * 100 };
      });
    }

    function showSheets(index, visible) {
      folderFlaps[index]?.sheets.forEach((sheet) => { sheet.visible = visible; });
    }

    ctl.current.closeFolder = () => {
      if (anim.pop.index === -1 || anim.pop.closing) return;
      // The cards fold back into the folder, so the paper is there to receive them.
      showSheets(anim.pop.index, true);
      anim.pop.closing = true;
      anim.pop.t = 0;
    };

    const onClick = (e) => {
      if (ctl.current.target === 1) return; // handled by the overlay's own controls
      if (anim.pop.index !== -1) return;    // a folder is out; its panel owns the click
      setPointerFromEvent(e);
      const target = pick();
      if (!target) return;
      if (target.kind === 'printer') {
        if (anim.print.phase === 'idle') {
          anim.print.phase = 'feeding';
          anim.print.t = 0;
          if (parts.outputSheet && printedMaterial) parts.outputSheet.material = printedMaterial;
        }
      } else if (target.kind === 'folder') {
        popFolder(target.index);
      } else if (target.kind === 'laptop') {
        // Touch devices never fire hover, so the first tap opens the lid; once it is
        // open, a tap pushes the camera into the screen.
        if (anim.lid > 0.5) {
          anim.lidTarget = 0;
          return;
        }
        setLabel(null);
        ctl.current.target = 1;
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    renderer.domElement.addEventListener('click', onClick);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      frameCamera();
      setLabel(null); // anchors are resolution-dependent; drop the stale position
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;
    const lookTmp = new THREE.Vector3();
    let rectPublished = false;
    let openFolderPublished = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      // Ease the camera between the wide shot and the screen close-up.
      const zoomTarget = screenViewReady ? ctl.current.target : 0;
      if (Math.abs(zoomTarget - zoom.t) > 0.0005) {
        zoom.t += (zoomTarget - zoom.t) * Math.min(1, dt * 4.5);
      } else {
        zoom.t = zoomTarget;
      }
      if (zoom.t > 0.0005) {
        const e = zoom.t * zoom.t * (3 - 2 * zoom.t); // smoothstep
        camera.position.lerpVectors(wideView.pos, screenView.pos, e);
        lookTmp.lerpVectors(wideView.target, screenView.target, e);
        camera.lookAt(lookTmp);
      } else if (rectPublished || camera.position.distanceToSquared(wideView.pos) > 1e-9) {
        camera.position.copy(wideView.pos);
        camera.lookAt(wideView.target);
      }

      // Hand the viewport over as soon as the push-in is underway, so the transition
      // reads as moving into the screen rather than a separate panel appearing.
      const settled = zoomTarget === 1 && zoom.t > 0.45;
      if (settled !== rectPublished) {
        rectPublished = settled;
        setScreenOpen(settled);
      }

      // Laptop lid: 0 = open (as modelled), 1 = closed onto the base. The lid stays
      // open for as long as the camera is anywhere into the screen close-up.
      const lidTarget = ctl.current.target === 1 ? 0 : anim.lidTarget;
      anim.lid += (lidTarget - anim.lid) * Math.min(1, dt * 7);
      if (parts.lid && lidHomeY !== null) {
        parts.lid.rotation.x = anim.lid * LID_CLOSED_ANGLE;
        parts.lid.position.y = lidHomeY + anim.lid * LID_CLOSED_LIFT;
      }

      // Print sequence: the feed sheet is drawn into the printer, then the printed
      // resume slides out of the output tray and the PDF preview opens.
      if (anim.print.phase !== 'idle') {
        anim.print.t += dt;
        const { phase, t } = anim.print;

        if (phase === 'feeding' && parts.feedSheet && feedHome) {
          const k = Math.min(t / 0.55, 1);
          const eased = k * k;
          parts.feedSheet.position.y = feedHome.y - eased * 0.085;
          parts.feedSheet.visible = k < 1;
          if (k >= 1) {
            anim.print.phase = 'emerging';
            anim.print.t = 0;
          }
        } else if (phase === 'emerging' && parts.outputSheet && sheetHome) {
          const k = Math.min(t / 0.9, 1);
          const eased = 1 - Math.pow(1 - k, 3);
          parts.outputSheet.position.z = sheetHome.z + eased * 0.085;
          parts.outputSheet.position.y = sheetHome.y + Math.sin(k * Math.PI) * 0.005;
          if (k >= 1) {
            anim.print.phase = 'done';
            anim.print.t = 0;
            setShowPdf(true);
          }
        }
      }

      // Folder tabs lift on hover — but not the one that has left the box.
      parts.folders.forEach((folder, i) => {
        if (!folder || i === anim.pop.index) return;
        const target = hovered?.kind === 'folder' && hovered.index === i ? 1 : 0;
        anim.folderLift[i] += (target - anim.folderLift[i]) * Math.min(1, dt * 9);
        folder.position.y = anim.folderLift[i] * 0.022;
      });

      // The popped folder travels between the box and the middle of the frame.
      if (anim.pop.index !== -1) {
        const folder = parts.folders[anim.pop.index];
        anim.pop.t = Math.min(anim.pop.t + dt / 0.55, 1);
        const k = anim.pop.t;
        const eased = anim.pop.closing ? 1 - (1 - k) * (1 - k) : k * k * (3 - 2 * k);

        if (folder) {
          if (anim.pop.closing) {
            folder.position.lerpVectors(anim.pop.to, anim.pop.from, eased);
            openFlap(anim.pop.index, 1 - eased);
          } else {
            folder.position.lerpVectors(anim.pop.from, anim.pop.to, eased);
            // Settle at a slight angle so it still reads as a 3D folder rather than
            // a flat card pasted over the scene.
            folder.rotation.y = eased * 0.22;
            openFlap(anim.pop.index, eased);
          }
        }

        if (k >= 1) {
          if (anim.pop.closing) {
            // Put it back in the box exactly where it came from.
            const archiveBox = scene.getObjectByName('archiveBox');
            if (folder && archiveBox) {
              archiveBox.attach(folder);
              folder.rotation.set(0, 0, 0);
              folder.position.copy(folderHomes[anim.pop.index]);
              openFlap(anim.pop.index, 0);
            }
            anim.pop.index = -1;
            anim.pop.closing = false;
            setOpenFolder(null);
            setFolderActive(false);
          } else if (openFolderPublished !== anim.pop.index) {
            openFolderPublished = anim.pop.index;
            // Hand the overlay the sheets' screen positions and take the sheets
            // away: the cards are those sheets, so only one of them is ever visible.
            setSheetOrigins(readSheetOrigins(anim.pop.index));
            showSheets(anim.pop.index, false);
            setOpenFolder(anim.pop.index);
          }
        }
      } else if (openFolderPublished !== null) {
        openFolderPublished = null;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [router, onReady]);

  const closeScreen = () => { ctl.current.target = 0; };
  const closeFolder = () => { setOpenFolder(null); ctl.current.closeFolder?.(); };
  const cardScale = narrow ? CARD_SCALE_NARROW : CARD_SCALE;

  // Space puts an open file back in the box — Escape too, to match the screen and
  // the resume preview. A focused button keeps its own Space, so tabbing to a card
  // and pressing it still opens that project.
  useEffect(() => {
    if (!folderActive) return;
    const onKey = (e) => {
      if (e.code !== 'Space' && e.key !== ' ' && e.key !== 'Escape') return;
      if (document.activeElement?.tagName === 'BUTTON') return;
      e.preventDefault();
      closeFolder();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderActive]);

  // Left/right paging through the open folder's carousel.
  useEffect(() => {
    if (openFolder === null) return;
    const total = workData.filter((p) => p.category === FOLDERS[openFolder].label).length;
    if (total < 2) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const dir = e.key === 'ArrowLeft' ? -1 : 1;
      setCarouselIndex((c) => ((Math.round(c) + dir) % total + total) % total);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openFolder]);

  useEffect(() => {
    if (!screenOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeScreen(); };
    document.addEventListener('keydown', onKey);
    // The screen covers the viewport, so the page behind it must not scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [screenOpen]);

  const closePdf = () => {
    setShowPdf(false);
    resetPrintRef.current?.();
  };

  useEffect(() => {
    if (!showPdf) return;
    const onKey = (e) => { if (e.key === 'Escape') closePdf(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showPdf]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Opening the laptop hands the whole viewport over to the screen: flat and
          straight-on, with the desk and hero copy behind it. */}
      {screenOpen && typeof document !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-bgLight dark:bg-darkTheme flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={closeScreen}
            aria-label="Close"
            className="fixed top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-[#6f6858] dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Just the laptop's screen, straight on: a bezel around the section. */}
          <div className="w-full max-w-4xl rounded-[14px] bg-[#2b2b28] dark:bg-black p-2.5 sm:p-3 shadow-2xl">
            <div className="relative rounded-[6px] bg-bgLight dark:bg-[#1b1b17] px-6 py-10 sm:px-10 sm:py-14 flex items-center justify-center">
              <Spotlight onAllProjects={closeScreen} />
            </div>
          </div>
        </motion.div>,
        document.body,
      )}

      {openFolder !== null && (
        <motion.button
          type="button"
          onClick={closeFolder}
          aria-label="Close"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 right-5 z-30 w-9 h-9 rounded-full flex items-center justify-center text-[#6f6858] dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </motion.button>
      )}

      {label && !folderActive && (
        <span
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full flex flex-col items-center whitespace-nowrap text-[#C2643C] dark:text-[#E08B5C]"
          style={{ left: label.x, top: label.y - 24 }}
        >
          <span className="font-Hand text-xl sm:text-2xl leading-none -rotate-3">{label.text}</span>
        </span>
      )}

      {/* Project prints spilling out of the open folder into a fanned hand of cards:
          one centred and forward-facing, the rest tilted and dropped to either side.
          Every project in the category is on the deck — paging never runs out. */}
      <AnimatePresence>
        {openFolder !== null && (() => {
          const categoryProjects = workData.filter((project) => project.category === FOLDERS[openFolder].label);
          const total = categoryProjects.length;
          const step = narrow ? CAROUSEL_STEP_NARROW : CAROUSEL_STEP;
          const visible = narrow ? CAROUSEL_VISIBLE_NARROW : CAROUSEL_VISIBLE;
          // Cards cascade in on the first reveal only; every reposition after that
          // (pointer, wheel, click) moves as one, so it tracks smoothly with no lag.
          const justOpened = performance.now() - openedAtRef.current < 900;
          return (
            // Anywhere off the cards is a click on the desk, which puts the file back.
            // The deck otherwise tracks the pointer directly — no buttons: where the
            // mouse sits across the frame is which card comes to the front — and the
            // wheel steps through one card at a time for a scroll-to-browse feel.
            <div
              className="pointer-events-auto absolute inset-0 z-20"
              onClick={(e) => { if (e.target === e.currentTarget) closeFolder(); }}
              onMouseMove={(e) => {
                if (total < 2) return;
                // Snapped to the nearest whole card — same as wheel/click — so there is
                // always exactly one centred, full-opacity card, however it got there.
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                setCarouselIndex(Math.round(pct * (total - 1)));
              }}
              onWheel={(e) => {
                if (total < 2) return;
                e.preventDefault();
                const dir = e.deltaY > 0 ? 1 : -1;
                setCarouselIndex((c) => ((Math.round(c) + dir) % total + total) % total);
              }}
            >
              {categoryProjects.map((project, i) => {
                // Each card starts life as one of the folder's paper sheets: same
                // spot on screen, sheet-sized, blank, square-cornered. It only
                // becomes a card on the way out.
                const rawOrigin = sheetOrigins.length ? sheetOrigins[i % sheetOrigins.length] : null;
                const origin = rawOrigin && Number.isFinite(rawOrigin.x) && Number.isFinite(rawOrigin.y) ? rawOrigin : SPILL_ORIGIN;
                const asSheet = {
                  left: `${origin.x}%`,
                  top: `${CAROUSEL_ORIGIN_Y}%`,
                  rotate: 0,
                  scale: cardScale * 0.5,
                  borderRadius: 3,
                  opacity: 0,
                };
                const offset = carouselOffset(i, carouselIndex, total);
                const layout = carouselLayout(offset, { step, visible, cardScale });
                const isCentered = Math.round(carouselIndex) === i;
                const delay = justOpened ? Math.min(Math.abs(offset), visible + 1) * 0.055 : 0;
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      if (isCentered) {
                        if (!project.locked) router.push(`/projects/${project.id}`);
                      } else {
                        setCarouselIndex(i);
                      }
                    }}
                    aria-label={project.title}
                    style={{ x: '-50%', y: '-50%', zIndex: layout.z, pointerEvents: layout.interactive ? 'auto' : 'none' }}
                    initial={{ ...asSheet, filter: 'saturate(1) brightness(1)' }}
                    animate={{
                      left: `${layout.x}%`,
                      top: `${CAROUSEL_ORIGIN_Y + layout.y}%`,
                      rotate: layout.rotate,
                      scale: layout.scale,
                      borderRadius: 16,
                      opacity: layout.opacity,
                      filter: `saturate(${layout.saturate}) brightness(${layout.brightness})`,
                    }}
                    exit={{ ...asSheet, filter: 'saturate(1) brightness(1)' }}
                    transition={{
                      default: { type: 'spring', stiffness: 260, damping: 32, delay },
                      opacity: { duration: 0.25, delay },
                      filter: { duration: 0.25, delay },
                      borderRadius: { duration: 0.45, delay },
                    }}
                    whileHover={project.locked && isCentered ? {} : { scale: layout.scale * 1.06, zIndex: 101 }}
                    className={`pointer-events-auto absolute flex w-[min(58vw,244px)] aspect-[244/335] flex-col overflow-hidden bg-white text-left shadow-[0_16px_38px_rgba(60,48,30,0.20)] dark:bg-[#26241f] ${
                      project.locked && isCentered ? 'cursor-default opacity-70' : 'cursor-pointer'
                    } ${
                      project.id === 'flot-ai'
                        ? 'border-2 border-[#D4A85A]/60 dark:border-[#D4A85A]/50'
                        : 'border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {project.locked && (
                      <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur-sm dark:bg-black/50">
                        <svg className="w-3 h-3 text-gray-500 dark:text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: delay + 0.18 }}
                      className="aspect-video w-full shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.bgImage})` }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: delay + 0.26 }}
                      className="flex flex-1 flex-col gap-2 p-4"
                    >
                      <div>
                        <h2 className="font-PlusJakarta text-sm font-semibold leading-snug text-gray-900 dark:text-white">
                          {project.title}
                        </h2>
                        <p className="mt-0.5 font-PlusJakarta text-xs text-gray-500 dark:text-white/40">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-row flex-wrap gap-1">
                        {project.tags.map((tag, n) => (
                          <span key={n} className={`rounded-full px-2.5 py-0.5 font-PlusJakarta text-xs ${tagCls(tag)}`}>
                            {tagLabel(tag)}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        {project.ongoing
                          ? <span className="flex items-center gap-1.5 font-PlusJakarta text-[11px] text-[#7a8f4a] dark:text-[#9DB86A]">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7a8f4a] dark:bg-[#9DB86A]" />
                              Ongoing
                            </span>
                          : <span />
                        }
                        <span className="font-PlusJakarta text-[11px] text-gray-400 dark:text-white/30">
                          {project.isGroup ? 'Group Work' : 'Individual'}
                        </span>
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}

              {/* A couple of small annotations float beside the front card, like sticky
                  notes on a moodboard — its lead tag, and its year or ongoing status. */}
              {(() => {
                const frontIndex = ((Math.round(carouselIndex) % total) + total) % total;
                const frontProject = categoryProjects[frontIndex];
                const tagText = frontProject.tags?.[0];
                const pillTop = `${CAROUSEL_ORIGIN_Y}%`;
                const pillOffset = narrow
                  ? { tag: { x: -92, y: -84, rotate: -7 }, status: { x: 86, y: -76, rotate: 6 } }
                  : { tag: { x: -152, y: -116, rotate: -8 }, status: { x: 140, y: -104, rotate: 7 } };
                return (
                  <>
                    <AnimatePresence>
                      {tagText && (
                        <motion.span
                          key={`${frontProject.id}-tag`}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.22 }}
                          style={{
                            left: '50%',
                            top: pillTop,
                            x: `calc(-50% + ${pillOffset.tag.x}px)`,
                            y: `calc(-50% + ${pillOffset.tag.y}px)`,
                            rotate: pillOffset.tag.rotate,
                          }}
                          className={`pointer-events-none absolute z-[103] whitespace-nowrap rounded-full px-3 py-1.5 font-PlusJakarta text-xs font-medium shadow-[0_10px_22px_rgba(60,48,30,0.18)] ${tagCls(tagText)}`}
                        >
                          {tagText}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      <motion.span
                        key={`${frontProject.id}-status`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.22, delay: 0.05 }}
                        style={{
                          left: '50%',
                          top: pillTop,
                          x: `calc(-50% + ${pillOffset.status.x}px)`,
                          y: `calc(-50% + ${pillOffset.status.y}px)`,
                          rotate: pillOffset.status.rotate,
                        }}
                        className="pointer-events-none absolute z-[103] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 font-PlusJakarta text-xs font-medium text-[#4A423C] shadow-[0_10px_22px_rgba(60,48,30,0.18)] dark:bg-[#2c2a24] dark:text-white/80"
                      >
                        {frontProject.ongoing
                          ? <><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7a8f4a] dark:bg-[#9DB86A]" />Ongoing</>
                          : frontProject.year}
                      </motion.span>
                    </AnimatePresence>
                  </>
                );
              })()}

              {total > 1 && (
                <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-[102] flex items-center gap-1.5">
                  {categoryProjects.map((project, i) => (
                    <span
                      key={project.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === Math.round(carouselIndex) ? 'w-4 bg-[#4A423C] dark:bg-white' : 'w-1.5 bg-[#4A423C]/25 dark:bg-white/25'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Portalled so no transformed ancestor in the header can clip the overlay. */}
      {showPdf && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-sm"
          onClick={closePdf}
        >
          <div
            className="relative w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#22201b] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-gray-200 dark:border-white/10">
              <span className="font-PlusJakarta text-sm font-medium text-[#4A423C] dark:text-white">
                Norah Zhou — Resume
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_HREF}
                  download
                  className="px-3 py-1.5 rounded-full bg-brand text-white text-xs font-PlusJakarta"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={closePdf}
                  aria-label="Close resume preview"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <object data={RESUME_HREF} type="application/pdf" className="flex-1 w-full">
              {/* Mobile browsers largely refuse to render PDFs inline. */}
              <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="font-PlusJakarta text-sm text-gray-500 dark:text-white/50">
                  Your browser can’t show the PDF inline.
                </p>
                <a href={RESUME_HREF} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-brand text-white text-sm font-PlusJakarta">
                  Open resume
                </a>
              </div>
            </object>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default DeskScene;
