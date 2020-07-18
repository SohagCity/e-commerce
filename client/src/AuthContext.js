import React, { createContext, Component } from "react";
import AuthService from "../src/Services/AuthService";

const AuthContext = createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false, isLoaded: false };
  }
  componentDidMount() {
    AuthService.isAuthenticated().then((data) => {
      this.setState({
        user: data.user,
        isAuthenticated: data.isAuthenticated,
        isLoaded: true,
      });
    });
  }
  setIsAuthenticated = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };
  setUser = (user) => {
    this.setState({ user });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          setIsAuthenticated: this.setIsAuthenticated,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
export default AuthContext;
/*

export default ({ childern }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {childern}
    </AuthContext.Provider>
  );
};
*/
