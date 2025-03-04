import React from 'react'
import {Atom} from 'react-loading-indicators'

function Loader({text}) {
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 text-brand dark:text-brand-dark ">
        <div className="loader-container text-brand dark:text-brand-dark">
        <style>{`
            .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgb(0, 0, 0);
            z-index: 50;
            }
            @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            }
        `}</style>
        <Atom
            size='large'
            text={text || "Loading..."}
            textColor='#3185cc'
            color="rgb(16 184 221)"   // Adjust this to match your desired color
            visible={true}
            strokeWidth={2}
        />
        </div>
    </div>
  )
}

export default Loader