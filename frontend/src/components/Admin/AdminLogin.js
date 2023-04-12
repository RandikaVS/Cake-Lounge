import { React, Component } from "react";
import AdminNavPreLoginHeader from "./AdminPreLoginHeader";
import AdminLoginForm from "./AdminLoginForm";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false };
    this.changeLogedState = this.changeLogedState.bind(this);
  }
  changeLogedState() {
    this.setState({ logged: !this.state.logged });
    alert(this.state.logged);
  }
  render() {
    return (
      <>
        <AdminNavPreLoginHeader logged={this.state.logged} />
        <AdminLoginForm
          changeLogedState={this.changeLogedState}
          logged={this.state.logged}
        />
      </>
    );
  }
}
export default Home;