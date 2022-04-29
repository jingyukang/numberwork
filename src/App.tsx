import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getBehavioursAsync } from "./slice/behaviour";
import { getStudentsAsync } from "./slice/students";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./page/MainPage";
import TestingPage from "./page/TestingPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBehavioursAsync());
    dispatch(getStudentsAsync());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/testing/:name"} element={<TestingPage />} />
        <Route path={"*"} element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
