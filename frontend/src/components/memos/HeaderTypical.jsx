import { memo } from "react";
import Typical from "react-typical";

const StaticHeading = memo(({ text }) => (
  <div className="text-4xl font-extrabold text-primary-content">
    <Typical steps={text} loop={Infinity} wrapper="p" />
  </div>
));

export default StaticHeading;