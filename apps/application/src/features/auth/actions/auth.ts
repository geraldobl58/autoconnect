"use server";

export function authenticateUser(email: string, password: string) {
  // Aqui você pode adicionar a lógica para autenticar o usuário,
  // como verificar o email e senha em um banco de dados.
  console.log("Autenticando usuário:", { email, password });
}
