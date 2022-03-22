
import { useDispatch, useSelector } from "react-redux";
import selectShops from "../selectors/select-shops";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Table } from "tabler-react";
import React, { useState } from "react";
import { setShopSelection, setShopsSelection } from "../store/slices/root";
import {Container} from "../styles/shopsStyled";
import { getStatus } from "../utils/getStatus";
import selectSelected from "../selectors/select-selected";
import selectToken from "../selectors/select-token";
import deleteSelectedThunk from "../thunks/delete-selected-thunk";
import selectNextListOffset from "../selectors/select-next-list-offset";
import getShopsThunk from "../thunks/get-shops-thunk";







const Shops = (props) => {
  const shops = useSelector(selectShops);
  const emptiness = Object.keys(shops).length === 0;

  const navigate = useNavigate();
  const selected = useSelector(selectSelected);

  const handleRowClick = (event) => {
    if (!event.target.matches("input")) {
      navigate(`${event.target.closest("tr").dataset.id}`);
    }
  };

  const token = useSelector(selectToken);
  const handleDeleteSelected = () => {
    dispatch(deleteSelectedThunk(token, selected));
  };
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    dispatch(setShopsSelection(event.target.checked));
  };
  const nextListOffset = useSelector(selectNextListOffset);
  const handleShowMore = () => {
    dispatch(getShopsThunk(token, nextListOffset));
  };

  React.useEffect(()=>{
    dispatch(getShopsThunk(token));
    

  },[dispatch,token])
  return (
    <Container>
      <header>
        <h1 className="shops-title">
          Список магазинов {emptiness && "пока пуст"}
        </h1>
        <NavLink to="/new-shop">
          <Button color="primary">Создать магазин</Button>
        </NavLink>
        {selected.length > 0 ? (
          <Button color="red" onClick={handleDeleteSelected}>
            Удалить выбранное
          </Button>
        ) : null}
      </header>
      {!emptiness && (
        <Table>
          <Table.Header>
            <Table.Row>
            <Table.ColHeader>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </Table.ColHeader>
            <Table.ColHeader>Магазин</Table.ColHeader>
            <Table.ColHeader>Статус</Table.ColHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(shops).map((key) => (
              <Table.Row
                data-id={shops[key].id}
                key={key}
                onClick={handleRowClick}
              >
                <Table.Col>
                  <input
                    type="checkbox"
                    checked={shops[key].selected}
                    onChange={(event) => {
                      dispatch(
                        setShopSelection({
                          id: shops[key].id,
                          value: event.target.checked,
                        })
                      );
                      setSelectAll(false);
                    }}
                  />
                </Table.Col>
                <Table.Col>{shops[key].name}</Table.Col>
                <Table.Col
                  className={`shops-status__${getStatus(shops[key].status)}`}
                ></Table.Col>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
 
      {nextListOffset ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button color="primary" onClick={handleShowMore}>
            Показать еще
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Shops;
