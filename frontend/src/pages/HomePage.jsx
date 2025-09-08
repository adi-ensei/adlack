import { UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat";
import PageLoader from "../components/PageLoader";
import "../styles/stream-chat-theme.css";
import {
  Channel,
  Chat,
  Window,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { PlusIcon } from "lucide-react";

import CreateChannelModal from "../components/CreateChannelModal";

const HomePage = () => {
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, chatClient } = useStreamChat();

  // setting active channel
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <p>Something Went Wrong</p>;
  if (isLoading || !chatClient) return <PageLoader />;

  return (
    <div className="chat-wrapper">
      <Chat client={chatClient}>
        <div className="chat-container">
          {/* Left Sidebar */}
          <div className="str-chat__channel-list">
            <div className="team-channel-list">
              {/* Header */}
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <img src="/logo.png" alt="Logo" className="brand-logo" />
                  <span className="brand-name">Adlack</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>
              {/* Channel List */}
              <div className="team_channel-list__content">
                <div className="create-channel-section">
                  <button
                    onClick={() => setIsCreatedModalOpen(true)}
                    className="create-channel-btn"
                  >
                    <PlusIcon className="size-4" />
                    <span>Create Channel</span>
                  </button>
                </div>
                {/* Channel List */}
              </div>
            </div>
          </div>
          {/* Right Container */}
          <div className="chat-main">
            <Channel channel={activeChannel}>
              <Window>
                {/* <CustomChannelHeader/> */}
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </div>
        </div>
        {isCreatedModalOpen && (
          <CreateChannelModal
            onClose={() => {
              setIsCreatedModalOpen(false);
            }}
          />
        )}
      </Chat>
    </div>
  );
};

export default HomePage;
