import { useMemo, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../../utils/api";
import { FigurePreview } from "../../model/type/FigurePreview";
import { FigureSearch } from "../../components/FigureSearch";

interface Props {
  figurePreviews: Array<FigurePreview>;
}

const Figures: NextPage<Props> = ({ figurePreviews }) => {
  const [search, setSearch] = useState("");

  const filteredFigurePreviews = useMemo<FigurePreview[]>(() => {
    const lowerCaseSearch = search.toLowerCase();
    return figurePreviews.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [figurePreviews, search]);

  return (
    <div>
      <Head>
        <title>Figures</title>
      </Head>

      <div className="flex flex-col gap-4 p-4">
        <FigureSearch value={search} onChange={setSearch} />
        <main>
          <ul>
            {filteredFigurePreviews.map(({ slug, name }) => (
              <li key={slug}>
                <Link href={`/figures/${slug}`}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const figurePreviews: Array<FigurePreview> = await api.getFigurePreviews();
  return { props: { figurePreviews } };
};

export default Figures;
