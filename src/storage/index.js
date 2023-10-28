import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const ONEBOARDING_KEY = "@oneboarding";
const HISTORIC_KEY = "@Historic"

export function getOneboarding() {
  return storage.getString(ONEBOARDING_KEY);
}

export function setOneboarding(data) {
  return storage.set(ONEBOARDING_KEY, JSON.stringify(data));
}

export function getHistoric(){
  return storage.getString(HISTORIC_KEY);
}

export function setHistoric(data){
  return storage.set(HISTORIC_KEY, JSON.stringify(data));
}

export function clean(){
  storage.cleanAll()
}