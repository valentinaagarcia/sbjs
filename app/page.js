import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>hello</h1>
      <Link className={styles.linkButton} href="/aboutus">About Us</Link>
      <p>
        I love my boyfriend!
      </p>
    </main>
  );
}
