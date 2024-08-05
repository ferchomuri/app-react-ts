import { useEffect, useRef, useState } from "react";
import { getProducts } from "../middlewares/productBridge";
import { formatDate } from "../utils/dateUtils";
import { IProductProps } from "../types";

const useData = (): [any, boolean, () => void] => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const flagGettingData = useRef<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await getProducts()) as IProductProps[];

        const formattedData: IProductProps[] = response.map((product) => ({
          ...product,
          date_release: formatDate(product.date_release),
          date_revision: formatDate(product.date_revision),
        }));

        // Simulate a delay to show the loading spinner
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (!flagGettingData.current || reload) {
      flagGettingData.current = true;
      fetchData();
      setReload(false);
    }
  }, [reload]);

  const reloadData = () => {
    setIsLoading(true);
    setReload(true);
  };

  return [data, isLoading, reloadData];
};

export default useData;
