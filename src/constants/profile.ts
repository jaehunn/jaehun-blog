const PROFILE = {
  FIRST_NAME: 'Jaehun',
  LAST_NAME: 'Bang',
  POSITION: {
    NAME: 'Web Frontend Engineer',
    COMPANY: '@Bungaejangter Inc.',
  },
  DESCRIPTION: '',
  IMAGE: {
    SRC: '../images/profile.png',
    ALT: '',
  },
  LOCATION: {
    NAME: 'Seoul, Korea',
  },
  TAGS: [
    {
      name: 'Web Frontend',
    },
  ],
  CONTANCTS: {
    GMAIL: {
      URL: 'qkdwogns98@gmail.com',
    },
    LINKED_IN: {
      URL: 'https://www.linkedin.com/in/jaehunn',
    },
    GITHUB: {
      URL: 'https://github.com/jaehunn',
    },
  },
} as const;

export default PROFILE;
