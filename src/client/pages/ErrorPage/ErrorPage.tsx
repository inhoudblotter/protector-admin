import { h } from "preact";
import styles from "./ErrorPage.module.css";
import { Link } from "preact-router";

interface IErrorPage extends h.JSX.HTMLAttributes<HTMLElement> {
  title: string;
  message?: string;
}

export default function ErrorPage({ title, message }: IErrorPage) {
  return (
    <main class={styles.container}>
      <h1 class={styles.title}>{title}</h1>
      {message && <p class={styles.message}>{message}</p>}
      <Link class={styles.backLink} href={"/"}>
        Вернуться на главную &rarr;
      </Link>
    </main>
  );
}
