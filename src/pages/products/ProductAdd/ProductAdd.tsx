import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Text } from "../../../components";
import { existProduct, saveProduct } from "../../../middlewares/productBridge";
import { formatDatePut } from "../../../utils/dateUtils";
import "./ProductAdd.css";

const ProductAdd = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const existId = await validateId(data.id);

      if (existId) {
        setError("id", {
          type: "custom",
          message: "Este ID ya existe",
        });
        return;
      }

      const formattedData = {
        ...data,
        date_revision: formatDatePut(data.date_revision),
        date_release: formatDatePut(data.date_release),
      };

      await saveProduct(formattedData);
      navigate("/");

      reset({ ...data });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validateId = async (id: string) => {
    try {
      const response = await existProduct(id);
      return response;
    } catch (error) {
      console.error("Error validating ID:", error);
      return false;
    }
  };

  const validateDate = (date_release: any) => {
    try {
      const date_release_value = date_release.target.value;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const currentDateTimestamp = currentDate.getTime();

      const dateToCompare = new Date(date_release_value);
      dateToCompare.setHours(0, 0, 0, 0);
      const dateToCompareTimestamp = dateToCompare.getTime();

      const isValidDate = dateToCompareTimestamp >= currentDateTimestamp;

      if (!isValidDate) {
        setError("date_release", {
          type: "custom",
          message: "La fecha no puede ser menor a la actual",
        });
        return;
      } else {
        clearErrors("date_release");
      }

      const date = new Date(date_release_value);
      date.setFullYear(date.getFullYear() + 1);

      const formattedDate = date.toISOString().split("T")[0];

      setValue("date_revision", formattedDate);
    } catch (error) {
      console.error("Error validating date:", error);
    }
  };

  return (
    <Container>
      <div className='main-container-add'>
        <Text
          text='Formulario de Registro'
          type='bold-text'
          size='24px'
          align='center'
        />

        <hr className='line' />

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='container-items-add'>
              <Input
                placeholder='ID'
                name='id'
                type='text'
                label='ID'
                register={register}
                validation={{
                  required: true,
                  minLength: {
                    value: 2,
                    message: "Mínimo 2 caracteres requeridos",
                  },
                  maxLength: {
                    value: 8,
                    message: "Máximo 8 caracteres permitidos",
                  },
                }}
                error={errors.id}
              />
              <Input
                placeholder='Nombre'
                name='name'
                type='text'
                label='Nombre'
                register={register}
                validation={{
                  required: true,
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                }}
                error={errors.nombre}
              />
            </div>
            <div className='container-items-add'>
              <Input
                placeholder='Descripción'
                name='description'
                type='text'
                label='Descripción'
                register={register}
                validation={{
                  required: true,
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                }}
                error={errors.description}
              />
              <Input
                placeholder='Logo'
                name='logo'
                type='text'
                label='Logo'
                register={register}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className='container-items-add'>
              <Input
                placeholder='Fecha de liberación'
                name='date_release'
                type='date'
                label='Fecha de liberación'
                register={register}
                validation={{
                  required: true,
                  onChange: (e: any) => validateDate(e),
                }}
                error={errors.date_release}
              />
              <Input
                disabled
                placeholder='Fecha de revisión'
                name='date_revision'
                type='date'
                label='Fecha de revisión'
                register={register}
                error={errors.date_revision}
              />
            </div>
            <div className='container-buttons-add'>
              <Button color='secondary-button' text='Reiniciar' type='reset' />
              <Button text='Guardar' type='submit' />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ProductAdd;
