import { OrbitControls } from "@react-three/drei";
import Custom from "./Custom";

const Scene = () => {
  return (
    <>
      <OrbitControls />
      {/* <axesHelper args={[3]} />
      <gridHelper args={[20, 20, 0xff0000,"cyan"]} /> */}

      <Custom />

      {/* <mesh>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh> */}
    </>
  );
};

export default Scene;

//Creating Custom Geometry
//1) Create a Float32Array
//2) put a values in the Array
//3) Create a BufferAttribute using the Float32Array
//4) add the BufferAttribute to the attributes of the BufferGeometry
