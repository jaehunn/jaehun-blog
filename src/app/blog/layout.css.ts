import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '5rem 0',

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
});
