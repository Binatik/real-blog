import { HTMLAttributes } from "react";
import classes from "./Paginate.module.scss";
import classNames from "classnames";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type PaginationProps = {
  mode?: "primary";
} & HTMLAttributes<HTMLUListElement> &
  ReactPaginateProps;

function Paginate({ mode = "primary", ...props }: PaginationProps) {
  return (
    <ReactPaginate
      previousClassName={classes.previous}
      nextClassName={classes.next}
      breakClassName={classes.break}
      containerClassName={classes.pagination}
      pageClassName={classNames(classes.paginationItem, {
        [classes.primaryMode]: mode === "primary",
      })}
      activeClassName={classes.paginationActive}
      {...props}
    />
  );
}

export { Paginate };
