import LegoModel from "../3dmodel/Legomodel"
import { useFrame } from "@react-three/fiber"
import React from "react"
import { LightSetup } from "../3dmodel/LightData"

export default function RotateModel() {

    const [rotation, setRotation] = React.useState(0)

    useFrame(state => {
        setRotation(rotation + 0.002)
    })

    const daytimeLighting = {
        ambient: {
            intensity: 0.5,
        },
        spotlight: {
            position: [250, 250, 250],
            angle: 0.25,
            penumbra: 1,
            intensity: 0.75,
            color: "#FFFFFF",
        },
        pointlight: {
            position: [-100, -100, -100],
            intensity: 0.75
        }
    }


    return (
        <>
            <LightSetup lighting={daytimeLighting} />
            <LegoModel position={[-0, -100, -0]} scale={1} rotation={[0, rotation, 0]} welcome={true} activeSimulation="welcome" windDirection={Math.PI / 2 + 100*rotation} onHandleDialog={function doNothing(a,b){}}/>
        </>
    )
}