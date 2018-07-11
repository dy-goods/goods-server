import * as React from 'react';
import axios from 'axios';

import './index.scss';
import { ChangeEvent } from 'react';

type IProps = {};
type IState = {
  imageData: string;
};

export default class TestPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      imageData: '',
    };
  }
  upload(
    e: ChangeEvent<{
      files: Array<
        File & {
          url: string;
        }
      >;
    }>,
  ) {
    let files = e.target.files; //获取资源
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      files[i].url = URL.createObjectURL(files[i]);
      // 方便本地预览
      data.append(`file${i}`, files[i]);
    }
    console.log(files);
    axios({
      url: '/upload',
      method: 'post',
      data,
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="test-page">
        <h3>Demo1:选取一张图片，并预览</h3>
        <input
          id="img_input"
          type="file"
          onChange={this.upload.bind(this)}
          multiple={true}
        />
        <label htmlFor="img_input" />
        <div className="preview_box">
          {!!this.state.imageData && (
            <img src={this.state.imageData} alt="preview" className="preview" />
          )}
        </div>
        <hr />

        <h3>Demo2:拖拽上传</h3>
        <div id="drop_zone">Drop files here</div>
        <output id="list" />
        <hr />

        <h3>Demo3:label样式</h3>
        <input id="img_input2" type="file" accept="image/*" />
        <label htmlFor="img_input2" id="img_label2">
          选择文件
        </label>
        <div id="preview_box2" />
      </div>
    );
  }
}
