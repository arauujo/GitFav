export async function searchGithubUser(username) {
  const endpoint = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Usuário ${username} não encontrado`);
    }

    const { login, name, public_repos, followers } = await response.json();
    return { login, name, public_repos, followers };
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    return null;
  }
}