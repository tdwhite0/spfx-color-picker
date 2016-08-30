import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import 'rc-color-picker/assets/index.css';
import {Panel as ColorPickerPanel} from 'rc-color-picker';







export interface IColorPickerProps {
  onChangeEvent: any
}


export default class ColorPicker extends React.Component<IColorPickerProps, {}> {

  public state;

  constructor(props) {
    super(props);

    this.state = {
      selectedColor: '',
      test: 'test'
    }
  }




  public render(): JSX.Element {

    console.log("CONTEXT", this.props);
    var colorList = ['000000', '993300', '333300', '003300', '003366', '000066', '333399', '333333',
      '660000', 'FF6633', '666633', '336633', '336666', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33', 'FFFF66', '99FF66', '99CCCC', '66CCFF', '993366', 'CCCCCC', 'FF99CC', 'FFCC99', 'FFFF99', 'CCffCC', 'CCFFff', '99CCFF', 'CC99FF', 'FFFFFF'];



    return (
      <div className="color-wrapper">


        <p>Choose color for the background of the webpart.</p>

         <ColorPickerPanel  color={'#468890'} mode="HSL" onChange={this.props.onChangeEvent}  style={{ margin: '0 auto'}} />



      </div>
    );
  }
}

