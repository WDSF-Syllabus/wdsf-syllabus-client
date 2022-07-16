import { useMemo, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../../utils/api";
import { FigureSearch } from "../../components/FigureSearch";
import { Figure } from "../../model/interface/Figure";
import { FootFilter } from "../../components/FootFilter";

interface Props {
  figures: Array<Figure>;
}

const Figures: NextPage<Props> = ({ figures }) => {
  const [search, setSearch] = useState("");
  const [footFilter, setFootFilter] = useState<"Left" | "Right" | null>(null);

  const filteredFigures = useMemo<Figure[]>(() => {
    const lowerCaseSearch = search.toLowerCase();
    return figures.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [figures, search]);

  const filteredFiguresByFoot = useMemo<Figure[]>(() => {
    if (footFilter === null) {
      return filteredFigures;
    }
    return filteredFigures.filter(
      ({ startFoot }) => startFoot.description === footFilter
    );
  }, [filteredFigures, footFilter]);

  return (
    <div>
      <Head>
        <title>Figures</title>
      </Head>

      <div className="flex flex-col gap-4 p-4">
        <FigureSearch value={search} onChange={setSearch} />
        <FootFilter value={footFilter} onChange={setFootFilter} />
        <main>
          <ul>
            {filteredFiguresByFoot.map((figure) => (
              <li key={figure.slug}>
                <Link href={`/figures/${figure.slug}`}>
                  <a>{figure.name}</a>
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
  const figures: Array<Figure> = await api.getFigures();
  return { props: { figures } };
};

export default Figures;
