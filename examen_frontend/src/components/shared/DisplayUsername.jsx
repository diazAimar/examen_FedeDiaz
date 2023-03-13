import { useState, useEffect } from 'react';

export default function DisplayUsername({ delay, children }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDisplayed(true);
      setTimeout(() => {
        setIsDisplayed(false);
      }, 1000);
    }, delay);
  }, [delay]);

  return (
    <p className={'font-bold text-medium-sea-green' + (isDisplayed ? ' block' : ' hidden')}>
      {' '}
      {children}{' '}
    </p>
  );
}
