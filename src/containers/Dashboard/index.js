import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import withAuthProvider from "../../providers/withAuthProvider";
import Notification from "./Notification";
import Markup from "../Markup";
import RoundsList from "./RoundsList";

import styles from "./index.module.scss";

function Dashboard() {
  const navigate = useNavigate();

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
        <Button variant="contained" onClick={() => navigate("/create-round")}>
          Contained
        </Button>
        <Typography variant="h5" component="p">
          h1. Heading
        </Typography>
        <RoundsList />
      </div>
    </Markup>
  );
}

// export default React.memo(withAuthProvider(Dashboard));
export default React.memo(Dashboard);
