import Head from 'next/head';

import { Navbar } from '../components/Navbar/Navbar';

export default function Home(props) {
  const { drizzle, drizzleState } = props;
  console.log(drizzle, drizzleState);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar account={1234} />

      </main>
    </div>
  );
}
