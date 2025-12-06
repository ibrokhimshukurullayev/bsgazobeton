"use client";
import "./sitemap.scss";

export default function SitemapPage() {
  return (
    <div className="sitemap">
      <h1 className="title">Sayt xaritasi</h1>

      <div className="grid">
        <div className="block">
          <h2>Katalog</h2>
          <a href="/katalog/gazobloklar">Gazobloklar</a>
          <a href="/katalog/gazoblok-panellari">Gazoblok panellari</a>
          <a href="/katalog/gazoblok-key">Gazoblok key</a>
          <a href="/katalog/instrumentlar-va-materiallar">
            Instrumentlar va materiallar
          </a>
        </div>

        <div className="block">
          <h2>Xizmatlar</h2>
          <a href="/xizmatlar/konsultatsiya">Mahsulot bo‘yicha konsultatsiya</a>
          <a href="/xizmatlar/montaj">Gazoblok montaji</a>
          <a href="/xizmatlar/yetkazib-berish-hisoboti">
            Gazoblokni yetkazib berish
          </a>
        </div>

        <div className="block">
          <h2>Sotuvlar</h2>
          <a href="/sotuvlar/yetkazib-berish-tartibi">
            Buyurtma va yetkazib berish
          </a>
          <a href="/sotuvlar/tolov-usullari">To‘lov usullari</a>
          <a href="/sotuvlar/manzillar">Manzillar</a>
        </div>

        <div className="block">
          <h2>Biz haqimizda</h2>
          <a href="/biz-haqimizda/kompaniya">Kompaniya haqida</a>
          <a href="/biz-haqimizda/yangiliklar">Yangiliklar</a>
          <a href="/biz-haqimizda/vakansiyalar">Vakansiyalar</a>
        </div>

        <div className="block">
          <h2>Profil</h2>
          <a href="/profile">Profil sahifasi</a>
          <a href="/orders">Buyurtmalar tarixi</a>
          <a href="/cart">Savat</a>
        </div>

        <div className="block">
          <h2>Boshqa sahifalar</h2>
          <a href="/">Bosh sahifa</a>
          <a href="/contact">Kontakt</a>
          <a href="/gazobeton/batafsil">Gazobeton haqida</a>
        </div>
      </div>
    </div>
  );
}
