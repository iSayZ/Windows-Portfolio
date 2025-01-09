import { Suspense } from 'react';
import GuestBook from './component';
import { fetchMessages } from './api';

export const revalidate = 60; // Revalider toutes les 60 secondes

async function GuestBookPage() {
    const initialMessages = await fetchMessages();
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <GuestBook initialMessages={initialMessages} />
      </Suspense>
    );
  }
  
  export default GuestBookPage;