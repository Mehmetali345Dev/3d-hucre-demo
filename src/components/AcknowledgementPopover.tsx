import * as HoverCard from '@radix-ui/react-hover-card';
import { Code } from 'lucide-react';
import "./styles.css"
export default function AcknlowledgementPopover() {
    return <div className="flex flex-col gap-2">
        <HoverCard.Root
            open-delay={300}>
            <HoverCard.Trigger href="https://github.com/mehmetali345dev/mikro" className="flex gap-2 bg-sienna-400 transition-all duration-300 hover:bg-sienna-500 hover:text-white px-4 py-2 items-center font-lg rounded-full">
                <Code />
                Hakkında
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    side="top" avoid-collisions={true} side-offset={5} align="end"
                    className="rounded-lg HoverCardContent p-4 backdrop-blur-md backdrop-filter flex flex-col gap-2  bg-sienna-300">

                    <div className="flex gap-3 items-center">
                        <img
                            alt="Mali" src="https://avatars.githubusercontent.com/u/65217390?v=4"
                            className="w-16 rounded-full h-16" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-sienna-800 text-lg">Mehmet Ali Külahçı</h1>
                            <p className="text-sienna-900 text-sm">tarafından programlandı.</p>
                        </div>
                    </div>
                    <p className='text-sienna-900 w-64'>
                    Bu web uygulaması Next.js ve React ile yazıldı. Vercel tarafından hostlanmaktadır.
                    </p>
                    <HoverCard.Arrow className="fill-sienna-400" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    </div>
}