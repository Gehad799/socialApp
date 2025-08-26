import React from "react";
import { UserCard } from "../../components/userCard/UserCard";

const Settings = () => {
  return (
    <section className="max-w-2xl mx-auto my-10">
      <div className="flex flex-col gap-4">
        <UserCard />
      </div>
    </section>
  );
};

export default Settings;
