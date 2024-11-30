import "./App.css";
import Form from "./components/Form";
import Post from "./components/Post";
import { useState } from "react";

function App() {
  const [isPostVisible, setIsPostVisible] = useState<boolean>(false);
  const [data, setData] = useState({});

  return (
    <div>
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
