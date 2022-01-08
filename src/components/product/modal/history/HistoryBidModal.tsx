import * as React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { productActions } from "../../../../app/reducers/product-slice";
import { pagingConstant } from "../../../../constants";
import { Bid, Product } from "../../../../models";
import { formatNumber, hideBidderName } from "../../../../utils/helpers";
import { Paginator } from "../../../common/paginator/paginator";
import classes from "./HistoryBidModal.module.css";
export interface HistoryBidModalProps {
    show: boolean;
    handleClose: () => void;
    product?: Product;
}

export default function HistoryBidModal({ show, handleClose, product }: HistoryBidModalProps) {
    const { isLoadingBidHistory, currentBidHistoryPage, totalBidHistoryPages, bids } = useAppSelector(
        (state) => state.productState,
    );

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (show) {
            dispatch(
                productActions.requestProductBidHistory({
                    product: product,
                    page: 0,
                }),
            );
        }
    }, [show]);

    const onChangePage = (page: number) => {
        dispatch(
            productActions.requestProductBidHistory({
                product,
                page: page,
            }),
        );
    };

    const renderBidHistory = React.useCallback(() => {
        return bids.map((each: Bid, index) => {
            return (
                <tr key={each.id} className={classes.row}>
                    <td className={classes["date-time"]}>
                        <div className={classes.date}>{each.bidAt?.toLocaleDateString("en-AU")}</div>
                        <div className={classes.time}>{each.bidAt?.toLocaleTimeString()}</div>
                    </td>
                    <td>
                        <div className={classes.bidder}>{hideBidderName(each.bidder?.name ?? "")}</div>
                    </td>
                    <td>
                        <div className={classes.price}>{formatNumber(each.bidPrice?.toString() ?? "") + " VND"}</div>
                    </td>
                </tr>
            );
        });
    }, [bids]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName={classes["modal-lg"]}
            contentClassName={classes["modal-content"]}
        >
            <Modal.Header closeButton className={classes["modal-header"]} />
            <Modal.Body className={classes["modal-body"]}>
                <table className={classes.table}>
                    <tr className={classes["table-header"]}>
                        <th>Thời Gian</th>
                        <th>Người Mua</th>
                        <th>Giá</th>
                    </tr>
                    {isLoadingBidHistory && (
                        <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />
                    )}
                    {!isLoadingBidHistory && renderBidHistory()}
                </table>

                <div className="mt-5">
                    <Paginator
                        currentPage={currentBidHistoryPage}
                        totalPages={totalBidHistoryPages}
                        onItemSelected={onChangePage}
                        onNextClicked={onChangePage}
                        onPrevClicked={onChangePage}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}
