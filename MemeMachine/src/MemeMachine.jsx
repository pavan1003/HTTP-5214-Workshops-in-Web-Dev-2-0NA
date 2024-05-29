import React, { useState, useEffect } from "react";
import axios from "axios";

const MemeMachine = () => {
  const [meme, setMeme] = useState(null);
  const [memeTitle, setMemeTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const refreshAccessToken = async () => {
    try {
      const tokenResponse = await axios.post("https://www.reddit.com/api/v1/access_token", null, {
        auth: {
          username: import.meta.env.VITE_CLIENT_ID,
          password: import.meta.env.VITE_CLIENT_SECRET,
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
      if (!accessToken) {
        await refreshAccessToken();
      }
      const response = await axios.get("https://oauth.reddit.com/r/ProgrammerHumor/random", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMemeTitle(response.data[0].data.children[0].data.title)
      setMeme(response.data[0].data.children[0].data.url)
    } catch (error) {
      console.error("Error fetching meme: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="content-wrapper">
      {loading ? (
        <section className="main-content">
          <p>Loading...</p>
        </section>
      ) : (
        <section className="main-content">
          <h2>{memeTitle}</h2>
          <img src={meme} alt={memeTitle} className="meme-image" />
          <button onClick={fetchMeme}>Refresh Meme</button>
        </section>
      )}
    </div>
  );
};

export default MemeMachine;
