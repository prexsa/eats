import React from 'react';
import { Button, Grid, List, Menu, Image, Tab } from 'semantic-ui-react';

const src = '../../public/novitec.jpg';

class TabsPhoto extends React.Component {
  state = { activeItem: '10' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <h3>Photos</h3>
        <Image.Group size='medium'>
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
          <Image src={src} />
        </Image.Group>
        <Menu pagination>
          <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
          <Menu.Item disabled>...</Menu.Item>
          <Menu.Item name='10' active={activeItem === '10'} onClick={this.handleItemClick} />
          <Menu.Item name='11' active={activeItem === '11'} onClick={this.handleItemClick} />
          <Menu.Item name='12' active={activeItem === '12'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    )
  }
}

export default TabsPhoto;