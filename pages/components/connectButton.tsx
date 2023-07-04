

import { ConnectButton, useAccountModal } from '@rainbow-me/rainbowkit';
import Chat from './chatpage';
import { useState, useEffect, useRef } from "react";
import { IoMdSend } from 'react-icons/io';
import { useAccount } from 'wagmi';

export const ConnectToChat = () => {

    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);



    const sendResponse = async () => {};
  
  
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (userInput.trim() !== "") {
          const newMessage = {
            role: "device",
            content: userInput,
          };
          sendResponse();
          setMessages([...messages, newMessage]);
          setUserInput("");
        }
      }
    };
  
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (userInput.trim() !== "") {
        const newMessage = {
          role: "device",
          content: userInput,
        };
        sendResponse();
        setMessages([...messages, newMessage]);
        setUserInput("");
      }
    };
  
  
    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pastedText = event.clipboardData.getData("text");
      setUserInput(pastedText);
    };
  
    useEffect(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, [messages]);


  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                // <div className="flex gap-12">
                //   <button
                //     onClick={openChainModal}
                //     type="button"
                //     className="flex items-center bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg"
                //   >
                //     {chain.hasIcon && (
                //       <div className="bg-gray-300 w-6 h-6 rounded-full overflow-hidden mr-2">
                //         {chain.iconUrl && (
                //           <img
                //             alt={chain.name ?? 'Chain icon'}
                //             src={chain.iconUrl}
                //             className="w-full h-full object-cover"
                //           />
                //         )}
                //       </div>
                //     )}
                //     {chain.name}
                //   </button>
                //   <button
                //     onClick={openAccountModal}
                //     type="button"
                //     className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg"
                //   >
                //     {account.displayName}
                //     {account.displayBalance ? ` (${account.displayBalance})` : ''}
                //   </button>
                // </div>
                // <Chat />

                <main className="flex min-h-screen flex-col items-center justify-between px-8 sm:px-24 py-5">
      <h1 className="text-3xl sm:text-5xl font-sans text-black sm:pt-8">Zorex Chat</h1>

      <div className="flex h-screen sm:h-[35rem] w-full sm:w-full flex-col items-center bg-gray-600 rounded-xl bg-gradient-to-b from-pink-200 via-gray-300 to-blue-500">
      {/* <div className="flex h-screen sm:h-[35rem] w-full sm:w-[80%] md:w-[80%] lg:w-[40rem] flex-col items-center bg-gray-600 rounded-xl bg-gradient-to-b from-pink-200 via-gray-300 to-blue-500"> */}
      {/* <div className="flex h-screen sm:h-[35rem] w-full sm:w-[80%] md:w-[80%] lg:w-[40rem] flex-col items-center bg-gray-600 rounded-xl bg-gradient-to-b from-pink-200 via-gray-300 to-blue-500"> */}

        <div className="flex items-center justify-between py-2 sm:py-5 px-4 sm:px-8 w-full bg-gray-500 text-gray-50 rounded-t-xl">
        <div className="flex items-center">
          {/* <img
            src="avatar.png" // Replace with the URL or path to the avatar image
            alt="User Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          /> */}
            <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center bg-gradient-to-r from-pink-500 to-blue-500 text-white mr-5 px-2 py-2 rounded-full"
                  >
                    {chain.hasIcon && (
                      <div className="bg-gray-300 w-6 sm:w-6 h-4 sm:h-4 rounded-full overflow-hidden mr-2 ">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>
          {/* <h2 className="ml-2 text-sm sm:text-lg font-medium">Username</h2> */}
          <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-1 rounded-lg ml-4 mr-8"
                  >
                    {
                    account.ensName? account.ensName : account.displayName
                    }
                    {/* {account.displayBalance ? ` (${account.displayBalance})` : ''} */}
                  </button>
        </div>
        <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-2 py-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        </div>

        <div ref={messagesContainerRef} className="h-full flex flex-col gap-2 overflow-y-auto py-2 sm:py-8 px-2 sm:px-3 w-full">
        {messages.map((message, index) => (
              <div
                key={index}
                className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                  message.role === "device" && account.address
                    ? "self-start bg-white text-gray-800"
                    : "self-end bg-gray-800 text-gray-50"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
                *Typing...*
              </div>
            )}
        </div>

        <form onSubmit={submit} className="relative w-full sm:w-[80%] bottom-0 flex justify-center">
          <textarea
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onPaste={handlePaste}
            placeholder="Send a message"
            className="w-full h-10 px-3 py-2 resize-none overflow-y-auto text-black bg-gray-300 rounded"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendResponse}
            className={`absolute right-0 top-0 h-full px-4 py-2.5 rounded ${
              userInput.trim() !== "" ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <IoMdSend className="text-white" size={20} />
          </button>
        </form>
      </div>
    </main>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
