import Loader from "react-loader-spinner";
import s from "./Loader.module.css";
const Spinner = () => {
  return (
    <>
      <Loader className={s.Spinner}
        type="Bars"
        color="#F5A623"
        height={180}
        width={180}
        timeout={1000}
      />
    </>
  );
};
export default Spinner;
// не работает 