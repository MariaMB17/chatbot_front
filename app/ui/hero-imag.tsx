import Image from 'next/image';
export default function HeroImag() {
    return (
        <>
            <Image
                src="/hero-desktop.png"
                width={1000}
                height={760}
                className="hidden md:block"
                alt="Screenshots of the dashboard project showing desktop version"
                priority={true}
            />
            <Image
                src="/hero-mobile.png"
                width={560}
                height={620}
                className="block md:hidden"
                alt="Screenshot of the dashboard project showing mobile version"
                priority={true}
            />
        </>
    )
}