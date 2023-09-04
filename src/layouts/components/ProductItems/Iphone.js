import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "src/config";
import classNames from "classnames/bind";
import styles from "./ProductItems.module.scss"
import HomeLoading from "src/components/Loading/HomeLoading";
import * as categoryApi from "src/services/categoryApi";





const cx = classNames.bind(styles)

function Iphone() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const fetchApi = async () => {
            const result = await categoryApi.findProductsByCategory("iphone");
            setLoading(false);
            setData(result);
        };

        fetchApi();
    }, [])
    const dataSlice = data.slice(0, 4)
    return (
        <>
            {loading && <HomeLoading />}
            {!loading && <div>
                <h1 className={cx('heading')}>iPhone</h1>
                <div className={cx('grid wide')}>
                    <div className={cx('row wide')}>
                        {dataSlice.map((product) =>
                            <div className={cx('col wide l-3 m-4 c-6')} key={product.id}>
                                <Link to={`iphones/${product.id}`} className={cx('wrapper')}>
                                    <div className={cx('background-product')} style={{ backgroundImage: `url(${product.image})` }}></div>
                                    <p className={cx('product-name')}>{product.name}</p>
                                    <p className={cx('product-price')}>Giá từ {(product.price).toLocaleString().concat('đ')}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={cx('button-wrapper')}>
                        <Link to={config.routes.iphone} className={cx('button')}>Xem tất cả</Link>
                    </div>
                </div>
            </div >}
        </>
    );
}

export default Iphone;