const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat app</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="random avatar"
        />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
