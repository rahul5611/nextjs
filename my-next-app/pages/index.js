import { useEffect, useState } from 'react';

import styles from "./page.module.css";
import Header from './components/Header';

export default function Home() {
  const [greetMessage, setGreetMessage] = useState('');

  useEffect(() => {
    fetch('/api/greet')
      .then(response => response.json())
      .then(data => setGreetMessage(data.message));
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
      {greetMessage}
        
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
