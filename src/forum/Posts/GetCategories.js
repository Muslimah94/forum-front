import { GetIcon } from "../../components/getIcon";
import React from "react";

export const GetCategories = ({ categories }) => (
  <div className="cats">
    {categories.map((tag, i) => (
      <GetIcon key={i} name={tag} size={12} />
    ))}
  </div>
);
