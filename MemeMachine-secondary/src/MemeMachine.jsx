import { useState, useEffect } from "react";
import axios from "axios";

const MemeMachine = () => {
  const [meme, setMeme] = useState(null);
  const [memeTitle, setMemeTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const toTitleCase = (str) => {
    const words = str.replace(/([A-Z])/g, " $1").split(" ");
    const titleCaseWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return titleCaseWords.join(" ");
  };

  const refreshAccessToken = async () => {
    try {
      const tokenResponse = await axios.post("https://www.reddit.com/api/v1/access_token", null, {
        auth: {
          username: import.meta.env.VITE_CLIENT_ID,
          password: import.meta.env.VITE_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "client_credentials",
        },
      });
      setAccessToken(tokenResponse.data.access_token);
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      throw error;
    }
  };

  const fetchMeme = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://oauth.reddit.com/r/ProgrammerHumor/random", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMemeTitle(response.data[0].data.children[0].data.title);
      setMeme(response.data[0].data.children[0].data.url);
    } catch (error) {
      console.error("Error fetching meme: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to refresh the access token on mount
  useEffect(() => {
    refreshAccessToken();
  }, []);

  // Use another useEffect to fetch the meme once the accessToken is set
  useEffect(() => {
    if (accessToken) {
      fetchMeme();
    }
  }, [accessToken]);

  return (
    <div className="main-content-wrapper">
      {loading ? (
        <section className="main-content">
          <div className="loader"></div>
        </section>
      ) : (
        <section className="main-content">
          <button className="btn" onClick={fetchMeme}>Refresh Meme</button>
          <h2 className="meme-title">{toTitleCase(memeTitle)}</h2>
          <img src={meme} alt={memeTitle} className="meme-image" />
        </section>
      )}
    </div>
  );
};

export default MemeMachine;
