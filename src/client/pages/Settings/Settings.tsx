import { Nav } from "src/client/components/Nav";
import { SettingsForm } from "src/client/components/SettingsForm";
export default function Settings() {
  return (
    <>
      <Nav />
      <main>
        <SettingsForm />
      </main>
    </>
  );
}
