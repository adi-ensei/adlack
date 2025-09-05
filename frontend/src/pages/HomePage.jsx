import { UserButton } from "@clerk/clerk-react";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-red-500">
      <UserButton />
      HomePage
    </div>
  );
};

export default HomePage;
