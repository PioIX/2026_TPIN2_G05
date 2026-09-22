

export default function Input({funcion, text, tipo}) {


    return(
        <input type={tipo} onChange={funcion} placeholder={text}></input>

    );
}