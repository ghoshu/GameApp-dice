import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import Landing from "../layout/Landing";
import Admin_Table from "../layout/Admin_Page";
import AdminToute from "./AdminRoute";

const Routes = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Landing} />
        <AdminToute exact path="/admin" component={Admin_Table} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
