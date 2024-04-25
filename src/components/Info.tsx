// bu sayfaya tiptap gelcek
import useMediaQuery from '@/lib/use-media-query'
import { Drawer } from 'vaul';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import classname from 'classnames';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
export default function Info({ title, description, image, src }: { title: String, description: String, image: String, src: String }) {

  const { isTablet, isDesktop } = useMediaQuery();

  return <>
    {isDesktop ? <div
      className={classname(
        `top-0 left-0 flex flex-col h-full absolute z-20 bg-transparent justify-end w-11/12 md:w-1/4`
      )}
    >
      <AnimatePresence>
        <div
          className="p-4 m-4 scrollbar-thin overflow-y-auto gap-2 flex flex-col h-full rounded-md backdrop-blur-xl bg-sienna-400 bg-opacity-50 backdrop-filter"
        >
          <h1 className="text-2xl font-bold">{title}</h1>
          <motion.img  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} key={title} alt={title} src={image} className='w-full' />
          <span className='text-sm text-sienna-900'>{src}</span>
          <p>
            {description}
          </p>
        </div>
      </AnimatePresence>
    </div> :
      <Drawer.Root should-scale-background>
        <Drawer.Trigger className="fixed flex gap-2 items-center justify-center bottom-0 left-0 bg-sienna-400 text-white text-xl z-20 w-screen px-2 py-2">
          <ChevronUp /> Bilgiler
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed bg-black bg-opacity-40 inset-0" />
          <Drawer.Content
            className="bg-sienna-100  flex z-30 flex-col rounded-t-[10px] h-full mt-24 max-h-[75%] fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-sienna-100 h-full rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-sienna-300 mb-8" />
              <div className="text-black h-full scrollbar-thin pb-10 mx-auto w-11/12">
                <div
                  className="p-4 m-4 scrollbar-thin  overflow-y-auto gap-2 flex flex-col h-full rounded-md bg-transparent backdrop-blur-xl bg-sienna-400 bg-opacity-30 backdrop-filter"
                >
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <img alt={title} src={image} className='w-full h-2/3' />
                  <span className='text-sm text-sienna-900'>{src}</span>
                  <p>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    }
  </>
}