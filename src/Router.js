import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Posts = lazy(() => import("./forum/Posts/Posts"));
const MyPosts = lazy(() => import("./forum/Posts/MyPosts"));
const LikedPosts = lazy(() => import("./forum/Posts/LikedPosts"));
const Post = lazy(() => import("./forum/Posts/Post"));
const AddPost = lazy(() => import("./forum/Posts/AddPost"));
const Login = lazy(() => import("./authentication/login/Login"));
const Register = lazy(() => import("./authentication/register/Register"));
const Angular = lazy(() => import("./forum/Posts/Catergory/Angular"));
const Reactimus = lazy(() => import("./forum/Posts/Catergory/Reactimus"));
const Vue = lazy(() => import("./forum/Posts/Catergory/Vue"));
const Ember = lazy(() => import("./forum/Posts/Catergory/Ember"));
const jQuery = lazy(() => import("./forum/Posts/Catergory/jQuery"));
const Backbone = lazy(() => import("./forum/Posts/Catergory/Backbone"));
const NotFound = lazy(() => import("./404"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag = context.horizontalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute path="/" exact component={Posts} />
          <AppRoute path="/my-posts" exact component={MyPosts} />
          <AppRoute path="/liked-posts" exact component={LikedPosts} />
          <AppRoute path="/post/:id" exact component={Post} />
          <AppRoute path="/add" exact component={AddPost} />
          <AppRoute path="/login" exact component={Login} />
          <AppRoute path="/register" exact component={Register} />
          <AppRoute path="/Angular" component={Angular} />
          <AppRoute path="/React" component={Reactimus} />
          <AppRoute path="/Vue" component={Vue} />
          <AppRoute path="/Ember" component={Ember} />
          <AppRoute path="/jQuery" component={jQuery} />
          <AppRoute path="/Backbone" component={Backbone} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
