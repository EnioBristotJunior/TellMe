import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const ONEBOARDING_KEY = "oneboarding";

export function getOneboarding() {
  return storage.getString(ONEBOARDING_KEY);
}

export function setOneboarding(data) {
  return storage.set(ONEBOARDING_KEY, JSON.stringify(data));
}
