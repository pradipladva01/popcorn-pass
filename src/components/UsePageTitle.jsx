import { useEffect } from "react";

function UsePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default UsePageTitle;
