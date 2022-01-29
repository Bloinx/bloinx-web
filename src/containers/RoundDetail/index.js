import React from "react";
import { useTranslation } from "react-i18next";

import Markup from "../Markup";
import PageHeader from "../../components/PageHeader";

function RoundDetail() {
  const { t } = useTranslation();

  return (
    <Markup>
      <PageHeader title={t("createRound.title")} />
      asdas dasd asd
    </Markup>
  );
}

export default React.memo(RoundDetail);
