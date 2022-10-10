export const shadowLighting = {
    ambient: {
        intensity: 0.3,
    },
    spotlight: {
        position: [250, 250, 250],
        angle: 0.25,
        penumbra: 1,
        intensity: 0.1,
        color: "#0d0a78",
    },
    pointlight: {
        position: [-100, -100, -100],
        intensity: 0.1
    }
}

export const daytimeLighting = {
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

export const nighttimeLighting = {
    ambient: {
        intensity: 0.1,
    },
    spotlight: {
        position: [100, 5000, 1000],
        angle: 0.1,
        penumbra: 1,
        intensity: 1,
        color: "#465166",
    },
    pointlight: {
        position: [-10, -10, -10],
        intensity: 0
    }
}

export function LightSetup(props) {

    return (
        <>
            <ambientLight intensity={props.lighting.ambient.intensity} />
            <spotLight position={props.lighting.spotlight.position} angle={props.lighting.spotlight.angle} penumbra={props.lighting.spotlight.penumbra} intensity={props.lighting.spotlight.intensity} color={props.lighting.spotlight.color} />
            <pointLight position={props.lighting.pointlight.position} intensity={props.lighting.pointlight.intensity} />
        </>
    )

}