import React from "react";
import styled from "styled-components";

interface Props {
  index: number;
  audioFile: any;
}

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 512px) {
    flex-direction: column;
  }
`;

const Title = styled.p`
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 18px;
  margin-right: 10px;
`;

const Button = styled.a`
  padding: 3px;
  color: black;
  background-color: white;
  text-decoration: none;
  font-size: 14px;
  margin-left: 10px;
`;

const MusicListItem = ({ index, audioFile }: Props) => {
  const music = new Audio(audioFile.file);

  const playSound = () => {
    music.play();
  };

  const pauseSound = () => {
    music.pause();
  };

  return (
    <MainDiv>
      <Title>
        {index}.{audioFile.name}
      </Title>
      <div>
        <Button onClick={playSound}>Play</Button>
        <Button onClick={pauseSound}>Pause</Button>
        <Button download={audioFile.name} href={audioFile.file}>
          Download
        </Button>
      </div>
    </MainDiv>
  );
};

export default MusicListItem;
