import { getDataTextContex } from "@/app/lib/data-knowledge";
import ChatNew from "@/app/ui/chats/chat-new";

const Chat = async () => {
    const textContext = await getDataTextContex(1);
    return (
        <main>
            <ChatNew textContext={textContext} />
        </main>
    )
}
export default Chat