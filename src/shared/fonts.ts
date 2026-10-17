// Chargement des polices de la charte. Les noms de famille sont repris dans theme.ts (fonts).
// Big Shoulders Display est désormais publiée par Google sous le nom « Big Shoulders ».
import { loadFont as loadBigShoulders } from '@remotion/google-fonts/BigShoulders';
import { loadFont as loadInstrumentSans } from '@remotion/google-fonts/InstrumentSans';
import { loadFont as loadInstrumentSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadPlexMono } from '@remotion/google-fonts/IBMPlexMono';

const subsets: ('latin' | 'latin-ext')[] = ['latin', 'latin-ext'];

loadBigShoulders('normal', { weights: ['800'], subsets });
loadInstrumentSans('normal', { weights: ['600'], subsets });
loadInstrumentSerif('italic', { weights: ['400'], subsets });
loadPlexMono('normal', { weights: ['500'], subsets });
