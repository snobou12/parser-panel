
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import selectRegions from "../selectors/select-regions";
import selectCurrentShop from "../selectors/select-current-shop";

import selectSelectedRegions from "../selectors/select-selected-regions";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "tabler-react";
import { Container } from "../styles/regionsStyled";
import selectToken from "../selectors/select-token";
import { setRegionsSelection, setRegionSelection } from "../store/slices/root";
import getRegionsThunk from "../thunks/get-regions-thunk";
import deleteSelectedRegionsThunk from "../thunks/delete-selected-regions-thunk";



const Regions = () => {
  const params = useParams();
  const { shopId } = params;
  const regions = useSelector(selectRegions);
  const currentShop = useSelector(selectCurrentShop(shopId));

  const emptiness = regions ? Object.keys(regions).length === 0 : true;

  const navigate = useNavigate();
  const selected = useSelector(selectSelectedRegions);

  const handleRowClick = (event) => {
    if (!event.target.matches("input")) {
      navigate(`${event.target.closest("tr").dataset.id}`);
    }
  };

  const token = useSelector(selectToken);

  const handleDeleteSelectedRegions = () => {
    
       dispatch(deleteSelectedRegionsThunk(token,selected,shopId));
  };

  const [selectAll, setSelectAll] = useState(false);

  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    dispatch(setRegionsSelection(event.target.checked));
  };

  React.useEffect(() => {
    dispatch(getRegionsThunk(token, shopId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <header>
        <h1 className="shops-title">
          Регионы магазина {currentShop?.name} {emptiness && "пока пуст"}
        </h1>
        <NavLink to={`/shops/${shopId}/new-region`}>
          <Button color="primary">Создать регион</Button>
        </NavLink>
        {selected.length > 0 ? (
          <Button color="red" onClick={handleDeleteSelectedRegions}>
            Удалить выбранное
          </Button>
        ) : null}
      </header>
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
            <Table.ColHeader>Регион</Table.ColHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {regions ? Object.keys(regions).map((key) => (
            <Table.Row
              data-id={regions[key].id}
              key={key}
              onClick={handleRowClick}
            >
              <Table.Col>
                <input
                  type="checkbox"
                  checked={regions[key].selected}
                  onChange={(event) => {
                    dispatch(
                      setRegionSelection({
                        id: regions[key].id,
                        value: event.target.checked,
                      })
                    );
                    setSelectAll(false);
                  }}
                />
              </Table.Col>
              <Table.Col>{regions[key].name}</Table.Col>
            </Table.Row>
          )) : null}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Regions;
