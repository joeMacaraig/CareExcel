import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  console.log(patient)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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

          <AppointmentForm type="create" userId={userId} patientId={patient.$id} />

          <p className="copyright mt-10 py-12">
            © 2024 CarexCell
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
