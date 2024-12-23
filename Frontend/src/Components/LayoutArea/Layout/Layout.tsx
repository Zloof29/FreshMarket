import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import css from "./Layout.module.css";

export function Layout(): JSX.Element {
  return (
    <div className={css.Layout}>
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <Routing />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
