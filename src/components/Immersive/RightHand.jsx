import { DefaultXRController } from "@react-three/xr"

const RightHand = () => {
    return(
        <>
        <group>
            <DefaultXRController rayPointer={false}/>
        </group>
        </>
    )
}

export default RightHand 