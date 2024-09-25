import { useEffect, useMemo, useState } from "react";

const Layout = ({ tab, setpoint, index, settime, start }) => {
    const checkIcon = tab?.srcIcon;
    const [showBonus, setShowBonus] = useState(false);
    const [showPoint, setShowPoint] = useState(0);
    const [burst, setBurst] = useState(false);
    const audio1 = useMemo(() => new Audio('./zeeee.mp3'), []);
    const audio2 = useMemo(() => new Audio('./fail.mp3'), []);

    const HandleTotalPoint = () => {
        if (tab.srcIcon[index] === "./trungthuvang.png") {
            setpoint((pre) => pre + 1);
            setShowBonus(true);
            setShowPoint(1);
            audio1.play();
        } else if (tab.srcIcon[index] === "./trungthuxanh.png") {
            setpoint((pre) => pre + 2);
            setShowBonus(true);
            setShowPoint(2);
            audio1.play();
        } else {
            settime((pre) => pre - 3);
            setShowBonus(true);
            setShowPoint(3);
            audio2.play();
        }
        // Bắt đầu hiệu ứng nổ
        setBurst(true);
        // Đặt lại lớp burst sau 500ms
        setTimeout(() => {
            setBurst(false);
        }, 500);
    };

    useEffect(() => {
        let bonus;
        if (showBonus) {
            bonus = setTimeout(() => {
                setShowBonus(false);
            }, 500);
        }
        return () => clearTimeout(bonus);
    }, [showBonus]);

    return (
        <>
            {start && (
                <div className="p-7 relative justify-center flex w-32 h-32">
                    <div className="flex justify-center items-center">
                        <img className="rounded-full" src={tab.src} />
                    </div>
                    {checkIcon && (
                        <div
                            className="absolute top-3 animate-bounce "
                            onClick={HandleTotalPoint}
                        >
                            <img
                                className={`rounded-full w-25 h-24 p-5 ${burst ? 'burst' : ''}`}
                                src={tab.srcIcon[index]}
                            />
                        </div>
                    )}
                    {showBonus && (
                        <div className="text-lg absolute top-5 left-1/2 transform -translate-x-1/2 text-green-500 bg-gray-300 rounded-lg animation-slideUp">
                            {showPoint === 3 ? `-${showPoint} s` : `+${showPoint} point`}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Layout;
