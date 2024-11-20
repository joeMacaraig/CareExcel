import React from "react";
import Image from "next/image";

import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <div className="flex items-center mb-12">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="patient"
              width={1000}
              height={1000}
              className="h-10 w-fit"
            />
            <h1 className="text-3xl font-bold px-2">CarexCell</h1>
          </div>
          <RegisterForm user={user} />
          <p className="copyright py-10">
            © 2024 CarexCell
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        width={1000}
        height={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
