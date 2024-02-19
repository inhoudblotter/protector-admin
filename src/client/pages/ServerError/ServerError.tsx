import ErrorPage from "../ErrorPage/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      title="Ошибка на сервере"
      message="Мы уже спешим разобраться с проблемой. Чтобы ускорить процесс напишите нам в личку что произошло."
    />
  );
}
