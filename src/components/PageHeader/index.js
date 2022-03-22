import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import styles from './styles.module.scss';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PageHeader = ({ title, action }) => {
  return (
    <div className={styles.PageHeader}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mt={3}
        mb={3}
      >
        <Grid item xs={1} md={1}>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={11} md={11}>
          <Typography
            variant="h5"
            component="h1"
            className={styles.dashboardTitle}
          >
            {title}
          </Typography>
          {action}
        </Grid>
      </Grid>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func])
    .isRequired,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
};

PageHeader.defaultProps = {
  action: '',
};

export default PageHeader;
