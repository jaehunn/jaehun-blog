import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const wrapper = style({
  animationName: fadeIn,
  animationFillMode: 'backwards',
  animationDuration: '500ms',
  animationDelay: '0ms',
});
