import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { api } from "../../utils/api";
import { Figure } from "../../model/interface/Figure";

interface Props {
  figure: Figure;
}

const FigurePage: NextPage<Props> = ({ figure }) => (
  <div>
    <Head>
      <title>{figure.name}</title>
    </Head>

    <main>
      <pre>{JSON.stringify(figure, null, 2)}</pre>
    </main>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const figureSlugs: Array<Figure> = await api.getFigures();
  return {
    paths: figureSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug: string = typeof params?.slug === "string" ? params.slug : "";
  const figure: Figure = await api.getFigure(slug);
  return { props: { figure } };
};

export default FigurePage;
