import Head from 'next/head';

import { Navbar } from '../components/Navbar/Navbar';
// eslint-disable-next-line import/no-named-as-default
import MainController from '../components/MainController';

export default function Home(props) {
  const { drizzle, drizzleState } = props;
  console.log(drizzle, drizzleState);

  return (
    <div>
      <Head>
        <title>Bloinx App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <MainController account={drizzle} />
      </main>
    </div>
  );
}
