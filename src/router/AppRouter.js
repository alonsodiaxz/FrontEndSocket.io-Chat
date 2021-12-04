import React, { useContext, useEffect } from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../auth/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verificarToken } = useContext(AuthContext);

  //Cada vez que se recargue la aplicación tiene que realizar esto una vez, por eso esta en un useEffect
  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  if (auth.checking) {
    return <h1> Espere por favor</h1>;
  }

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
        <Switch>
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={ChatPage}
          />

          <Redirect to="/#/" />
        </Switch>
      </div>
    </Router>
  );
};
