import React from "react";
import "./aboutGazabeton.scss";
import { GazobetonAdvantages } from "./components/GazobetonAdvantages/GazobetonAdvantages";
import Title from "../../components/title/Title";
const AboutGazabeton = () => {
  return (
    <div className="aboutGazabeton__page">
      <Title
        title={"Gazobeton (avtoklavlangan gazobeton) -"}
        text={
          "bu yengil, yuqori issiqlik izolyatsiyasiga ega, mustahkam va ekologik toza qurilish materiali bo‘lib, bugungi kunda zamonaviy qurilish sanoatida keng qo‘llanilmoqda. Ushbu material kvars qumi, sement, ohak, alyuminiy kukuni va suv aralashmasidan tashkil topadi. Mustahkamlikka erishish uchun maxsus avtoklav pechlarida yuqori bosim ostida tayyorlanadi."
        }
      />
      <GazobetonAdvantages />
    </div>
  );
};

export default AboutGazabeton;
