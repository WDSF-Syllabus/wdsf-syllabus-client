import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Figure } from "../../model/interface/Figure";
import { api } from "../../utils/api";

interface Props {
  figures: Array<Figure>;
}

const Figures: NextPage<Props> = ({ figures }) => (
  <div>
    <Head>
      <title>Figures</title>
    </Head>

    <main>
      <ul>
        {figures.map(({ slug, name }) => (
          <li key={slug}>
            <Link href={`/figures/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const figures: Array<Figure> = await api.getFigures();
  return { props: { figures } };
};

export default Figures;
