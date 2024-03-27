import { lusitana } from "@/app/ui/fonts";
import DashboardPageHome from "../../ui/dashboard/home";

export default async function DashboardPage() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>

            <div>
                <DashboardPageHome />
            </div>
        </main>
    )
}
