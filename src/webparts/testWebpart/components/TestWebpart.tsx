import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../TestWebpart.module.scss';
import { ITestWebpartWebPartProps } from '../ITestWebpartWebPartProps';

export interface ITestWebpartProps extends ITestWebpartWebPartProps {
}

export default class TestWebpart extends React.Component<ITestWebpartProps, {}> {
  public render(): JSX.Element {

    const backgroundColorStyle = {
      backgroundColor: this.props.backgroundColor || "green"
    }

    return (
      <div className={styles.testWebpart}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-fontColor-white', styles.row)} style={backgroundColorStyle}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
                <p className='ms-font-l ms-fontColor-white'>
                {this.props.testText}
              </p>
               <p className='ms-font-l ms-fontColor-white'>
                {this.props.dropdownValue}
              </p>
              <p>

              </p>
              <a
                className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'
              >
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
