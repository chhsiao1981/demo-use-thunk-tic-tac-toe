import githubLogo from "../assets/github.svg";
import styles from "./Header.module.css";

export default () => {
  return (
    <div className={styles.root}>
      <span className={styles.username}>Hi～ </span>
      <a
        className={styles.link}
        href="https://chhsiao1981.github.io/demo-use-thunk/"
      >
        async-counter
      </a>
      <a
        href="https://github.com/chhsiao1981/demo-use-thunk-tic-tac-toe"
        className={styles.github}
      >
        <img aria-label="github logo" src={githubLogo} />
      </a>
    </div>
  );
};
