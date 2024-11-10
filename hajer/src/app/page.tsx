import EventList from "@/components/Dashboard/EventList";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "USER Dashboard",
  description: "USER Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <EventList />
      </DefaultLayout>
    </>
  );
}
