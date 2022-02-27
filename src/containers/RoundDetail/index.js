import React from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-elastic-carousel";

import Markup from "../Markup";
import PageHeader from "../../components/PageHeader";
import RoundCard from "./RoundCard";

function RoundDetail() {
  const { t } = useTranslation();

  return (
    <Markup>
      <PageHeader title={t("createRound.title")} />
      <Carousel
        breakPoints={[
          { width: 1, itemsToShow: 1 },
          { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
          { width: 850, itemsToShow: 3 },
          { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
          { width: 1450, itemsToShow: 5 },
          { width: 1750, itemsToShow: 6 },
        ]}
      >
        <RoundCard />
        <RoundCard />
        <RoundCard />
      </Carousel>
    </Markup>
  );
}

export default React.memo(RoundDetail);
