"use client";

import { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, useGLTF, } from "@react-three/drei";
import { create } from "zustand";
import { organelles } from "../../cell";
import Info from "@/components/Info";
import { AnimatePresence, motion } from "framer-motion";
import * as Progress from '@radix-ui/react-progress';
import useMediaQuery from "@/lib/use-media-query";
import AcknowledgementPopover from "@/components/AcknowledgementPopover";

const useStore = create((set) => ({
  selectedItemName: "Hücre",
  selectedItem: organelles.find((organelle) => organelle.name === "Hücre"),
  hover: false,
  hoveredItem: "",
  selectNewItem: (newItemName: any) =>
    set({
      selectedItemName: newItemName,
      selectedItem: organelles.find(
        (organelle) => organelle.name === newItemName
      ),
    }),
}));

export default function CellPage() {
  const { isDesktop } = useMediaQuery();

  return (
    <div className="items-center md:flex grid pointer-grab w-full md:h-screen min-h-screen flex-grow z-20">

      <Suspense>

        <div className={`${isDesktop ? 'right-4 bottom-4' : 'top-4 right-4'} fixed flex z-30 gap-2`}>
          <AcknowledgementPopover />
        </div>

        {
          useStore((state) => state.hover) && organelles.find((organel) => organel.materialName === useStore.getState().hoveredItem)?.name != null ?
        <AnimatePresence>
          <motion.div
            className="fixed top-6 w-full h-32 flex justify-center items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-sienna-400 bg-opacity-70 backdrop-filter backdrop-blur-md px-2 py-1 rounded-md text-white">
              {organelles.find((organel) => organel.materialName === useStore.getState().hoveredItem)?.name}
            </div>
          </motion.div>
        </AnimatePresence> : null}

        <Info src={useStore.getState().selectedItem?.src} title={useStore.getState().selectedItem?.name} description={useStore.getState().selectedItem?.description} image={useStore.getState().selectedItem?.image} />

        {/* There goes 3D object, lightning, etc. */}
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          className="fixed top-0 z-10 w-full h-full flex-grow"
          camera={{ position: [2, 2, 2], fov: 50 }}
        >
          <ambientLight intensity={0.7} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <Suspense fallback={<ModelLoader />}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>

      </Suspense>
    </div>
  );
}

function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center className="flex items-center flex-col">
      <Progress.Root className="w-60 rounded-full relative overflow-none h-4 bg-sienna-300" value={progress}>
        <Progress.Indicator className="w-full bg-sienna-500 rounded-full h-full"
          style={{ transform: `translateX(-${100 - progress}%)` }} />
      </Progress.Root>
    </Html>
  );
}


function Model(props: any) {
  const gltf = useGLTF("/human_cell.glb");
  const findObjectByName = (name: string) => {
    const organel = organelles.find((organelle) => organelle.materialName?.includes(name));
    console.log(organel);
    useStore.setState({
      selectedItemName: organel?.name || "Hücre",
      selectedItem: organel || organelles.find((organelle) => organelle.name === "Hücre"),
    })
  }

  return <primitive onClick={(e: any) => (e.stopPropagation(), findObjectByName(e.object.name))}
    onPointerOver={(e: any) => (e.stopPropagation(), useStore.setState({
      hover: true,
      hoveredItem: e.object.name
    }))}
    onPointerOut={(e: any) => useStore.setState({
      hover: false
    })}
    object={gltf.scene} {...props} />
}