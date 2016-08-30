import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownProps,
  IPropertyPaneFieldType
} from '@microsoft/sp-client-preview';

import * as strings from 'mystrings';
import TestWebpart, { ITestWebpartProps } from './components/TestWebpart';
import { ITestWebpartWebPartProps } from './ITestWebpartWebPartProps';
import ColorPicker, { IColorPickerProps } from "./components/ColorPicker";


export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ISPListItems {
  value: ISPListItem[];
}

export interface ISPListItem {
  Title: string;
}

export default class TestWebpartWebPart extends BaseClientSideWebPart<ITestWebpartWebPartProps> {

  public dropdownSettings: IPropertyPaneDropdownProps;
  public listItems: Array<ISPListItem>;
  public backgroundColor: string;

  public constructor(context: IWebPartContext) {
    super(context);


    let dropdownSettings: IPropertyPaneDropdownProps = {
      label: 'Test Drop',
      options: [{
        key: 'testString',
        text: 'An Option'
      },
        {
          key: 'sup',
          text: 'another options'
        }]
    };

    this._getListData().then(function (resp) {
      console.log("SPLISTDATA", resp);

      resp.value.map(function (value) {
        dropdownSettings.options.push({ key: value.Title, text: value.Title });
      });

    });

    this.dropdownSettings = dropdownSettings;

    // this._getItemsForSelectedList().then((items)=> {
    //   items.value.map((item)=>{
    //       this.listItems.push({ Title: item.Title })
    //   })

    // }, (err)=>{

    //   console.log(err);
    //  });

  }




  public render(): void {
    const element: React.ReactElement<ITestWebpartProps> = React.createElement(TestWebpart, {
      description: this.properties.description,
      testText: this.properties.testText,
      dropdownValue: this.properties.dropdownValue,
      listItems: this.listItems,
      backgroundColor: this.properties.backgroundColor

    });

    ReactDom.render(element, this.domElement);
  }

  private _getListData(): Promise<ISPLists> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
      .then((response: Response) => {
        return response.json();
      });
  }

  private _getItemsForSelectedList(): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${this.properties.dropdownValue || "Pages"}')/items`)
      .then((response: Response) => {
        return response.json();
      });
  }

  private _customFieldRender(elem: HTMLElement, context: any, onChanged: any): void {

    const element: React.ReactElement<IColorPickerProps> = React.createElement(ColorPicker, {
      onChangeEvent: (obj) => {
        console.log(obj);

        console.log(this);
     //   this._colorPickerChanged();
     this.properties.backgroundColor = obj.color;
     this.render();
      }
    });

    ReactDom.render(element, elem);
  }

  private _colorPickerChanged() {

    alert('changed');
  }




  protected get propertyPaneSettings(): IPropertyPaneSettings {


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('testText', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('dropdownValue', this.dropdownSettings),
                {
                  type: IPropertyPaneFieldType.Custom,
                  targetProperty: 'backgroundColor',
                  properties: {
                    onRender: this._customFieldRender.bind(this),
                    value: undefined,
                    context: this,
                    onChanged: this._colorPickerChanged.bind(this)
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
