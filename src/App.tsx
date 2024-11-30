import "./App.css";
import Form from "./components/Form";
import Post from "./components/Card";
import { useState } from "react";

function App() {
  const [isPostVisible, setIsPostVisible] = useState<boolean>(true);
  const [data, setData] = useState({});

  return (
    <div className="app_container">
      {isPostVisible ? (
        <Post />
      ) : (
        <Form
          data={data}
          setData={setData}
          setIsPostVisible={setIsPostVisible}
        />
      )}
    </div>
  );
}

export default App;
