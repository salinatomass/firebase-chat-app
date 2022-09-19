import { createContext, useContext, useReducer } from 'react'
import { useAuthContext } from './AuthContext'

const ChatContext = createContext(null)

export const useChatContext = () => {
  const context = useContext(ChatContext)
  return context
}

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuthContext()

  const INITAL_STATE = {
    chatId: null,
    user: {},
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
