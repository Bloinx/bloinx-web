import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import withAuthProvider from "../../providers/withAuthProvider";
import Notification from "./Notification";
import Markup from "../Markup";

import styles from "./index.module.scss";

function Dashboard() {
  return (
    <Markup>
      <div className={styles.Dashboard}>
        <Notification />
        <Typography variant="h5" component="p">
          h1. Heading
        </Typography>
        <Typography variant="h5" component="p">
          h1. Heading
        </Typography>
        <Typography variant="body1" component="p">
          texto
        </Typography>
        <Button variant="contained">Contained</Button>
        <Typography variant="h5" component="p">
          h1. Heading
        </Typography>
        <Card variant="outlined">
          <table>
            <tr>
              <th>asdsad</th>
              <th>asdsad</th>
            </tr>
            <tr>
              <td>asdasd</td>
              <td>asdasd</td>
            </tr>
          </table>
        </Card>
      </div>
    </Markup>
  );
}

export default React.memo(withAuthProvider(Dashboard));
