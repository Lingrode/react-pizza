import React from "react";
// import qs from "qs";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
} from "../components";

// import { sortList } from "../components/Sort";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import {
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
// import { FetchPizzasArgs } from "../redux/pizza/types";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch]
  );

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    //   if (isMounted.current) {
    //     const queryString = qs.stringify({
    //       sortProperty: sort.sortProperty,
    //       categoryId,
    //       currentPage,
    //     });

    //     navigate(`?${queryString}`);
    //   }

    //   if (!window.location.search) {
    //     dispatch(fetchPizzas({} as FetchPizzasArgs));
    //   }
    //   // isMounted.current = true;
    // }, [categoryId, sort.sortProperty, currentPage, navigate]);

    // React.useEffect(() => {
    //   if (window.location.search) {
    //     const params = qs.parse(
    //       window.location.search.substring(1)
    //     ) as unknown as FetchPizzasArgs;

    //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

    //     dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId: Number(params.category),
    //         currentPage: params.currentPage,
    //         sort: sort || sortList[0],
    //       })
    //     );
    //   }
    //   isSearch.current = true;
    // }, []);

    // React.useEffect(() => {
    //   window.scrollTo(0, 0);
    getPizzas();

    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Сталася помилка 😕</h2>
          <p>
            На жаль, не вдалось отримати пітси :( <br />
            Спробуйте повторити спробу пізніше.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
