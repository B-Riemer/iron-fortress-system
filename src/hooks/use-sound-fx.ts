"use client";

import { useRef, useCallback } from "react";

let audioContext: AudioContext | null = null;

// Lazy initialization of AudioContext (only on user interaction)
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn("AudioContext not supported:", error);
      return null;
    }
  }

  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

// Helper to generate White Noise buffer
function createWhiteNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    data[i] = Math.random() * 2 - 1; // Random values between -1 and 1
  }

  return buffer;
}

export function useSoundFx() {
  const contextRef = useRef<AudioContext | null>(null);

  // playHover: Telegraph/Geiger - Mechanical relay switching
  const playHover = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.03);
    } catch (error) {
      // Silently fail if audio playback is not allowed
    }
  }, []);

  // playClick: Weapon Load/Slide - Cocking a gun or flipping a heavy switch
  const playClick = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Main oscillator: Sawtooth slide down
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);

      // White noise burst for friction
      const whiteNoiseBuffer = createWhiteNoiseBuffer(ctx, 0.05);
      const noiseSource = ctx.createBufferSource();
      const noiseGain = ctx.createGain();

      noiseSource.buffer = whiteNoiseBuffer;
      noiseSource.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseGain.gain.setValueAtTime(0.1, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      noiseSource.start(ctx.currentTime);
      noiseSource.stop(ctx.currentTime + 0.05);
    } catch (error) {
      // Silently fail if audio playback is not allowed
    }
  }, []);

  // playSuccess: Impact/Shot - Suppressed gunshot or heavy stamp
  const playSuccess = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // White noise burst (main impact)
      const whiteNoiseBuffer = createWhiteNoiseBuffer(ctx, 0.2);
      const noiseSource = ctx.createBufferSource();
      const noiseGain = ctx.createGain();

      noiseSource.buffer = whiteNoiseBuffer;
      noiseSource.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      noiseSource.start(ctx.currentTime);
      noiseSource.stop(ctx.currentTime + 0.2);

      // Sub-bass thud (low frequency impact)
      const thudOscillator = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thudOscillator.connect(thudGain);
      thudGain.connect(ctx.destination);

      thudOscillator.type = "sine";
      thudOscillator.frequency.setValueAtTime(60, ctx.currentTime); // Low sub-bass

      thudGain.gain.setValueAtTime(0.12, ctx.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      thudOscillator.start(ctx.currentTime);
      thudOscillator.stop(ctx.currentTime + 0.15);
    } catch (error) {
      // Silently fail if audio playback is not allowed
    }
  }, []);

  // playTypewriter: Keyboard typing sound - Realistic mechanical key click
  const playTypewriter = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const time = ctx.currentTime;

      // Main "click" - Short, sharp mechanical sound (like a Cherry MX switch)
      // Use a combination of noise and a low-frequency pulse for realism
      
      // 1. White noise burst for the physical contact (very short)
      const noiseBuffer = createWhiteNoiseBuffer(ctx, 0.01);
      const noiseSource = ctx.createBufferSource();
      const noiseGain = ctx.createGain();
      
      noiseSource.buffer = noiseBuffer;
      noiseSource.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseGain.gain.setValueAtTime(0.12, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.01);
      
      noiseSource.start(time);
      noiseSource.stop(time + 0.01);

      // 2. Low-frequency "thump" for the key press (mechanical feel)
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      
      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      
      thumpOsc.type = "sine";
      // Random variation between 150-250Hz for realism (different keys sound slightly different)
      const thumpFreq = 200 + (Math.random() * 100 - 50);
      thumpOsc.frequency.setValueAtTime(thumpFreq, time);
      
      thumpGain.gain.setValueAtTime(0.1, time);
      thumpGain.gain.exponentialRampToValueAtTime(0.01, time + 0.015);
      
      thumpOsc.start(time);
      thumpOsc.stop(time + 0.015);

      // 3. High-frequency "tick" for the key release (subtle)
      const tickOsc = ctx.createOscillator();
      const tickGain = ctx.createGain();
      
      tickOsc.connect(tickGain);
      tickGain.connect(ctx.destination);
      
      tickOsc.type = "sine";
      tickOsc.frequency.setValueAtTime(3000 + Math.random() * 500, time);
      
      tickGain.gain.setValueAtTime(0.04, time + 0.008);
      tickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.02);
      
      tickOsc.start(time + 0.008);
      tickOsc.stop(time + 0.02);
    } catch (error) {
      // Silently fail if audio playback is not allowed
    }
  }, []);

  // playConfirm: PC System confirmation sound - Success beep/chime
  const playConfirm = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Two-tone ascending chime (like Windows/system success sound)
      const time = ctx.currentTime;

      // First tone (lower)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, time); // C5 note
      gain1.gain.setValueAtTime(0, time);
      gain1.gain.linearRampToValueAtTime(0.1, time + 0.01);
      gain1.gain.linearRampToValueAtTime(0, time + 0.15);

      osc1.start(time);
      osc1.stop(time + 0.15);

      // Second tone (higher, slightly delayed)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, time); // E5 note
      gain2.gain.setValueAtTime(0, time + 0.05);
      gain2.gain.linearRampToValueAtTime(0.1, time + 0.06);
      gain2.gain.linearRampToValueAtTime(0, time + 0.2);

      osc2.start(time + 0.05);
      osc2.stop(time + 0.2);
    } catch (error) {
      // Silently fail if audio playback is not allowed
    }
  }, []);

  return { playHover, playClick, playSuccess, playTypewriter, playConfirm };
}
