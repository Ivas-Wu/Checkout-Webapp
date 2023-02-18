import Card from './Card';
import React, { useEffect, useState } from 'react';
import './Card.css';
import { Contents, Controls, Toggle, CardGrid } from './index.styled';

interface IIndexPageProps {
  pages: string[][];
}

export const IndexPage: React.FC<IIndexPageProps> = (props) => {
  const [sort, setSort] = useState<string>('ascending');

  const changeSort = (newSort: string) => {
    if (newSort === 'ascending') {
      setSort('ascending');
    } else if (newSort === 'descending') {
      setSort('descending');
    } else {
      setSort('unknown');
    }
  };

  useEffect(() => {
    sortList();
  }, [sort, setSort]);

  const sortList = () => {
    if (sort === 'ascending') {
      props.pages.sort((one, two) => (one[1] > two[1] ? -1 : 1));
    } else if (sort === 'descending') {
      props.pages.sort((one, two) => (one[1] < two[1] ? -1 : 1));
    }
  };

  return (
    <div style={{background:"#F1FCFF"}}>
      <Contents>
        <Controls>
          <div>
            <Toggle
              active={sort === 'ascending'}
              onClick={() => changeSort('ascending')}
            >
              <i className="fa-solid fa-dollar-sign" />
              <i className="fa-solid fa-arrow-up-wide-short" />
            </Toggle>
            <Toggle
              active={sort === 'descending'}
              onClick={() => changeSort('descending')}
            >
              <i className="fa-solid fa-dollar-sign" />
              <i className="fa-solid fa-arrow-down-short-wide" />
            </Toggle>
          </div>
        </Controls>
        <CardGrid>
          {props.pages.map((page) => {
            return <Card src={page[0]} text={page[1]} path={page[2]} />;
          })}
        </CardGrid>
      </Contents>
    </div>
  );
};

export default IndexPage;
