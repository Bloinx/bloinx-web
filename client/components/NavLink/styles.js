import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: ({ color, hover }) => {
    // eslint-disable-next-line no-shadow
    const link = (color, hover) => ({
      padding: theme.spacing(1),
      textDecoration: 'none',
      color: `${color}!important`,
      '&:hover': {
        color: `${hover}!important`,
      },
    });

    const Hover = (() => {
      switch (hover) {
        case 'white': return theme.palette.common.white;
        case 'grey': return theme.palette.grey[700];
        case 'secondary': return theme.palette.primary.main;
        case 'blue': return theme.palette.common.blue;
        case 'dark': return theme.palette.common.black;
        default: return theme.palette.secondary.main;
      }
    })();

    const Color = (() => {
      switch (color) {
        case 'white': return theme.palette.common.white;
        case 'secondary': return theme.palette.secondary.main;
        case 'primary': return theme.palette.primary.main;
        case 'grey': return theme.palette.grey[700];
        case 'blue': return theme.palette.common.blue;
        default: return theme.palette.text.primary;
      }
    })();

    return link(Color, Hover);
  },

}));

export default useStyles;
