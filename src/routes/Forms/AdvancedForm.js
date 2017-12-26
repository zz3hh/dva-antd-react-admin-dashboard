import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Pie } from '../../components/Charts';
// import FooterToolbar from '../../layouts/FooterToolbar';
// import TableForm from './TableForm';
import styles from './style.less';


export default () => {
  var data = [
    {
      "x": "需求问题",
      "y": 0
    },
    {
      "x": "研发问题",
      "y": 0
    }];
  return (<div><Pie
    hasLegend
    subTitle="问题总数"
    total={data.reduce((pre, now) => now.y + pre, 0)}
    data={data}
    height={248}
    lineWidth={4}
  />
  </div>)
};