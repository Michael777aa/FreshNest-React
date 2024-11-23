import React, { useEffect } from "react";
import { CartItem } from "../../../lib/types/search";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "../productsPage/ChosenProduct";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopUsers } from "./slice";
import Shop from "../homepage/Shop";
import Advertisement from "../homepage/Advertisement";
import ActiveUsers from "../homepage/ActiveUsers";
import Events from "../homepage/Events";
import Satisfaction from "../homepage/Satisfaction";
import Statistics from "../homepage/Statistics";
interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

// REDUX SLICE

const actionDispatch = (dispatch: Dispatch) => ({
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
export default function HomePage(props: ProductsPageProps) {
  const { setTopUsers } = actionDispatch(useDispatch());

  const { onAdd } = props;
  const product = useRouteMatch();
  useEffect(() => {
    // Data fetch
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        console.log("data: ", data);
        setTopUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={"homepage"}>
      <Statistics />
      <Switch>
        <Route path={`${product.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${product.path}`}>
          <Shop onAdd={onAdd} />
        </Route>
      </Switch>

      <Advertisement />
      <ActiveUsers />
      <Events />
      <Satisfaction />
    </div>
  );
}
