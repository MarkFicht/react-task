import React, { Component } from 'react'
import './App.css'

export default class App extends Component {

  state = {
    users: []
  }

  getUser = (nick, email, ipAdress) => {
    const { users } = this.state
    let arr = users
    arr.push({
      nick,
      email,
      ipAdress
    })

    this.setState({ users: arr })
    console.log('handel z rodzica')
  }

  removeAll = () => {
    this.setState({
      users: []
    })
  }

  render() {
    return (
      <div className="App">
        <AddUser _getUser={this.getUser} />  
        <button onClick={this.removeAll}>Remove all</button>
        <ListUsers users={this.state.users} />
      </div>
    )
  }
}

class AddUser extends Component {

  state = {
    nick: 'Test1',
    nickValidation: true,
    email: 'test@gmail.com',
    emailValidation: true,
    ipAdress: '127.255.255.255',
    ipAdressValidation: true
  }

  handleNick = e => this.setState({ nick: e.target.value }) 
  handleEmail = e => this.setState({ email: e.target.value })
  handleIpAdress = e => this.setState({ ipAdress: e.target.value }) 

  handleSubmit = e => {
    const { _getUser } = this.props
    const { nick, email, ipAdress, nickValidation, emailValidation, ipAdressValidation } = this.state

    if (nickValidation && emailValidation && ipAdressValidation) {

      _getUser(nick, email, ipAdress)

      this.setState({
        nick: '',
        email: '',
        ipAdress: ''
      })
    }
    e.preventDefault()
  }

  render() {
    const { nick, email, ipAdress, nickValidation, emailValidation, ipAdressValidation } = this.state

    return (
      <div className='user-add'>
        <form>
          <label>
            <span>Nickname</span>
            <input type="text" name="name" onChange={e => this.handleNick(e)} value={nick} />
          </label>

          <label>
            <span>Email</span>
            <input type="text" name="email" onChange={e => this.handleEmail(e)} value={email} />
          </label>

          <label>
            <span>IP adress</span>
            <input type="text" name="ip-adress" onChange={e => this.handleIpAdress(e)} value={ipAdress} />
          </label>

          <input type="submit" value="Add user" onClick={e => this.handleSubmit(e)} />
        </form>
      </div>
    )
  }
}

class ListUsers extends Component {

  static defaultProps = {
    users: [
        {
          nick: 'Test1',
          email: 'test1@gmail.com',
          ipAdress: '127.255.255.255'
        },
        {
          nick: 'Test2',
          email: 'test2@gmail.com',
          ipAdress: '127.255.255.255'
        }
    ]
  }

  render() {
    const { users } = this.props

    return (
      <div className='user-container'>
        <div className='user-list__header'>
          <div>Nickname</div>
          <div>Email</div>
          <div>IP ipAdress</div>
        </div>

        <ul className='user-list'>
          { users.map(user => (
            <li key={user.nick}>
              <span className='nick'>{user.nick}</span>
              <span className='e-mail'>{user.email}</span>
              <span className='ipAdress'>{user.ipAdress}</span>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}
