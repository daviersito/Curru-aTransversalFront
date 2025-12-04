import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill para TextEncoder/TextDecoder en Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
