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
  changeStatusOfItem: (id: string) => void;
};

export const Cards: FC<CardsType> = ({
  cardList,
  removeItem,
  changeStatusOfItem,
}) => {
  const onDelete = (id: string) => {
    removeItem(id);
  };

  const handleChange = (id: string) => {
    changeStatusOfItem(id);
  };

  return (
    <>
      {cardList.map(({ id, text, isActive, avatar }) => (
        <List key={id} data-testid={`card-${id}-data-test-id`}>
          <Checkbox
            checked={isActive}
            data-testid={`checkbox-${id}-data-test-id`}
            onChange={() => handleChange(id)}
          />
          <img src={avatar} alt="" loading="lazy" />
          <Typography
            data-testid={`typography-${id}-data-test-id`}
            sx={{
              minWidth: "70%",
              textDecoration: isActive ? "line-through" : "none",
            }}
          >
            {text}
          </Typography>
          <Button
            data-testid={`delete-${id}-data-test-id`}
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </List>
      ))}
    </>
  );
};
