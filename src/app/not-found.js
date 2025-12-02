// app/not-found.js
"use client";
import Image from "next/image";
import Link from "next/link";
// import errorImage from "../public/e7711fa3-e802-4463-a760-bbb76258e25c.png";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.code}>404</h1>
        <p style={styles.text}>Oops! Sahifa topilmadi.</p>
        <p style={styles.subText}>
          Siz izlayotgan sahifa mavjud emas yoki o‘chirib yuborilgan bo‘lishi
          mumkin.
        </p>

        <Link href="/" style={styles.button}>
          Bosh sahifaga qaytish
        </Link>
      </div>

      {/* <div style={styles.imageWrapper}>
        <Image src={errorImage} alt="404 Image" style={styles.image} />
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    fontFamily: "sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  content: {
    maxWidth: "600px",
  },
  code: {
    fontSize: "120px",
    fontWeight: "bold",
    color: "#d32f2f",
    margin: "0",
    animation: "bounce 1s infinite",
  },
  text: {
    fontSize: "24px",
    color: "#333",
    margin: "10px 0",
  },
  subText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  button: {
    display: "inline-block",
    padding: "14px 28px",
    background: "#d32f2f",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "0.3s",
  },
  imageWrapper: {
    marginTop: "40px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
};
