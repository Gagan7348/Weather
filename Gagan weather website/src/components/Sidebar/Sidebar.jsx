import Logo from '../utilities/Logo';
import SearchBar from './SearchBar';
import SidebarWeather from './SidebarWeather';
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';

const AnimationDiv = styled.div`
  animation: 0.5s ${keyframes`${slideInLeft}`} 1;
`;
let AnimationDivSecond = styled.div``;

const Sidebar = () => {
  return (
    <div className="sidebar">
      <AnimationDiv>
        <Logo />
        <SearchBar />
      </AnimationDiv>
      <AnimationDivSecond>
        <SidebarWeather />
      </AnimationDivSecond>
    </div>
  );
};

export default Sidebar;
