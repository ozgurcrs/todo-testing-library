import React, { FC } from "react";
import { Box, Button, Checkbox, styled, Typography } from "@mui/material";
import { CardListType } from "../../models";

const List = styled(Box)`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #eee;
  padding: 15px;
  font-size: 14px;
  text-align: left;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  color: #333;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }
`;

type CardsType = {
  cardList: CardListType[];
  removeItem: (id: string) => void;
  changeStatusOfItem: (id: string) => Promise<void>;
};

export const Cards: FC<CardsType> = ({
  cardList,
  removeItem,
  changeStatusOfItem,
}) => {
  const onDelete = (id: string) => {
    removeItem(id);
  };

  const handleChange = async (id: string) => {
    await changeStatusOfItem(id);
  };

  return (
    <>
      {cardList.length > 0
        ? cardList.map((item) => (
            <List key={item?.id} data-testid={`card-${item?.id}-data-test-id`}>
              <input
                type={"checkbox"}
                checked={item?.isActive}
                data-testid={`checkbox-${item?.id}-data-test-id`}
                onChange={handleChange.bind(this, item?.id)}
              />
              <img src={item?.avatar} alt="" loading="lazy" />
              <Typography
                data-testid={`typography-${item?.id}-data-test-id`}
                sx={{
                  minWidth: "70%",
                  textDecoration: item?.isActive ? "line-through" : "none",
                }}
              >
                {item?.text}
              </Typography>
              <Button
                data-testid={`delete-${item?.id}-data-test-id`}
                onClick={() => onDelete(item?.id)}
              >
                Delete
              </Button>
            </List>
          ))
        : null}
    </>
  );
};
