import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import ToDo from "./components/ToDo";
import { StatusBar } from "expo-status-bar";


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent={true} />
        <ToDo />
      </PersistGate>
    </Provider>
  );
}
