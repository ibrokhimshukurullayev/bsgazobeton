import React from "react";
import Image from "next/image";
import "./about.scss";
import gazabetom from "../../../assets/images/gazabtonimg.png";
import gisht from "../../../assets/images/gisht.png";
import peneblok from "../../../assets/images/peneblok.png";
import beton from "../../../assets/images/beton.png";
import Title from "../../../components/title/Title";

export const metadata = {
  title: "Gazobetonning boshqa materiallardan farqi | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const AboutMaterillardanFarqi = () => {
  const data = [
    {
      name: "Og’irligi",
      gazobeton: "Yengil",
      gisht: "Og‘ir",
      penobeton: "O‘rtacha",
      betonBlok: "Juda og‘ir",
    },
    {
      name: "Issiqlik izolyatsiyasi",
      gazobeton: "Juda yaxshi",
      gisht: "Past",
      penobeton: "Yaxshi",
      betonBlok: "Juda past",
    },
    {
      name: "Ovoz izolyatsiyasi",
      gazobeton: "Yaxshi",
      gisht: "O‘rtacha",
      penobeton: "Yaxshi",
      betonBlok: "Past",
    },
    {
      name: "Ishlov berish qulayligi",
      gazobeton: "Juda oson",
      gisht: "Qiyin",
      penobeton: "Oson",
      betonBlok: "Qiyin",
    },
    {
      name: "Qurilish tezligi",
      gazobeton: "Tez",
      gisht: "Sekin",
      penobeton: "Tez",
      betonBlok: "O‘rtacha",
    },
    {
      name: "Yong‘inga chidamlilik",
      gazobeton: "Juda yuqori",
      gisht: "Yuqori",
      penobeton: "Yaxshi",
      betonBlok: "Yuqori",
    },
    {
      name: "“Nafas olishi”",
      gazobeton: "Nafas oladi",
      gisht: "Nafas olmaydi",
      penobeton: "Nafas oladi",
      betonBlok: "Nafas olmaydi",
    },
    {
      name: "Ekologik xavfsizlik",
      gazobeton: "Ekologik toza",
      gisht: "Tabiiy",
      penobeton: "Tabiiy",
      betonBlok: "Sementli, sunʼiy",
    },
    {
      name: "Narxi",
      gazobeton: "Tejamkor",
      gisht: "Yuqori",
      penobeton: "O‘rtacha",
      betonBlok: "O‘rtacha / yuqori",
    },
  ];
  return (
    <div>
      <Title
        title={"Gazobeton"}
        text={
          " zamonaviy qurilishda keng qo‘llanilayotgan material bo‘lib, u yengilligi, issiqlikni saqlash xususiyati va tejamkorligi bilan ajralib turadi. Quyidagi jadvalda gazobetonni boshqa mashhur qurilish materiallari bilan solishtirib ko‘rishingiz mumkin. Bu sizga to‘g‘ri tanlov qilishda yordam beradi."
        }
      />
      <div className="table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Xususiyatlar</th>
              <th>
                <Image src={gazabetom} alt="gazabeton" />
                <br />
                Gazobeton
              </th>
              <th>
                <Image src={gisht} alt="gazabeton" />
                <br />
                G‘isht
              </th>
              <th>
                <Image src={peneblok} alt="gazabeton" />
                <br />
                Penobeton
              </th>
              <th>
                <Image src={beton} alt="gazabeton" />
                <br />
                Beton blok
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.gazobeton}</td>
                <td>{row.gisht}</td>
                <td>{row.penobeton}</td>
                <td>{row.betonBlok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutMaterillardanFarqi;
