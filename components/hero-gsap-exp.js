import gsap from 'gsap';
import {useEffect} from "react";
import HeroSwttal from "./hero_swttal";

export default function HeroGsapExp() {

    useEffect(() => {
        let tl = gsap.timeline();
        tl.to(".line-1", { opacity: 1, ease: "power3.out", duration: 1})
            .to(".line-1", { opacity: 0, delay: 1})
            .to('.line-2', { opacity: 1})
            .to(".line-2", { opacity: 0, delay: 2})
            .to(".curtain", 1.6, { height: 0, ease: "expo.inOut"}, 'group-1')
            .from(".bgBackground", 1.6, { scale: 2, ease: "expo.inOut"}, 'group-1')
    }, []);


    return (
        <div className="relative min-h-screen bg-black flex flex-col justify-center items-center text-white">
            <div className="relative text-center text-4xl w-full max-w-[700px] h-[100px] z-50">
                <div className="absolute opacity-0 line-1">Jeder hat Angst vor dem Verborgenen.</div>
                <div className="absolute opacity-0 line-2">Aber was, wenn das Gefährlichste das ist, was du bereits siehst?</div>
            </div>
            <div className="overflow-hidden absolute inset-0">
                <div className="hero-swattal relative">
                    <div className="bg-black w-full h-full absolute inset-0 z-20 curtain"></div>
                    <HeroSwttal />
                </div>
            </div>
        </div>
    )
}
