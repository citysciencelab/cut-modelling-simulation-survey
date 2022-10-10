import { RoundedBox } from "@react-three/drei"
import React, { useRef, useState } from "react";
import { useGLTF } from '@react-three/drei'
import { add, dotMultiply } from 'mathjs'



export default function Wind(props) {

    const opacity = 0.5
    const turbulence_direction_scale = 0.5 // The higher, the more variation
    const turbulence_speed_scale = 2 // The higher, the more variance in speed
 
    const no_turbulence_layer = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]

    // Turbulences
    // -1 = no turbulence due to obstacle
    // 0 = completely laminar flow
    // 1 = completely turbulent flow
    const turbulences = [
        [
            [-1, 0.3, 0.2, 0.1, 0.1, 0.08],
            [-1, 0.3, 0.2, 0.2, 0.1, 0.08],
            [0.6, 0.5, 0.5, 0.5, 0.6, 0.2],
            [-1, -1, -1, 0.8, 0.8, -1],
            [0, 0, -1, 0.8, 0.8, -1],
            [-1, -1, -1, 0.8, 0.8, -1]
        ],
        [
            [-1, 0.1, 0.2, 0.1, 0.1, 0.08],
            [-1, 0.1, 0.2, 0.2, 0.1, 0.08],
            [0.4, 0.4, 0.4, 0.5, 0.5, 0.4],
            [-1, -1, -1, 0.6, 0.6, -1],
            [0, 0, -1, 0.8, 0.6, -1],
            [-1, -1, -1, 0.8, 0.6, -1]
        ],
        [
            [0.25, 0.3, 0.25, 0.1, 0.1, 0.1],
            [0.25, 0.3, 0.25, 0.2, 0.1, 0.1],
            [0.25, 0.3, 0.25, 0.2, 0.2, 0.1],
            [0.4, 0.3, 0.3, 0.4, 0.2, -1],
            [0.4, 0.3, 0.3, 0.4, 0.2, -1],
            [0.4, 0.3, 0.3, 0.4, 0.2, -1]
        ],
        [
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.15, 0.15, 0.08, 0.2, -1],
            [0.08, 0.15, 0.15, 0.08, 0.2, -1],
            [0.08, 0.15, 0.15, 0.08, 0.2, -1]
        ],
        [
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08,0.2, -1],
            [0.08, 0.08, 0.08, 0.08, 0.2, -1],
            [0.08, 0.08, 0.08, 0.08, 0.2, -1]
        ],
        [
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
            [0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
        ]
    ]

    const { nodes, materials } = useGLTF('/models/arrow.gltf')
    const [windSimulation, setWindSimulation] = useState(turbulences)

    function getColor(turbulence) {
        let r, g, b
        if (turbulence < 0) {
            return 'rgb(0,0,0)'
        } else {
            r = Math.round(Math.min(255, Math.max(0, 3*255*(turbulence - 1/3))))
            g = Math.round(Math.min(255, -255*3 * (turbulence - 1)))
            b = Math.round((Math.max(0, -255*3* (turbulence - 1 / 3))))

            return ("rgb(" + r + "," + g + "," + b + ")")
        }
    }

    function getTurbulenceDirection(turbulence, windDirection) {
        windDirection = -windDirection
        let turbulenceFactor = (Math.random() - 0.5) * turbulence * 2 * Math.PI * turbulence_direction_scale
        let windFactor = Math.PI * 3 + Math.PI + (windDirection / 360 * 2 * Math.PI)
        return (windFactor + turbulenceFactor)
    }

    function getTurbulenceSpeed(turbulence) {
        let baselineSpeed = 5
        return (baselineSpeed + (Math.random() - 0.5) * turbulence * turbulence_speed_scale)
    }



    return (


        windSimulation.map((x, i) => {
            return (
                x.map((y, j) => {
                    return (
                        y.map((z, k) => {
                            if (z >= 0) {
                                return (

                                    z >= 0 &&
                                    <mesh
                                        key={i + "," + j + "," + k}
                                        geometry={nodes.Cone.geometry}
                                        scale={[4, getTurbulenceSpeed(z), 4]}
                                        position={[-65 + 25.5 * j, -70 + 25.5 * i, -65 + 25.5 * k]}
                                        rotation={[getTurbulenceDirection(z, 0), getTurbulenceDirection(z, props.windDirection), Math.PI / 2 + getTurbulenceDirection(z, 0)]}
                                    >
                                        <meshPhongMaterial color={getColor(z)} transparent opacity={opacity} />
                                    </mesh>

                                )
                            }
                        }))
                }))


        })

    )

}

useGLTF.preload('/models/arrow.gltf')