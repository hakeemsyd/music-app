import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MusicListItem } from "../components";

const MainDiv = styled.div`
  flex: 1;
  background-color: "#2e2d2c";
`;

const Wrapper = styled.div`
  padding: 2em;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.52),
      rgba(0, 0, 0, 0.92)
    ),
    url(https://static.emastered.com/newv/web/img/bg.jpg);
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 72px;
  line-height: 82px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  position: relative;
  z-index: 100000;
  margin: 0 0 32px 0;
  text-shadow: 0 0 29px #000;
  transition: 0.1s all ease;
`;

const ColoredTitle = styled.span`
  display: block;
  color: #ff003e;
  font-style: italic;
  background: -webkit-linear-gradient(#ff003e, #a409ad);
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
`;

const P1 = styled.p`
  text-align: center;
  color: #fff;
  font-size: 19px;
  font-weight: 300;
  line-height: 18px;
`;

const Button = styled.button`
  background: linear-gradient(
    90deg,
    rgba(187, 33, 13, 1) 42%,
    rgba(215, 71, 10, 1) 100%
  );
  outline: none;
  cursor: pointer;

  color: #fff;
  font-size: 19px;
  font-weight: 600;
  line-height: 18px;
  margin: 1em;
  padding: 1em 4em;
  border: 2px solid #de4f09;
  border-radius: 50px;
`;

const Home = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [musicList, setMusicList] = useState([]);

  const handleClick = (event: any) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", async (event: any) => {
      const file = event.target.result;
      const existingHistory = await localStorage.getItem(`Music`);
      let newHistory = JSON.parse(existingHistory!);
      if (!newHistory) {
        newHistory = [];
      }
      const alreadyAdded = newHistory.find(
        (item: any) => item.name === fileUploaded.name
      );
      if (!alreadyAdded) {
        newHistory.push({ name: fileUploaded.name, file: file });
        await localStorage.setItem(`Music`, JSON.stringify(newHistory));
      }
      setMusicList(newHistory);
    });
    reader.readAsDataURL(fileUploaded);
  };

  return (
    <MainDiv>
      <Wrapper>
        <Title>
          Master Your Track, <ColoredTitle>Instantly</ColoredTitle>
        </Title>
        <P1>Upload your track and hear it now for free</P1>
        {musicList &&
          musicList.map((item: any, index: number) => {
            return <MusicListItem index={index + 1} audioFile={item} />;
          })}
        <Button onClick={handleClick}>UPLOAD</Button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
          accept="audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg"
        />
      </Wrapper>
    </MainDiv>
  );
};

export default Home;
