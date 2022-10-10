import { useFrame } from "@react-three/fiber"
import * as THREE from "three"


export const view_normal = {
    name: "normal",
    orthographic: false,
    speed: 1,
    snap: false,
    cameraPosition: new THREE.Vector3(0, 0, 250),
    lookAt: new THREE.Vector3(0, 0, 0),
    rotation: [0, Math.PI / 4, 0],
    polar: [0, Math.PI / 2]
}

export const view_map = {
    name: "map",
    orthographic: true,
    speed: 0,
    snap: true,
    cameraPosition: new THREE.Vector3(0, 100, 0),
    lookAt: new THREE.Vector3(0, 0, 0),
    rotation: [0, 0, 0],
    polar: [0, Math.PI / 2]
}

export const view_pedestrian = {
    name: "pedestrian",
    orthographic: false,
    speed: 1,
    snap: false,
    cameraPosition: new THREE.Vector3(0, -50, 0),
    lookAt: new THREE.Vector3(-5, -70, -5),
    rotation: [0, 0, 0],
    polar: [0, 0]
}

export function CameraControls({ ...props }) {

    useFrame(state => {
        const step = 0.05
     
        /*ghostObject.lerp(props.lookAt, step/10)*/
        state.camera.lookAt(props.lookAt)
        //state.camera.position.lerp(props.cameraPosition, step)
        state.camera.updateProjectionMatrix()
    }) 

    return null

}