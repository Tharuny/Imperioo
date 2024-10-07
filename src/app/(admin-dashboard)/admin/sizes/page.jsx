"use client";

import { useState, useEffect } from "react";
import { SizesPageView } from "pages-sections/vendor-dashboard/sizes/page-view";
import { getSize } from "app/store/sizeRedux/sizeAction";
import { useDispatch, useSelector } from "react-redux";

export default function Colors() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const sizeDetails = useSelector(state => state.size.sizeDetails);

  useEffect(() => {
    const fetchSizes = async () => {
      // Fetch sizes from API or dispatch a Redux action
      dispatch(getSize());
    };

    fetchSizes();
  }, [dispatch]);

  useEffect(() => {
    if (sizeDetails) {
      setData(sizeDetails);
    }
  }, [sizeDetails]);


  return <SizesPageView sizes={data} />;
}
