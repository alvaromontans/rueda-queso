import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Menú</LinkButton>

      <p className="mt-7 font-semibold">
        Tu carta está vacía. Empieza a añadir algunas pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
