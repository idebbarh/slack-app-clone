import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function SideBarOption({
  Icon,
  title,
  isHidden,
  setIsHiddenOptionsOpen,
  extraIcons,
  isChannel,
  setIsChannelsListOpen,
  isActive,
  setChannels,
  channelId,
}) {
  const [isExtraIconsHidden, setIsExtraIconsHidden] = useState(true);
  const navigate = useNavigate();
  const selectChannelHandler = ()=>{
              setChannels((prevState) =>
                prevState.map((channel) =>
                  channel.name === title
                    ? { ...channel, isActive: true }
                    : { ...channel, isActive: false }
                )
              )
            navigate(`/${channelId}`)
  }
  return (
    <OptionContainer
      isHidden={isHidden}
      onClick={
        setIsHiddenOptionsOpen
          ? () => setIsHiddenOptionsOpen((prevState) => !prevState)
          : setIsChannelsListOpen
          ? () => setIsChannelsListOpen((prevState) => !prevState)
          : setChannels
          ? selectChannelHandler
          : undefined
      }
      onMouseOver={() => setIsExtraIconsHidden(false)}
      onMouseOut={() => setIsExtraIconsHidden(true)}
      isActive={isActive}
    >
      <Icon />
      <OptionTitle>{title}</OptionTitle>
      {extraIcons && (
        <ExtraIconsContainer isExtraIconsHidden={isExtraIconsHidden}>
          {extraIcons.map((Icon, index) => (
            <Icon key={index} />
          ))}
        </ExtraIconsContainer>
      )}
    </OptionContainer>
  );
}

export default SideBarOption;

const OptionContainer = styled.div`
  padding: 5px 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${(props) =>
    !props.isHidden
      ? `${props.isActive ? "var(--white-color)" : "var(--second-white-color)"}`
      : "#292929"};
  cursor: pointer;
  font-size: 14px;
  background-color: ${(props) =>
    props.isActive
      ? "var(--active-color)"
      : `${!props.isHidden ? "var(--purple-color-20)" : "var(--white-color)"}`};
  :hover {
    background-color: ${(props) =>
      !props.isHidden
        ? `${props.isActive ? "var(--active-color)" : "var(--purple-color-10)"}`
        : "var(--active-color)"};
    color: ${(props) =>
      !props.isHidden
        ? `${
            props.isActive ? "var(--white-color)" : "var(--second-white-color)"
          }`
        : "var(--white-color)"};
  }
  > .MuiSvgIcon-root {
    font-size: 18px;
  }
`;

const OptionTitle = styled.h4`
  text-transform: capitalize;
  font-weight: 500;
`;

const ExtraIconsContainer = styled.div`
  display: flex;
  margin-left: auto;
  opacity: ${(props) => (props.isExtraIconsHidden ? "0" : "1")};
  transition: opacity 0.3s ease;
`;
