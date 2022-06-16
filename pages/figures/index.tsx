import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../../utils/api";
import { FigurePreview } from "../../model/type/FigurePreview";

interface Props {
  figurePreviews: Array<FigurePreview>;
}

const Figures: NextPage<Props> = ({ figurePreviews }) => (
  <div>
    <Head>
      <title>Figures</title>
    </Head>

    <main>
      <ul>
        {figurePreviews.map(({ slug, name }) => (
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
  const figurePreviews: Array<FigurePreview> = await api.getFigurePreviews();
  return { props: { figurePreviews } };
};

export default Figures;
