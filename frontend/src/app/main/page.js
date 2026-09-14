import Image from "next/image";
import styles from "./page.module.css";
import Chat from "./components/chats";
import Pfp from "./components/pfp";

export default function Home() {
  return (
    <div>
      <Pfp/>
      <Chat/> 
      <Chat/>
      <Chat/>
      <Chat/>
      
    </div>
  );
}
          