import { useState, useMemo, useEffect, useContext } from "preact/hooks";
import { Input } from "src/client/shared/ui/Input";
import { ServiceFrom } from "./ui/ServiceForm";
import styles from "./SettingsForm.module.css";
import { Fieldset } from "./ui/Fieldset";
import { IServiceState } from "./types/IServiceState";
import { RADEUS } from "src/client/shared/config/radeus";
import { StorageForm } from "./StorageForm";
import { IStorageState } from "./types/IStorageState";
import { IServiceStateMinMax } from "./types/IServiceStateMinMax";
import { Loader } from "src/client/shared/ui/Loader";
import { Button } from "src/client/shared/ui/Button";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";
import { SettingsContext } from "src/client/shared/model/settingsContext";
import { ISocials } from "src/client/shared/types/ISocials";
import { IAddress } from "src/client/shared/types/IAddress";
import { TokenGenerator } from "./TokenGenerator/TokenGenerator";
import { formatTime } from "src/client/shared/utils/formatTime";
import { onChangeFormatTime } from "./utils/onChangeFormatTime";
import { JSXInternal } from "node_modules/preact/src/jsx";

export function SettingsForm() {
  const {
    settings,
    status: settingsStatus,
    load: loadSettings,
    update: updateSettings,
  } = useContext(SettingsContext);
  const [address, setAddress] = useState<IAddress>({
    street: "",
    house: "",
    latitude: 0,
    longitude: 0,
  });
  const [workTime, setWorkTime] = useState<{ from: string; to: string }>({
    from: "00:00",
    to: "00:00",
  });
  const [phone, setPhone] = useState("");
  const [socials, setSocials] = useState<ISocials>({
    telegram: "",
    whats_app: "",
    viber: "",
  });
  const [defaultPrices, defaultRangePrices] = useMemo(() => {
    const defaultPrices: { [r: number]: number } = {};
    const defaultRangePrices: { [r: number]: { min: number; max: number } } =
      {};
    RADEUS.forEach((r) => {
      defaultPrices[r] = 0;
      defaultRangePrices[r] = { min: 0, max: 0 };
    });

    return [defaultPrices, defaultRangePrices];
  }, []);
  const [complex, setComplex] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });
  const [balancing, setBalancing] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });
  const [removalAndInstalation, setRemovalAndInstalation] =
    useState<IServiceState>({
      maxCars: 0,
      leadTime: 0,
      prices: {
        suv: defaultPrices,
        crossover: defaultPrices,
        passengerCar: defaultPrices,
      },
    });

  const [dismantling, setDismantling] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });

  const [instalation, setInstalation] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });

  const [puncture, setPuncture] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });

  const [cut, setCut] = useState<IServiceState>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultPrices,
      crossover: defaultPrices,
      passengerCar: defaultPrices,
    },
  });

  const [storage, setStorage] = useState<IStorageState>({
    maxWheels: 0,
    prices: defaultPrices,
  });

  const [addSpikes, setAddSpikes] = useState<IServiceStateMinMax>({
    maxCars: 0,
    leadTime: 0,
    prices: {
      suv: defaultRangePrices,
      crossover: defaultRangePrices,
      passengerCar: defaultRangePrices,
    },
  });

  function update(e: JSXInternal.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    const workStart = workTime.from.split(":").map((el) => Number(el));
    const workEnd = workTime.to.split(":").map((el) => Number(el));
    console.log(complex);
    updateSettings({
      phone: cleanPhone(phone),
      work_time: {
        from: { hours: workStart[0], minutes: workStart[1] },
        to: { hours: workEnd[0], minutes: workEnd[1] },
      },
      address,
      socials,
      services: {
        complex,
        balancing,
        removalAndInstalation,
        instalation,
        dismantling,
        addSpikes,
        puncture,
        cut,
        storage,
      },
    });
  }

  useEffect(() => {
    if (settings) {
      setWorkTime({
        from: `${formatTime(settings.work_time.from.hours)}:${formatTime(
          settings.work_time.from.minutes
        )}`,
        to: `${settings.work_time.to.hours
          .toString()
          .padStart(2, "0")}:${settings.work_time.to.minutes
          .toString()
          .padStart(2, "0")}`,
      });
      setAddress(settings.address);
      setSocials(settings.socials);
      setPhone(settings.phone);
      setComplex(settings.services.complex);
      setBalancing(settings.services.balancing);
      setRemovalAndInstalation(settings.services.removalAndInstalation);
      setAddSpikes(settings.services.addSpikes);
      setDismantling(settings.services.dismantling);
      setInstalation(settings.services.instalation);
      setPuncture(settings.services.puncture);
      setCut(settings.services.cut);
      setStorage(settings.services.storage);
    } else loadSettings();
  }, [settings, loadSettings]);
  if (["loading", "notLoaded"].includes(settingsStatus))
    return (
      <div class={styles.loaderContainer}>
        <Loader class={styles.loader} />
      </div>
    );
  return (
    <>
      <div class={styles.container}>
        <form class={styles.form} onSubmit={update}>
          <Fieldset title={"Адрес"}>
            <Input
              placeholder={"Улица"}
              value={address.street}
              onChange={(e) => {
                setAddress({ ...address, street: e.currentTarget.value });
              }}
            />
            <Input
              placeholder={"Дом"}
              value={address.house}
              onChange={(e) => {
                setAddress({ ...address, house: e.currentTarget.value });
              }}
            />
            <Input
              placeholder={"Широта"}
              value={address.latitude}
              type={"number"}
              step="0.000001"
              onChange={(e) => {
                setAddress({
                  ...address,
                  latitude: Number(e.currentTarget.value) || 0,
                });
              }}
            />
            <Input
              placeholder={"Долгота"}
              value={address.longitude}
              type={"number"}
              step="0.000001"
              onChange={(e) => {
                setAddress({
                  ...address,
                  longitude: Number(e.currentTarget.value) || 0,
                });
              }}
            />
          </Fieldset>
          <Fieldset title="Рабочее время">
            <div class={styles.workTime}>
              <Input
                class={styles.workTimeInput}
                placeholder={"Начало"}
                maxLength={5}
                value={workTime.from}
                onChange={(e) => {
                  setWorkTime({ ...workTime, from: onChangeFormatTime(e) });
                }}
              />
              <Input
                class={styles.workTimeInput}
                placeholder={"Конец"}
                maxLength={5}
                value={workTime.to}
                onChange={(e) => {
                  setWorkTime({ ...workTime, to: onChangeFormatTime(e) });
                }}
              />
            </div>
          </Fieldset>
          <Fieldset title="Контакты">
            <Input
              placeholder={"Телефон"}
              value={phone}
              onChange={(e) => {
                setPhone(e.currentTarget.value);
              }}
            />
            <Input
              placeholder={"Telegram"}
              value={socials.telegram}
              onChange={(e) => {
                setSocials({ ...socials, telegram: e.currentTarget.value });
              }}
            />
            <Input
              placeholder={"Whats App"}
              value={socials.whats_app}
              onChange={(e) => {
                setSocials({ ...socials, whats_app: e.currentTarget.value });
              }}
            />
            <Input
              placeholder={"Viber"}
              value={socials.viber}
              onChange={(e) => {
                setSocials({ ...socials, viber: e.currentTarget.value });
              }}
            />
          </Fieldset>

          <ServiceFrom
            state={complex}
            setState={setComplex}
            title="Комплекс"
            pricesType="default"
          />
          <ServiceFrom
            state={balancing}
            setState={setBalancing}
            title="Балансировка"
            pricesType="default"
          />
          <ServiceFrom
            state={removalAndInstalation}
            setState={setRemovalAndInstalation}
            title="Снятие и установка"
            pricesType="default"
          />
          <ServiceFrom
            state={dismantling}
            setState={setDismantling}
            title="Демонтаж"
            pricesType="default"
          />
          <ServiceFrom
            state={instalation}
            setState={setInstalation}
            title="Установка"
            pricesType="default"
          />
          <ServiceFrom
            state={puncture}
            setState={setPuncture}
            title="Ремонт прокола"
            pricesType="default"
          />
          <ServiceFrom
            state={cut}
            setState={setCut}
            title="Ремонт пореза"
            pricesType="default"
          />
          <ServiceFrom
            title="Дошипока"
            state={addSpikes}
            setState={setAddSpikes}
            pricesType="min-max"
          />
          <StorageForm state={storage} setState={setStorage} />
          <Button isLoading={settingsStatus === "updating"}>
            Сохранить настройки
          </Button>
        </form>
        <TokenGenerator />
      </div>
    </>
  );
}
