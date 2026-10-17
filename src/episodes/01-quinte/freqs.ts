import { semitone } from '../../shared/lib/music';

// Fréquences de l'épisode : do2, sol (quinte juste 3:2), do♯ (un demi-ton tempéré)
export const F0 = 65.41;
export const SOL = F0 * 1.5;
export const DO_DIESE = semitone(F0, 1);
