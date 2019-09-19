import React, { PureComponent } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import PropTypes from 'prop-types';

const convert = require('xml-js');

class RegisterTraining extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        // MAGIC HERE
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          const { result } = reader;
          //xsd
          console.log('result', result);

          //json
          const json = convert.xml2json(result, { compact: true, spaces: 4 });
          console.log('json', json);


        };

        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

RegisterTraining.propTypes = {};

export default RegisterTraining;
