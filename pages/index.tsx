import type { NextPage } from 'next';
import { ConnectToChat } from './components/connectButton';
import Chat from './components/chatpage';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
    <main >
     <h1 className="text-xl font-sans text-gray-500 text-center">
  Welcome to Zorex chat
</h1>
<h1 className="text-xl font-sans text-gray-500 text-center">
  Please connect your wallet to start chatting
</h1>
<div   className="flex justify-center py-4">
<ConnectToChat />
</div>
    </main>
  </div>
  );
};

export default Home;
