import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter basename="">
                    <Routes>
                        <Route path="/*" element={<Navigation />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
