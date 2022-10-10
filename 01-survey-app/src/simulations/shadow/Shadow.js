

export default function Shadow(props) {

    // Settings
    const sunriseTime = 20
    const sunsetTime = 80
    const sunHeightScale = 15
    const radius = 5
    const offset = Math.PI / 3

    function CalculateSunPosition(time) {
        // Current position
        let position = ((1 / 50) * Math.PI * time) + offset
        let z = radius * Math.sin(position)
        let x = radius * Math.cos(position)

        // Height of the sun:
        let y = Math.max(0, sunHeightScale * Math.sin((time - sunriseTime) * (Math.PI / (sunsetTime - sunriseTime))))

        return ([x, y, z])
    }

    function CalculateSunIntensity(time) {
        return (Math.max(0, Math.sin((time - sunriseTime) * (Math.PI / (sunsetTime - sunriseTime)))))
    }

    function CalculateSunColor(time) {
        let r = 255
        let g_b = (Math.min(1, Math.max(0, 2 * Math.sin((time - sunriseTime) * (Math.PI / (sunsetTime - sunriseTime)))))) * 255
        g_b = Math.round(g_b)
        return ("rgb(" + r + "," + g_b + "," + g_b + ")")
    }


    return (
        <directionalLight
            castShadow
            intensity={CalculateSunIntensity(props.simulationTime)}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
            position={CalculateSunPosition(props.simulationTime)}
            shadow-radius={100}
            shadow-bias={-0.1}
            shadow-camera-far={100}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
            color={CalculateSunColor(props.simulationTime)}
        />
    )
}