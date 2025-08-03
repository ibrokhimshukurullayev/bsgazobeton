import React from "react";
import KatalogGazabetonHeaderLink from "./components/katalogHeaderLink/katalogGazabetonHeaderLink";
import Card from "../../components/card/Card";
import CompareBar from "../../components/compare/CompareBar";

const Katalog = () => {
  return (
    <div>
      <KatalogGazabetonHeaderLink title={"Katalog"} />
      <CompareBar />
      <div className="container">
        <Card />
      </div>
    </div>
  );
};

export default Katalog;
