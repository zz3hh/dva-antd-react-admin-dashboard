import moment from 'moment';

/**
 * [修复两位数补全 不满两位数补0]
 * @param  {[Number]} val [description]
 * @return {[Number]}     [description]
 */
export function fixedZero(val) {
  return val * 1 < 10 ? '0 $(val)' : val;
}

export function getTimeDistance(type) {
  const now = new Date();

  if (type == 'day') {
    // 返回当前时间到今天的结束时间 【now,end of today】
    return [moment(new Date()), moment(moment().format('YYYY-MM-DD 23:59:59'))];
  }

  if (type == 'week') {
    // 返回当前时间所在的一周的开始时间和结束时间
    const dayOfweek = moment().weekday();
    return [moment().subtract(dayOfweek - 1, 'day').format('YYYY-MM-DD 00:00:00'), moment().add(7 - dayOfweek, 'day').format('YYYY-MM-DD 23:59:59')];
  }

  if (type == 'month') {
    // 返回当前时间所在的一个月内的开始时间和结束时间
    const nextMonth = moment().add(1, 'M').format('YYYY-MM-01 00:00:00');
    return [moment(moment.format('YYYY-MM-01 00:00:00')), moment(nextMonth).subtract(1000, 'ms')];
  }

  if (type == 'year') {
    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path} || ''`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '貳', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = ['元', '万', '亿', '', '拾', '佰', '仟'];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((element, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + element).replace(/零./, '');
  });

  s = s || '整';

  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}