import ChatNew from "@/app/ui/chats/chat-new";

export const getData = async () => {
    const response = await fetch('http://localhost:3001/knowledge/textContext/1', {
        cache: 'no-store'
    });
    const data = await response.json();
    return data.data;
}

const Chat = async () => {
    const textContext = await getData();
    return (
        <main>
            <ChatNew textContext={textContext} />
        </main>
    )
}
export default Chat