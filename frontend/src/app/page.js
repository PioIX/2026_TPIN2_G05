import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div>
      <p>ingrese su numnero de telefono</p>
      <input type="int" placeholder="1112345678" />
      <p>ingrese su contraseña</p>
      <input type="text" placeholder="%€@!!pass" />
    </div>
  );
}
          