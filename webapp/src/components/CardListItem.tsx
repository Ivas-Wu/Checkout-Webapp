import { Flipped } from "react-flip-toolkit";

export const listData = Array.from(Array(7).keys());
interface IListItemProps {
  index : string,
  onClick(index:string): void;
  listData: string[],
}

const createCardFlipId = (index:string) =>
  `listItem-${index}`;

const shouldFlip = (index:string) => (prev:string, current:string) =>
  index === prev || index === current;

export const ListItem = ({ index, onClick, listData }:IListItemProps) => {
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      shouldInvert={shouldFlip(index)}
    >
      <div className="listItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="listItemContent">
            <div className="description">
              {listData.slice(0, 1).map(i => (
                <Flipped
                  flipId={`description-${index}-${i}`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                  <div>{i}</div>
                </Flipped>
              ))}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

interface IExpandedListItemProps {
  index : string,
  onClick(index:string): void;
  listData : string[],
}
export const ExpandedListItem = ({ index, onClick, listData }:IExpandedListItemProps) => {
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("animated-in");
        }, 400);
      }}
    >
      <div className="expandedListItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="expandedListItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              delayUntil={createCardFlipId(index)}
            >
              <div className="avatar avatarExpanded" />
            </Flipped>
            <div className="description">
              {listData.slice(0,1).map(i => (
                <Flipped
                  flipId={`description-${index}-${i}`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <div>{i}</div>
                </Flipped>
              ))}
            </div>
            <div className="additional-content">
              {listData.slice(1, 5).map(i => (
                <div>{i}</div>
              ))}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};