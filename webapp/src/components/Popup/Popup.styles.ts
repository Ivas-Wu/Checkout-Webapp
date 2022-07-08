import styled from 'styled-components'

const PopupContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DesktopPopupContainer = styled(PopupContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0,0,0,0.5);
  padding: 40px;
  width: 600px;
  height: 600px;
  font-size: 26px;
  `  
  
export const Header = styled.h3`
  color: #242424;
  font-size: 35px;
  line-height: 1em;
  font-weight: 300;
  margin: 5px 0 10px;
  text-align: center;
`