
import React, { createContext, useEffect, useState } from 'react'

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [isShow, setisShow] = useState(false);
    const [content, setContent] = useState();
    //   không cho cuộn trang web 
    useEffect(() => {
        const audio = new Audio('./votay.mp3');
        if (isShow) {
            document.body.style.overflow = "hidden"
            audio.play(); 
        } else {
            document.body.style.overflow = "scroll"
        }
        return () => {
            audio.pause(); // Dừng âm thanh nếu modal đóng
            audio.currentTime = 0; // Đặt lại thời gian âm thanh về 0
        };

    }, [isShow]);
    return (
        <ModalContext.Provider value={{ setisShow, setContent }}>
            {children}
            {isShow && <div className='fixed inset-0 z-10'>
                <div className='absolute bg-slate-600/60 inset-0 flex items-center justify-center' onClick={() => setisShow(false)}>
                    <div className='z-20' onClick={(e) => e.stopPropagation()}>
                        {content}
                    </div>
                </div>

            </div>}
        </ModalContext.Provider>
    )
}

export default ModalProvider