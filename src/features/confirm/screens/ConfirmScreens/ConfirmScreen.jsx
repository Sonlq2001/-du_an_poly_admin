import React, { memo, useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router';
import { CgSortAz } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';

import {
  getDetail,
  getProductUser,
  postSearchProduct,
  postFilterCommonProduct,
  getFilterStatusProduct,
} from './../../redux/product.slice';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from 'styles/common/common-styles';

import ConfirmTable from './../../components/ConfirmTable/ConfirmTable';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';

import { getSemester } from 'features/semester/redux/semester.slice';
import { getCampuses } from 'features/campuses/redux/campuses.slice';
import { getProductType } from 'features/product-type/redux/product-type.slice';

import { MapOptions } from 'helpers/convert/map-options';
import ReviewProduct from 'features/confirm/components/Review/ReviewProduct';
import { defaultPaginationParams } from 'constants/api.constants';

const ConfirmScreen = () => {
  const dispatch = useDispatch();
  const { path } = useParams();

  const {
    productDetail,
    loadingDetail,
    userLogin,
    listCampuses,
    listSemester,
  } = useSelector((state) => ({
    productDetail: state.product?.productDetail,
    loadingDetail: state.product?.loadingDetail,
    userLogin: state.auth?.userLogin,
    listCampuses: state.campuses?.listCampuses,
    listSemester: state.semester?.listSemester,
  }));

  const [open, setOpen] = useState(true);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });

  const listSelectOptionSemester = MapOptions(listSemester ?? []);
  const listSelectOptionCampuses = MapOptions(listCampuses ?? []);

  const [keySearch, setKeySearch] = useState(null);
  const [isFilterAdvanced, setIsFilterAdvanced] = useState(false);
  const timeOutString = useRef(null);

  useEffect(() => {
    dispatch(getSemester({}));
    dispatch(getProductUser({ user_id: userLogin?.id }));
    dispatch(getProductType({}));
    dispatch(getCampuses({}));
  }, [dispatch, userLogin]);

  useEffect(() => {
    dispatch(getDetail(path));
  }, [dispatch, path]);

  const handleFilterStatus = (option) => {
    dispatch(getFilterStatusProduct(option.value));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeySearch(value);
    clearTimeout(timeOutString?.current);

    if (value) {
      timeOutString.current = setTimeout(() => {
        dispatch(postSearchProduct({ text: keySearch }));
      }, 500);
    } else {
      timeOutString.current = setTimeout(() => {
        dispatch(getProductUser({ user_id: userLogin?.id }));
      }, 500);
    }
  };

  const handleFilterCommon = (option, type) => {
    dispatch(
      postFilterCommonProduct({
        id: option.value,
        type: type,
      })
    );
  };

  return (
    <>
      <TitleMain> Danh sách sản phẩm </TitleMain>
      <WrapContent>
        <div className="titleSearch">
          <TitleControl>Tìm kiếm</TitleControl>
          <span onClick={() => setIsFilterAdvanced(!isFilterAdvanced)}>
            <i className="icon">
              <CgSortAz />
            </i>
            Nâng cao
          </span>
        </div>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên sản phẩm
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
              onKeyUp={handleSearch}
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
              onChange={(e) => handleFilterCommon(e, 'major')}
            />
          </BoxControl>
        </BoxSearchInput>
        <div className={isFilterAdvanced ? 'showFilter' : 'hidenFilter'}>
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
                onChange={(e) => handleFilterCommon(e, 'master_user')}
              />
            </BoxControl>

            <BoxControl className="box-control">
              <label htmlFor="" className="label-control">
                Kì học
              </label>
              <Select
                className="select-option input-search"
                options={listSelectOptionSemester ?? []}
                placeholder="Tìm theo kì học"
                onChange={(e) => handleFilterCommon(e, 'semester')}
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
                options={listSelectOptionCampuses ?? []}
                placeholder="Tìm theo Cơ Sở "
                onChange={(e) => handleFilterCommon(e, 'campus')}
              />
            </BoxControl>
            <BoxControl className="box-control">
              <label htmlFor="" className="label-control">
                Trạng thái
              </label>
              <Select
                className="select-option input-search"
                options={[
                  { label: 'Chờ xác nhận lần 1', value: 1 },
                  { label: 'Chờ xác nhận lần 2', value: 2 },
                  { label: 'Hoàn thành', value: 3 },
                ]}
                placeholder="Trạng Thái "
                onChange={handleFilterStatus}
              />
            </BoxControl>
          </BoxSearchInput>
        </div>
      </WrapContent>

      <ConfirmTable pagination={pagination} setPagination={setPagination} />

      {loadingDetail ? (
        <>
          {productDetail !== undefined && (
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
      ) : (
        ''
      )}
    </>
  );
};

export default memo(ConfirmScreen);
