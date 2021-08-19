import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

const DelayLink = (props) => {
  let [isTimeOut, setIsTimeout] = useState(false);
  let history = useHistory();
  const { replace, to, delay, onDelayStart, onDelayEnd, children } = props;

  useEffect(() => {
    if (isTimeOut) {
      let delayTimeOut = setTimeout(() => {
        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
        }
        onDelayEnd();
      }, delay);

      return () => clearTimeout(delayTimeOut);
    }
  }, [delay, history, onDelayEnd, replace, to, isTimeOut]);
  const handleClick = useCallback(
    (e) => {
      onDelayStart(e, to);
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      setIsTimeout(true);
    },
    [to, onDelayStart]
  );

  return (
    <Link
      to={props.to}
      delay={props.delay}
      onClick={handleClick}
      className={props.className}
      replace={props.replace}>
      {children}
    </Link>
  );
};

DelayLink.prototype = {
  to: PropTypes.string.isRequired,
  delay: PropTypes.number,
  onDelayStart: PropTypes.func,
  onDelayEnd: PropTypes.func,
  replace: PropTypes.bool
};
DelayLink.defaultProps = {
  delay: 0,
  onDelayStart: () => { },
  onDelayEnd: () => { }
};

export default DelayLink;