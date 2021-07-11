import { Menu } from 'antd';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export default function NavAside() {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <div className={styles.logo} />
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link href="/Dashboard">
          <span>
            <FormattedMessage id="navAside.dashboard" />
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link href="/CreateBatch">
          <span>
            <FormattedMessage id="navAside.createbatch" />
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FileOutlined />}>
        <Link href="/RegisterPay">
          <span>
            <FormattedMessage id="navAside.registerpay" />
          </span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}
