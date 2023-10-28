import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  gap: '2rem',
  padding: '5rem',

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
    },
  },
});

export const image = style({
  width: '12rem',
  height: '12rem',
  borderRadius: '50%',
  overflow: 'hidden',
});

globalStyle(`${image} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  fontSize: '1rem',
  fontWeight: '500',
});

export const name = style({
  fontSize: '2rem',
  fontWeight: 500,
  wordBreak: 'keep-all',
  whiteSpace: 'nowrap',

  '@media': {
    'screen and (max-width: 320px)': {
      textAlign: 'center',
    },
  },
});

export const position = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '@media': {
    'screen and (max-width: 320px)': {
      flexDirection: 'column',
    },
  },
});

export const positionCompany = style({
  fontSize: '1rem',
  color: 'var(--color-prettylights-syntax-comment)',
});

export const description = style({
  fontSize: '1rem',
});

export const location = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const contacts = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const gmail = style([
  contacts,
  {
    // ...
  },
]);

export const linkedIn = style([
  contacts,
  {
    selectors: {
      '&:hover': {
        color: 'var(--color-prettylights-syntax-keyword)',
      },
    },
  },
]);

export const github = style([
  contacts,
  {
    selectors: {
      '&:hover': {
        color: 'var(--color-prettylights-syntax-keyword)',
      },
    },
  },
]);
