import { useRef } from 'react';

import Text from './Text';

import Render from './Render';
import { tips } from '@/constants';
import Image from './Image';

export default function App() {
  const rootDom = document.getElementById('root');
  const eventSource = useRef<HTMLElement>(rootDom!);

  return (
    <div className="w-full h-screen">
      <Render ref={eventSource} />
      <article className="flex items-center justify-center h-screen w-full text-9xl text-blue-600">
        <header className="w-full whitespace-nowrap text-center">
          <div>
            <h2>
              <Text wobble>{tips}</Text>
            </h2>
          </div>
        </header>
      </article>
      <article className="flex items-center justify-center h-screen w-full text-9xl text-green-500 relative">
        <Image />
      </article>
    </div>
  );
}
