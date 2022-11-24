import { useEffect, useState } from "react";
import {
    BrowserRouter as Router, Route,
    Routes
} from "react-router-dom";
import * as registerService from "~/admin/services/registerService";
import { DataProvider } from "./customer/components/dataProvider/DataProvider";
import { PRIVATEROUTES, PUBLICROUTES } from "./routes";
import PrivateRoutes from "./routes/PrivateRoute";

function App() {
  const [role, setRole] = useState();
  // call API lấy role
  useEffect(() => {
    const fetchApi = async () => {
      const response = await registerService.getRegister();
      setRole(response.account.role);
    };
    fetchApi();
  }, [role]);
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Routes>
            {PRIVATEROUTES.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;
              return (
                <>
                  <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                          <PrivateRoutes>
                            <Page />
                          </PrivateRoutes>
                        </Layout>
                    }
                  />
                </>
              );
            })}
            {PUBLICROUTES.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}
export default App;
