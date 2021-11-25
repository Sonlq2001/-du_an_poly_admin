import React, { memo, useEffect, useCallback, useState } from 'react';
import Select from 'react-select';
import {
  getProductType,
  getDetail,
  getListCampuses,
  ProductUser
} from './../../redux/product.slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from 'styles/common/common-styles';

import { useParams } from 'react-router';
import ConfirmTable from './../../components/ConfirmTable/ConfirmTable';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import Loading from 'components/Loading/Loading';
import { getSemesters } from '../../../uploadExcel/redux/uploadExcel.slice';
import { MapOptions } from '../../../../helpers/convert/map-options';
import ReviewProduct from 'features/confirm/components/Review/ReviewProduct';

const ConfirmScreen = () => {
  const dispatch = useDispatch();
  const { path } = useParams();
  const { listProduct, isProductLoading, listProductType, productDetail } =
    useSelector((state) => state.product);
    const {useLogin}  = useSelector((state)=>state.auth)
  const [open, setOpen] = useState(true);
  const { listSemester } = useSelector((state) => state.uploadExcel);
  const { listCampuses } = useSelector((state) => state.product);
  const listSelectOptionSemester = MapOptions(listSemester);
  const listSelectOptionCampuses = MapOptions(listCampuses);
  const ProductTypes = useCallback(() => {
    dispatch(getProductType());
  }, [dispatch]);

  const CampusesList = useCallback(() => {
    dispatch(getListCampuses());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSemesters());
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    ProductTypes();
    dispatch(ProductUser({user_id : useLogin.id}))
    CampusesList();
  }, [dispatch, ProductTypes, CampusesList ,useLogin]);
  useEffect(() => {
    dispatch(getDetail(path));
  }, [dispatch, path]);
  // change kỳ học
  const HandlerSemester = (data) => {
    console.log('data', data);
  };
  if (isProductLoading) {
    return <Loading />;
  }
  return (
    <>
      <TitleMain> Danh sách sản phẩm </TitleMain>
      <WrapContent>
        <TitleControl>Tìm kiếm</TitleControl>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên sản phẩm
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Chủ nhiệm
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Quản trị', value: 1 },
                { label: 'Giáo vụ', value: 2 },
                { label: 'Giảng viên', value: 3 },
                { label: 'Sinh viên', value: 4 },
              ]}
              placeholder="Tìm theo chủ nhiệm"
            />
          </BoxControl>
        </BoxSearchInput>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Bộ môn
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Quản trị', value: 1 },
                { label: 'Giáo vụ', value: 2 },
                { label: 'Giảng viên', value: 3 },
                { label: 'Sinh viên', value: 4 },
              ]}
              placeholder="Tìm theo bộ môn"
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Kì học
            </label>
            <Select
              className="select-option input-search"
              options={
                ({ label: 'All', value: 1 },
                listSelectOptionSemester ? listSelectOptionSemester : [])
              }
              placeholder="Tìm theo kì học"
              onChange={(e) => HandlerSemester(e)}
            />
          </BoxControl>
        </BoxSearchInput>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Cơ sở
            </label>
            <Select
              className="select-option input-search"
              options={listSelectOptionCampuses}
              placeholder="Tìm theo Cơ Sở "
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Kì học
            </label>
            <Select
              className="select-option input-search"
              options={[
                {},
                { label: 'Phê duyệt ', value: 1 },
                { label: 'Đang chờ ', value: 2 },
              ]}
              placeholder="Trạng Thái "
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>

      <ConfirmTable
        data={listProduct}
        listProductType={listProductType}
        productDetail={productDetail}
      />
       { path && productDetail && (
        <PopupOverlay
          open={open}
          setOpen={setOpen}
          size="xl"
          title="Chi Tiết Sản Phẩm "
          scroll
        >
          <ReviewProduct
            data={productDetail && productDetail}
            setOpen={setOpen}
          />
        </PopupOverlay>
      )}
    </>
  );
};

export default memo(ConfirmScreen);
