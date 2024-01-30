
import SectionCompany from "@/app/ui/company/section-company"


const Page = () => {
    return(
        <div>
            <p>Company Page</p>
            <div className="relative mx-auto flex w-full max-w-[900px] flex-col space-y-1.5 p-2">
                <SectionCompany/>
            </div>            
        </div>
    )
}

export default Page