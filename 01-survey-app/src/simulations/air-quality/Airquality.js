import { RoundedBox } from "@react-three/drei"
import { useEffect, useState } from "react";
import { add, dotMultiply, multiply } from 'mathjs'

export default function Airquality(props) {

    const opacity = 0.15
    const performance_coefficient = 3 // The higher the performance coefficient, the less updates will be rendered
    const noise_factor = 4 // The higher, the less noise in the simulation

    const state_1 = [
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ]
    ]

    const state_2 = [
        [
            [0.9, 0.9, 0.9, 0, 0, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
            [0, 0, 0.9, 0, 0, 0.9],
            [0.9, 0.9, 0, 0, 0, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
        ],
        [
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
            [0.9, 0.9, 0.9, 0, 0, 0.9],
        ],
        [
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9],
            [0.9, 0.9, 0.9, 0.5, 0.5, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ],
        [
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
            [0.9, 0.9, 0.9, 0.9, 0.9, 0.9]
        ]
    ]

    const state_3 = [
        [
            [0, 0.4, 0.4, 0, 0.2, 1],
            [0.4, 0.4, 0.4, 0, 0.2, 1],
            [0, 0, 0.2, 0, 0, 0.3],
            [0.3, 0.3, 0, 0, 0, 0.3],
            [0.4, 0.4, 0.4, 0, 0, 0.6],
            [0.4, 0.4, 0.4, 0, 0, 0],
        ],
        [
            [0.4, 0.4, 0.4, 0.2, 0.4, 1],
            [0.4, 0.4, 0.4, 0.3, 0.4, 1],
            [0.3, 0.3, 0.3, 0.3, 0.3, 0.4],
            [0.4, 0.4, 0.4, 0, 0, 0.4],
            [0.4, 0.4, 0.4, 0, 0, 0.4],
            [0.4, 0.4, 0.4, 0, 0, 0.4]
        ],
        [
            [0.4, 0.4, 0.4, 0.4, 0.8, 1],
            [0.4, 0.4, 0.4, 0.4, 0.8, 0.8],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.8, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
        ],
        [
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            [0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
        ],
        [
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
        ],
        [
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
            [0.6, 0.6, 0.6, 0.6, 0.6, 0.6]
        ]
    ]

    const [airQualitySimulation, setAirQualitySimulation] = useState(state_1)
    const [lastTimestep, setLastTimestep] = useState(0)

    function getColor(aqi) {

        var r, g, b = 0;
        aqi = aqi * 100
        if (aqi < 50) {
            r = 255;
            g = Math.round(5.1 * aqi);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * aqi);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    function getRandomNoise() {
        return (1-(Math.random() / noise_factor))
    }

    function getNoiseMatrix() {
        return (
            [
                Array.from({ length: 6 }, () => getRandomNoise()),
                Array.from({ length: 6 }, () => getRandomNoise()),
                Array.from({ length: 6 }, () => getRandomNoise()),
                Array.from({ length: 6 }, () => getRandomNoise()),
                Array.from({ length: 6 }, () => getRandomNoise()),
                Array.from({ length: 6 }, () => getRandomNoise())
            ]
        )
    }

    function getNoise3D() {
        return(
            [
                getNoiseMatrix(),
                getNoiseMatrix(),
                getNoiseMatrix(),
                getNoiseMatrix(),
                getNoiseMatrix(),
                getNoiseMatrix() 
            ]
        )
    }

    function simulateAirFlow(time) {

        let currentAQ = airQualitySimulation;

        // Interpolate between states
        if (time <= 25) {
            currentAQ = add(multiply(state_1, (1 - time / 25)), multiply(state_2, time / 25))
        } else if (time <= 50) {
            currentAQ = add(multiply(state_2, (1 - (time - 25) / 25)), multiply(state_3, (time - 25) / 25))
        } else if (time <= 75) {
            currentAQ = add(multiply(state_3, (1 - (time - 50) / 25)), multiply(state_2, (time - 50) / 25))
        } else if (time <= 100) {
            currentAQ = add(multiply(state_2, (1 - (time - 75) / 25)), multiply(state_1, (time - 75) / 25))
        }

        // Add random roise
        currentAQ = dotMultiply(currentAQ, getNoise3D())


        setAirQualitySimulation(currentAQ)
        setLastTimestep(time)

    }


    useEffect(() => {
        if (Math.abs(lastTimestep - props.simulationTime) > performance_coefficient) {
            simulateAirFlow(props.simulationTime)
        }
    })


    return (
        airQualitySimulation.map((x, i) => {
            return (
                x.map((y, j) => {
                    return (
                        y.map((z, k) => {
                            return (
                                <RoundedBox key={i + "," + j + "," + k} radius={0.05} smoothness={4} scale={25} position={[-65 + 25.5 * j, -70 + 25.5 * i, -65 + 25.5 * k]}>
                                    <meshPhongMaterial color={getColor(z)} transparent opacity={opacity} />
                                </RoundedBox>
                            )
                        }))
                }))


        })
    )

}