"use client";

import Image from "next/image";
import React from "react";
import "./language.scss";

import uzbflag from "../../../assets/images/webappImages/uzbflag.svg";
import englishflag from "../../../assets/images/webappImages/englishflag.svg";
import russionflag from "../../../assets/images/webappImages/russionflag.svg";
import arrowright from "../../../assets/images/webappImages/arrowright.svg";

const Language = () => {
  return (
    <div className="language-content container">
      <h1 className="language__title">Language</h1>

      <div className="language-list">
        {/* Uzbek */}
        <div className="language-item selected" data-lang="uzbek">
          <div className="language-flag">
            <Image src={uzbflag} alt="uzbflag" width={32} height={20} />
          </div>
          <span className="language-name">Uzbek</span>
          <div className="language-checkbox">
            <div className="checkbox-circle">
              <div className="checkbox-check">
                <Image src={arrowright} alt="arrow" width={16} height={16} />
              </div>
            </div>
          </div>
        </div>

        {/* English */}
        <div className="language-item" data-lang="english">
          <div className="language-flag">
            <Image src={englishflag} alt="englishflag" width={32} height={20} />
          </div>
          <span className="language-name">English</span>
          <div className="language-checkbox">
            <div className="checkbox-circle">
              <Image src={arrowright} alt="arrow" width={16} height={16} />
            </div>
          </div>
        </div>

        {/* Russian */}
        <div className="language-item" data-lang="russian">
          <div className="language-flag">
            <Image src={russionflag} alt="russianflag" width={32} height={20} />
          </div>
          <span className="language-name">Russian</span>
          <div className="language-checkbox">
            <div className="checkbox-circle">
              <Image src={arrowright} alt="arrow" width={16} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
