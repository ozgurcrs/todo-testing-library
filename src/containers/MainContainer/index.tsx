import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { FC, useContext } from "react";
import { Cards } from "../../components/Cards";
import { TodoStoreContext } from "../../context";

const Wrapper = styled(Box)`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FormWrapper = styled(Box)`
  width: 45%;
  border-bottom: 1px solid #d2d2d2;
  overflow: hidden;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 30px 0;
`;

const TextInput = styled("input")`
  width: 100%;
  border: 0;
  outline: none;
  background: none;
  box-shadow: 0;
`;

const ListWrapper = styled(Box)`
  width: 45%;
  height: auto;
  margin-top: 15px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const MainContainer: FC = () => {
  const { cardList, removeItem, addItem, changeStatusOfItem } =
    useContext(TodoStoreContext);

  const handleSaveItem = (e: any) => {
    if (e.keyCode === 13) {
      addItem(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <TextInput onKeyDown={handleSaveItem} />
      </FormWrapper>

      <ListWrapper>
        <Cards
          cardList={cardList}
          changeStatusOfItem={changeStatusOfItem}
          removeItem={removeItem}
        />
      </ListWrapper>
    </Wrapper>
  );
};

export default MainContainer;
