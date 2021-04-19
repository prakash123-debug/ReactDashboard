import styled from '@emotion/styled';


export const FooterContainer = styled.div`
width: ${p => p.isSidebarOpen ? '83.9%' : '94%'};
 background-image: linear-gradient(
  315deg,
  ${p => p.colorPalette.bgColor1} 0%,
  ${p => p.colorPalette.bgColor2} 70%),
  url(${p => p.backgroundImage});
 color: ${p => p.colorPalette.fontColorSelected};
 position:fixed;
 top:92.7%; right:0;
 background-size: cover;
 background-repeat: no-repeat;
 background-position: center center;
`

export const colors_datas = styled.div`
 height:60px;

`

