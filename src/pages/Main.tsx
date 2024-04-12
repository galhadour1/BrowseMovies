import Movies from "../components/Movies";
import NavBar from "../components/NavBar";
import SerachBar from "../components/SerachBar";
import "../styles/Main.css";

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <div className="main-body">
        <div className="main-left">
          <SerachBar />
          <NavBar />
        </div>
        <div className="main-right">
          <h1 className="main-header">Gal's Movies App</h1>
          <Movies />
        </div>
      </div>
    </div>
  );
};

export default Main;
