import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';

export default function Result({
  className, type, title, description, extra, actions, ...restPorps
}) {
  const iconMap = {
    error: <Icon className={styles.error} type="close-circle" />,
    success: <Icon className={styles.success} type='check-circle' />
  };
  const clsString = classNames(styles.result, classNames);
  return (
    <div className={clsString} {...restPorps}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}