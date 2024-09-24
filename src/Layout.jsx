import { useEffect, useState } from "react";

const Layout = ({ tab, setpoint, index, settime, start }) => {
    const checkIcon =tab?.srcIcon;
    const [showBonus, setShowBonus] = useState(false);
    const [showPoint, setshowPoint] = useState(0);
    const audio1 = new Audio('/public/zeeee.mp3');
    const audio2 = new Audio('/public/fail.mp3');

    const HandleTotalPoint = () => {
        if (tab.srcIcon[index] === "/public/trungthuvang.png") {
            setpoint((pre) => pre + 1);
            setShowBonus(true); //
            setshowPoint(1)
            audio1.play();

        } else if (tab.srcIcon[index] === "/public/trungthuxanh.png") {
            setpoint((pre) => pre + 2);
            setShowBonus(true); //
            setshowPoint(2)
            audio1.play();
        } else {
            settime((pre) => pre - 3);
            setShowBonus(true); //
            setshowPoint(3)
            audio2.play();
        }
    };
    useEffect(() => {
        let bonus
        if (showBonus) {
            bonus = setTimeout(() => {
                setShowBonus(false)
            }, 200)
        }
        return () => clearTimeout(bonus)

    }, [showBonus]);

    return (
        <>
            {start && <div className="p-7 relative justify-center flex w-32 h-32">
                <div className="flex justify-center items-center">
                    <img className="rounded-full" src={tab.src} />
                </div>
                {checkIcon && (
                    <div
                        className="absolute top-3 animate-bounce hover:border-red-600 hover:border"
                        onClick={HandleTotalPoint}
                    >
                        <img className="rounded-full w-12 h-12" src={tab.srcIcon[index]} />
                    </div>
                )}
                {showBonus && (
                    <div className=" text-lg absolute top-5 left-1/2 transform -translate-x-1/2  text-green-500 bg-gray-300 rounded-lg animation-slideUp">
                        {/* +{showPoint} point */}
                        {showPoint == 3 ? `-${showPoint} s` : `+${showPoint} point`}
                    </div>
                )}
            </div>}
        </>
    );
};

export default Layout;
