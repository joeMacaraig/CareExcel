"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Admin = () => {
  const router = useRouter();
  const admin =
    typeof window !== "undefined" ? window.localStorage.getItem("admin") : null;
  const [appointments, setAppointments] = useState<Appointments>({
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
    totalCount: 0,
  });
  const getAppointments = async () => {
    const appointmentList = await getRecentAppointmentList();
    setAppointments(appointmentList);
  };
  useEffect(() => {
    if (!admin) {
      router.push("/");
    }
    getAppointments();
  }, []);
  return (
    <>
      {admin ? (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
          <header className="admin-header">
            <Link href="/" className="cursor-pointer">
              <div className="flex items-center">
                <Image
                  src="/assets/icons/logo-icon.svg"
                  alt="patient"
                  width={1000}
                  height={1000}
                  className="h-10 w-fit"
                />
                <h1 className="text-3xl font-bold px-2">CarexCell</h1>
              </div>
            </Link>
            <p className="text-16-semibold">Admin DashBoard</p>
          </header>
          <main className="admin-main">
            <section className="w-full space-y-4">
              <h1 className="header">Welcome! 👋</h1>
              <p className="text-dark-700">
                {" "}
                Start the day with managing new appointments.
              </p>
            </section>
            <section className="admin-stat">
              <StatCard
                type="scheduled"
                count={appointments.scheduledCount}
                label="Scheduled Appointments"
                icon="/assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="Pending Appointments"
                icon="/assets/icons/pending.svg"
              />
              <StatCard
                type="cancelled"
                count={appointments.cancelledCount}
                label="Cancelled Appointments"
                icon="/assets/icons/cancelled.svg"
              />
            </section>
            <DataTable columns={columns} data={appointments?.documents} />
          </main>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Admin;
