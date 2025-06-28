import { memo } from "react";
import Typical from "react-typical";

const StaticHeading = memo(({ text }) => (
  <div className="text-4xl font-extrabold text-primary-content overflow-hidden whitespace-nowrap">
    <Typical steps={text} loop={Infinity} wrapper="p" />
  </div>
));

export default StaticHeading;