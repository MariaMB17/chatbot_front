import AcmeLogo from "@/app/ui/acme-logo"
import RegisterForm from "@/app/ui/userRegister/register-form"

const UserRegister = () => {
    return (
        <main>
            <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-6">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-31">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <RegisterForm/>
            </div>
        </main>
    )
}

export default UserRegister