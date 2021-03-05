import React, {Component} from 'react';
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isAuthenticated: false, open: false, showHide: false};
    }

    handleChange = (event) => {    
      this.setState({[event.target.name] : event.target.value});    
    } 

    handleModalShowHide = () => {
        this.setState({
          showHide: !this.state.showHide,
        })
      }

      postUser = () => {
        const newUser = {userName: this.state.username, password: this.state.password};    
        fetch("https://infinite-river-88630.herokuapp.com/user/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          newUser
        ),
      }).then((response) => {});
      this.handleModalShowHide()
    }

    signupModal = () => {
        return (
          <Modal show={this.state.showHide}>
            <Modal.Header>
              <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container">    
                      <div id="login-row" className="row justify-content-center align-items-center">    
                      <div id="login-column" className="col-md-6">    
                       <div id="login-box" className="col-md-12">    
                      <div className="form-group">    
                          <input type="text" name="username" onChange={this.handleChange}  className="form-control" placeholder="username" />    
                      </div>    
                      <div className="form-group">    
                          <input type="text" name="email" onChange={this.handleChange}  className="form-control" placeholder="email" />    
                      </div> 
                      <div className="form-group">    
                          <input type="password" name="password" onChange={this.handleChange}  className="form-control" placeholder="password" />    
                      </div>    
                       </div>   
                      </div>   
                      </div>   
              </div>  
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary"  onClick={this.postUser}>
                Signup
              </Button>
              <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        );
      };
    
    login = () => {    
      const user = {userName: this.state.username, password: this.state.password};    
      fetch("https://infinite-river-88630.herokuapp.com/login", {    
          method: 'POST',    
          body: JSON.stringify(user)    
      })    
          .then(res => {    
              const jwtToken = res.headers.get('Authorization');    
              if (jwtToken !== null) {    
                  sessionStorage.setItem("jwt", jwtToken);    
                  this.setState({isAuthenticated: true});    
              }    
              else {    
                  this.setState({open: true});    
              }    
          })    
          .catch(err => console.error(err))    
    };  

    render() {    
      if (sessionStorage.getItem('jwt') !== null) {   
          return ( <h1>Logged in</h1>  )  
          
      }    
      else {    
          return (    
              <div id="login">    
                  <h3 className="text-center text-black pt-5">Login</h3>    
                  <div className="container">    
                      <div id="login-row" className="row justify-content-center align-items-center">    
                      <div id="login-column" className="col-md-6">    
                       <div id="login-box" className="col-md-12">    
                      <div className="form-group">    
                          <input type="text" name="username" onChange={this.handleChange}  className="form-control" placeholder="username" />    
                      </div>    
                      <div className="form-group">    
                          <input type="password" name="password" onChange={this.handleChange}  className="form-control" placeholder="password" />    
                      </div>    
                           <input type="submit" name="submit" onClick={this.login}  className="btn btn-info btn-md" value="Login"/> 
                           <br/><br/>
                           <input type="button" name="Signup" onClick={()=>this.setState({ showHide: true })}  className="btn btn-info btn-md" value="Signup"/>   
                            {this.signupModal()}
                       </div>   
                      </div>   
                      </div>   
 
              </div>  
              
  
              </div>    
      
   );} }  
  
}

export default Login;  