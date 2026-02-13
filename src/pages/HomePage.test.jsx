import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";

test("abre o menu Questionário ao clicar", () => {
  render(<HomePage />);

  // botão principal
  const botao = screen.getByText("Questionário");

  // antes do clique não aparece
  expect(screen.queryByText("Registar")).toBeNull();

  // clique
  fireEvent.click(botao);

  // depois do clique aparece
  expect(screen.getByText("Registar")).toBeInTheDocument();
});
