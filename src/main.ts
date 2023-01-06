////////////////////// VUE //////////////////////

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

//////////////////// VS CODE ////////////////////
import { commands } from "./commands";
import { vscode } from "@/services/vscode.service";

// Listen for messages from VS Code
// https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing
window.addEventListener("message", (event: MessageEvent) => {
  const data = event.data;
  const command = data.command as string;

  if (!command) {
    console.error("Command field not found in message");
    return;
  }

  const commandHandler = commands[command];
  if (!commandHandler) {
    console.error(`"${command}" could not be found!`);
    return;
  }
  commandHandler(data);
});

// Save and restore state using Pinia and VS Code
// https://code.visualstudio.com/api/extension-guides/webview#persistence
import {
  useRemoteAddonStore,
  type RemoteAddonStore,
} from "./stores/remoteAddons";
import {
  useLocalAddonsStore,
  type LocalAddonsStore,
} from "./stores/localAddons.store";
import { useAppStore, type AppStore } from "./stores/app";
import type { LocalAddon, RemoteAddon } from "./types/addon";

type State = {
  addonStore: RemoteAddonStore;
  installedAddonStore: LocalAddonsStore;
  appStore: AppStore;
};

if (!import.meta.env.DEV) {
  const addonStore = useRemoteAddonStore();
  const installedAddonStore = useLocalAddonsStore();
  const appStore = useAppStore();

  // WARN: things may have to be properly deserialized here
  const previousState = vscode.getState() as State;

  console.log("PREVIOUS STATE");
  console.log(previousState);

  if (previousState) {
    previousState.addonStore.addons.forEach((serializedAddon, index) => {
      // previousState.addonStore.addons[index] =
      // RemoteAddon.loadFromState(serializedAddon);
    });

    previousState.installedAddonStore.addons.forEach(
      (serializedAddon, index) => {
        // previousState.installedAddonStore.addons[index] =
        // LocalAddon.loadFromState(serializedAddon);
      }
    );

    console.log(previousState);
    addonStore.$state = previousState.addonStore;
    installedAddonStore.$state = previousState.installedAddonStore;
    appStore.$state = previousState.appStore;
  }

  const saveState = () => {
    const state: State = {
      addonStore: addonStore.$state,
      installedAddonStore: installedAddonStore.$state,
      appStore: appStore.$state,
    };

    vscode.setState(state);
  };

  // Save state on update to stores
  addonStore.$subscribe(() => saveState());
  installedAddonStore.$subscribe(() => saveState());
  appStore.$subscribe(() => saveState());
}
