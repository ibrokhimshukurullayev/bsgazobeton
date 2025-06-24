import React from "react";
import KatalogGazabetonHeaderLink from "./components/katalogHeaderLink/katalogGazabetonHeaderLink";
import Card from "../../components/card/Card";

const Katalog = () => {
  return (
    <div>
      <KatalogGazabetonHeaderLink title={"Katalog"} />
      <div className="container">
        <Card />
      </div>
    </div>
  );
};

export default Katalog;
