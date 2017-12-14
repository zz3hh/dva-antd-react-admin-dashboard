import React, { Component } from 'react';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

class CountDown extends Component {
  constructor(props) {
    super(props);

    const { lastTime } = this.initTime(props);

    this.state = {
      lastTime
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.target !== nextProps.target) {
      clearTimeout(this.timer);
      const { lastTime } = this.initTime(nextProps);
      this.setState({
        lastTime
      }, () => {
        this.tick();
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer = 0;
  interVal = 1000;
  initTime = (props) => {
    let lastTime = 0;
    let targetTime = 0;
    try {
      if (Object.prototype.toString().call(props.target) === '[object Date]') {
        targetTime = props.target.getTime();
      } else {
        targetTime = new Date(props.target).getTime();
      }
    } catch (e) {
      throw new Error('invalid target prop', e);
    }

    lastTime = targetTime - new Date().getTime();

    return {
      lastTime
    };
  }

  defaultFormat = (time) => {
    moment(time).format('HH:mm:ss');
  }

  tick = () => {
    const { onEnd } = this.props;
    let { lastTime } = this.state;
    this.timer = setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer);
        this.setState({
          lastTime: 0,
        }, () => {
          if (onEnd) {
            onEnd();
          }
        });
      } else {
        lastTime -= this.interVal;
        this.setState({
          lastTime
        }, () => {
          this.tick();
        })
      }
    }, this.interval);
  }

  render() {
    const { format = this.defaultFormat, ...rest } = this.props;
    const { lastTime } = this.state;
    const result = format(lastTime);
    return (<span {...rest}>{result}</span>);
  }
}