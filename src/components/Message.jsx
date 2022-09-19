const Message = ({ message }) => {
  console.log(message)

  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="random avatar"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hola</p>
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="random avatar"
        />
      </div>
    </div>
  )
}

export default Message
