import React, {
  memo,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useTransition
} from 'react';

import { TestContext } from './Home';

const TestCom = memo(() => {
  const count = useContext(TestContext);
  const [pending, startTransition] = useTransition();
  const id = useId();

  useEffect(() => {
    console.log('挂载', id);
    return () => {
      console.log('卸载');
    };
  }, []);

  useLayoutEffect(() => {
    console.log('layout 挂载', id);
    return () => {
      console.log('layout 卸载');
    };
  }, []);

  // console.log('1');
  // startTransition(() => {
  //   console.log('2');
  // });
  // console.log('3');

  return <div>test:</div>;
});

export default TestCom;
