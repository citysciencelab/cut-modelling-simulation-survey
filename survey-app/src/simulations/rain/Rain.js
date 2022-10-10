import { Cloud, useGLTF } from "@react-three/drei"
import React, { useRef } from 'react'

export default function Rain(props) {

    const group = useRef()
    const { nodes, materials } = useGLTF('/models/rainwater.gltf')

    function getWaterHeight(precipitation) {
        return -100 + precipitation / 2.5
    }

    return (

        <>
            <group ref={group} {...props} dispose={null}>
                <mesh geometry={nodes.Rain.geometry} material={materials.Water} rotation={[0, Math.PI, 0]} position={[1.07, getWaterHeight(props.precipitation), -1.45]} scale={78.25} />
            </group>
            {/*<Cloud
                args={[3, 2]}
                position={[0, 120, 0]}
                rotation={[0, 0, 0]}
                scale={10}
                opacity={0.5}
                speed={0.5} // Rotation speed
                width={10} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
            />
            <Cloud
                args={[3, 2]}
                position={[30, 120, 0]}
                scale={10}
                opacity={0.5}
                speed={0.5} // Rotation speed
                width={5} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
    />*/}


        </>
    )
}

useGLTF.preload('/models/rainwater.gltf') 