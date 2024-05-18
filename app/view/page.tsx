import Scene from '@/components/liismaiil/Scene'
import { Canvas, useFrame } from '@react-three/fiber'

const View = () => {

  return (
  
  <main id="spacePage" className='flex justify-center  w-[70%] mt-32  h-screen ' >
      <Canvas  camera={ orthographic 
                    { fov: 25, 
                    near: 0.1, far: 1000,zoom:120 
                     }}
                      >
                <Scene />
      </Canvas>
      </main>
  );
};


export default View;
