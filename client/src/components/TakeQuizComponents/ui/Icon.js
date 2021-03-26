
import React from 'react'
import anime from 'animejs/lib/anime.es.js'
const Icon = ({response}) => {
    // console.log(response)
    var checkTimeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: false })
    checkTimeline.add({
                    targets: '.checkmark',
                    scale: [
                    { value: [0, 1], duration: 600, easing: 'easeOutQuad' }
                    ]
                })
                .add({
                    targets: '.check',
                    strokeDashoffset: {
                    value: [anime.setDashoffset, 0],
                    duration: 700,
                    delay: 200,
                    easing: 'easeOutQuart'
                }}
    )
    if(response===true){
        console.log(response)

        return (
                <svg className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32">
                    <circle className="circle"
                            cx="16"
                            cy="16"
                            r="16"
                            fill="#0c3"/>
                    <path className="check"
                        d="M9 16l5 5 9-9"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"/>
            </svg>
            
        )
    }else if(response === false){
        return (
                <svg className="checkmark"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32">
                                <circle className="circle"
                                        cx="16"
                                        cy="16"
                                        r="16"
                                        fill="red"/>
                                        <path className="check"
                                        d="M 8 8L24 24M24 8L8 24"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"/>
                            </svg>   
        )
    }
    else return(
        <div className="col-sm-1"></div>
    )
}

export default Icon;