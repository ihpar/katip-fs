import useLanguage from "../../hooks/use-language";

const UserFileActions = () => {
  const { t } = useLanguage("nav-titles");
  const printClickHandler = () => {
    console.log("printing...");
    window.print();
  };

  return (
    <ul className="user-menu">
      <li>
        <button disabled>
          <span className="i-sharp md-36">note_add</span>
        </button>
      </li>
      <li>
        <button disabled>
          <span className="i-sharp md-36">folder_open</span>
        </button>
      </li>
      <li>
        <button disabled>
          <span className="i-sharp md-36">upload</span>
        </button>
      </li>
      <li>
        <button disabled>
          <span className="i-sharp md-36">save</span>
        </button>
      </li>
      <li>
        <button disabled>
          <span className="i-sharp md-36">download</span>
        </button>
      </li>
      <li>
        <button title={t.print} onClick={printClickHandler}>
          <span className="i-sharp md-36">print</span>
        </button>
      </li>
      <li>
        <button disabled>
          <span className="i-sharp md-36">delete_forever</span>
        </button>
      </li>
    </ul>
  );
};

export default UserFileActions;