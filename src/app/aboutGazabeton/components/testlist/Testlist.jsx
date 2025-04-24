"use client";

import React from "react";
import "./testlist.scss";

const tests = [
  {
    number: 1,
    title: "Zichlik sinovi",
    description:
      "Mahsulotning standart zichlik ko‘rsatkichlariga mosligi tekshiriladi",
  },
  {
    number: 2,
    title: "Mustahkamlik sinovi",
    description: "Og‘irlik chidamliligi aniqlanadi",
  },
  {
    number: 3,
    title: "Olovga chidamlilik sinovi",
    description: "Materialning yuqori haroratga bardoshliligi o‘rganiladi",
  },
  {
    number: 4,
    title: "Issiqlik izolyatsiyasi sinovi",
    description:
      "Issiqlikni o‘tkazmaslik va energiya tejash ko‘rsatkichlari tekshiriladi",
  },
  {
    number: 5,
    title: "Tovush izolyatsiyasi sinovi",
    description: "Shovqinni kamaytirish ko‘rsatkichi aniqlanadi",
  },
];

export const TestList = () => {
  return (
    <div className="testlist">
      {tests.map((test) => (
        <div className="testlist__item" key={test.number}>
          <div className="testlist__number">{test.number}</div>
          <div className="testlist__content">
            <h4 className="testlist__title">{test.title}</h4>
            <p className="testlist__desc">{test.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
