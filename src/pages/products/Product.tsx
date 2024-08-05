import React, { useState } from "react";
import { Button, Container, Input, Modal, Table } from "../../components";
import { useData } from "../../hooks";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../middlewares/productBridge";

const columns = [
  {
    label: "Logo",
    name: "logo",
  },
  {
    label: "Nombre del producto",
    name: "name",
  },
  {
    label: "Descripción",
    name: "description",
  },
  {
    label: "Fecha de liberación",
    name: "date_release",
  },
  {
    label: "Fecha de reestructuración",
    name: "date_revision",
  },
];

const Product = () => {
  const [data, isLoading, reloadData] = useData();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedItem.id);
      setIsModalOpen(false);
      reloadData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredData = data.filter((item: any) =>
    columns.some((column) =>
      (item[column.name as keyof any] as any)
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  return (
    <Container>
      {!isLoading && (
        <div className='container-button-product' data-testid='product_test'>
          <Input
            placeholder='Buscar...'
            type='text'
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            size='fixed-width-button'
            text='Agregar'
            onClick={() => navigate("/add-product")}
          />
        </div>
      )}
      <Table
        data={filteredData}
        columns={columns}
        loading={isLoading}
        actions={[
          {
            action: "Editar",
            do: (item: any) => navigate("/edit-product", { state: item }),
          },
          {
            action: "Eliminar",
            do: async (item: any) => {
              handleDelete(item);
            },
          },
        ]}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Confirmar eliminación</h2>
        <p>{`¿Estás seguro de que deseas eliminar el producto ${selectedItem?.name}?`}</p>
        <div className='button-end'>
          <Button
            text='Cancelar'
            onClick={() => setIsModalOpen(false)}
            color='secondary-button'
          />
          <Button text='Confirmar' onClick={confirmDelete} />
        </div>
      </Modal>
    </Container>
  );
};

export default Product;
