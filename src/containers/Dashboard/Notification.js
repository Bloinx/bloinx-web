import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styles from "./Notification.module.scss";
import { FormattedMessage } from "react-intl";

function Notification() {
  return (
    <div className={styles.Notification}>
      <Typography variant="body1" component="p">
      
          <FormattedMessage id="dashboardPage.bannerFirst" />
          <Link>
            <FormattedMessage id="dashboardPage.bannerUrl" />
          </Link>
          <br/>
          <FormattedMessage id="dashboardPage.bannerSecond" />
        
      </Typography>
    </div>
  );
}

export default React.memo(Notification);
