import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="max-w-[1216px] p-5 md:p-5 lg:p-0 mx-auto py-5 flex flex-col gap-5">
      <Header />

      <AttendeeList />
    </div>
  )
}