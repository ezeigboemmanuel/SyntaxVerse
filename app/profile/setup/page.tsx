import React from "react";
import SetupForm  from "../_components/SetupForm";

const ProfileSetupPage = () => {
  return (
    <div className="py-6 md:py-10 max-w-xl mx-auto">
      <h1 className="text-2xl md:text-4xl">Let's set up your profile</h1>
      <p className="text-gray-700 text-sm md:text-base">
        Tell us more about yourself
      </p>

      <div className="mt-4">
        <SetupForm />
      </div>
    </div>
  );
};

export default ProfileSetupPage;
