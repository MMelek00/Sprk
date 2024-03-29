import { useRouter } from "next/router";
import BarcodeScanner from "../components/BarcodeScanner";
import styles from "../styles/Home.module.css";
import Head from "next/head";


export default function Home() {
  const router = useRouter();
  const getProduct = (code: string) => {
    router.push(`/products/${code}`)
  };
  return (
    <div className={styles.main}>
      <Head>
        <title>SPRK</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BarcodeScanner onDetected={(code) => getProduct(code)} />
    </div>
  );
}
