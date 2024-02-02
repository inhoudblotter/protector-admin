import { useContext, useState } from "preact/hooks";
import { route, useRouter } from "preact-router";
import { TargetedEvent } from "preact/compat";
import { Button } from "src/client/shared/ui/Button";
import { Input } from "src/client/shared/ui/Input";
import styles from "./AuthForm.module.css";
import { login } from "src/client/api/auth/login";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { AlertContext } from "src/client/shared/model/alertContext";
import { h } from "preact";
import { register } from "src/client/api/auth/register";
import { parseQuery } from "src/client/shared/utils/parseQuery";

interface ILoginForm extends h.JSX.HTMLAttributes<HTMLFormElement> {
  type: "login" | "register";
}

export function AuthForm({ type }: ILoginForm) {
  const { setAction: setAlert } = useContext(AlertContext);
  const [router] = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  function handleSubmit(e: TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    setLoading(true);
    let action: Promise<number> | null = null;
    if (type === "login") {
      action = login(username, password);
    } else if (type === "register") {
      const { token } = parseQuery(router.url);
      if (!token) route("/not-found");
      action = register(username, password, token);
    }
    if (action) {
      action
        .then((id) => {
          if (id) route("/");
        })
        .catch((error) => {
          if (isError(error) || error instanceof Error) {
            setAlert({
              type: "add",
              payload: { type: "error", message: error.message },
            });
          } else throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const handleOnChange =
    (setValue: (v: string) => void) =>
    (e: TargetedEvent<HTMLInputElement, Event>) => {
      setValue(e.currentTarget.value);
    };

  return (
    <form onSubmit={handleSubmit} class={styles.container}>
      <Input
        placeholder={"Логин"}
        name="username"
        value={username}
        onChange={handleOnChange(setUsername)}
      />
      <Input
        placeholder={"Пароль"}
        name="password"
        type={"password"}
        value={password}
        onChange={handleOnChange(setPassword)}
      />
      <Button isLoading={isLoading}>
        {type === "login" ? "Войти" : "Зарегистрироваться"}
      </Button>
    </form>
  );
}
