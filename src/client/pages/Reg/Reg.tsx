import { AuthForm } from "src/client/components/AuthForm";
import styles from "./Reg.module.css";
import { route } from "preact-router";
import { isLogined } from "src/client/api/auth/isLogined";
import { useEffect } from "preact/hooks";

export default function Reg() {
  useEffect(() => {
    isLogined().then((id) => {
      if (id) route("/");
    });
  }, []);
  return (
    <main class={styles.section}>
      <div class={styles.container}>
        <AuthForm type="register" />
      </div>
    </main>
  );
}
