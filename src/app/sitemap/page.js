"use client";
import "./sitemap.scss";

export default function SitemapPage() {
  return (
    <div className="sitemap">
      <h1 className="title">Sayt xaritasi</h1>

      <div className="grid">
        <div className="block">
          <h2>Katalog</h2>
          <a href="/catalog/gazobloklar">Gazobloklar</a>
          <a href="/catalog/gazoblok-panellari">Gazoblok panellari</a>
          <a href="/catalog/gazoblok-key">Gazoblok key</a>
          <a href="/catalog/instrumentlar-va-materiallar">
            Instrumentlar va materiallar
          </a>
        </div>

        <div className="block">
          <h2>Xizmatlar</h2>
          <a href="/services">Mahsulot boyicha konsultatsiya</a>
          <a href="/services/gas-block-installation">Gazoblok montaji</a>
          <a href="/services/calculator">Gazoblokni yetkazib berish</a>
        </div>

        <div className="block">
          <h2>Sotuvlar</h2>
          <a href="/sales">Buyurtma va yetkazib berish</a>
          <a href="/sales/payment-methods">Tolov usullari</a>
          <a href="/contact">Manzillar</a>
        </div>

        <div className="block">
          <h2>Biz haqimizda</h2>
          <a href="/about">Kompaniya haqida</a>
          <a href="/about/news">Yangiliklar</a>
          <a href="/about/vacancies">Vakansiyalar</a>
        </div>

        <div className="block">
          <h2>Profil</h2>
          <a href="/profile">Profil sahifasi</a>
          <a href="/profile/orders">Buyurtmalar tarixi</a>
          <a href="/cart">Savat</a>
        </div>

        <div className="block">
          <h2>Boshqa sahifalar</h2>
          <a href="/">Bosh sahifa</a>
          <a href="/contact">Kontakt</a>
          <a href="/about-gazobeton">Gazobeton haqida</a>
        </div>
      </div>
    </div>
  );
}
