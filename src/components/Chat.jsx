import { useChatContext } from '../context/ChatContext'

import Messages from './Messages'
import Input from './Input'

import CamIcon from '../img/cam.png'
import AddIcon from '../img/add.png'
import MoreIcon from '../img/more.png'

const Chat = () => {
  const { data } = useChatContext()

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={CamIcon} alt="Camera icon" />
          <img src={AddIcon} alt="Add icon" />
          <img src={MoreIcon} alt="More icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
