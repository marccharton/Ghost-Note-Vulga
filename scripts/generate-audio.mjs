// Génère les WAV d'un épisode à partir de src/episodes/<slug>/audio.config.json
// Usage : node scripts/generate-audio.mjs 01-quinte
//
// Types de sons :
//   "note" : chaque fréquence avec 8 harmoniques d'amplitude 1/n (timbre doux)
//   "sine" : sinus pur, pour isoler une harmonique
// Enveloppe : attaque 10 ms, relâchement 300 ms. Sortie mono 16 bits.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) {
  console.error('Usage : node scripts/generate-audio.mjs <slug-episode>');
  process.exit(1);
}

const episodeDir = join(root, 'src', 'episodes', slug);
const config = JSON.parse(readFileSync(join(episodeDir, 'audio.config.json'), 'utf8'));
const sampleRate = config.sampleRate ?? 48000;
const outDir = join(episodeDir, 'audio');
mkdirSync(outDir, { recursive: true });

const HARMONICS = 8;
const ATTACK = 0.01;
const RELEASE = 0.3;

function render(sound) {
  const length = Math.round(sound.duration * sampleRate);
  const data = new Float32Array(length);
  const partials = [];
  for (const f of sound.freqs) {
    if (sound.type === 'sine') {
      partials.push({ freq: f, amp: 1 });
    } else {
      for (let n = 1; n <= HARMONICS; n++) partials.push({ freq: f * n, amp: 1 / n });
    }
  }
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    let v = 0;
    for (const p of partials) v += p.amp * Math.sin(2 * Math.PI * p.freq * t);
    const env = Math.min(1, t / ATTACK, (sound.duration - t) / RELEASE);
    data[i] = v * Math.max(0, env);
  }
  // Normalisation à -3 dBFS
  let peak = 0;
  for (const v of data) peak = Math.max(peak, Math.abs(v));
  const gain = peak > 0 ? 0.707 / peak : 0;
  for (let i = 0; i < length; i++) data[i] *= gain;
  return data;
}

function toWav(samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  return buffer;
}

for (const sound of config.sounds) {
  const file = join(outDir, `${sound.id}.wav`);
  writeFileSync(file, toWav(render(sound)));
  console.log(`✓ ${sound.id}.wav (${sound.duration} s)`);
}
console.log(`${config.sounds.length} sons générés dans ${outDir}`);
