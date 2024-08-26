import { searchGithubUser } from "./searchGithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(username) {
    const userExists = this.entries.some(
      (entry) => entry.login.toLowerCase() === username.toLowerCase()
    )

    if (userExists) {
      return this.showError(`Usuário <b>'${username}'</b> já cadastrado!`);
    }

    const user = await searchGithubUser(username);

    if (!user) {
      return this.showError(`Usuário <b>'${username}'</b> não encontrado!`);
    }
    
    this.entries.unshift(user);
    this.update();
    this.save();
    this.showSuccess(`Usuário <b>'${user.login}'</b> cadastrado com sucesso!`);
  }

  delete(user) {
    this.entries = this.entries.filter((entry) => entry.login !== user.login);
    this.update();
    this.save();
    this.showSuccess(`Usuário <b>'${user.login}'</b> removido com sucesso.`);
  }

  showSuccess(message) {
    this.showNotification(message, "success");
  }

  showError(message) {
    this.showNotification(message, "error");
  }

  showNotification(message, icon) {
    Swal.fire({
      icon,
      title: icon === "error" ? "Erro!" : undefined,
      html: message,
      width: '40rem',
      background: '#06191d',
      confirmButtonColor: '#065d7a',
      customClass: {
        popup: 'swal-popup',
        icon: 'swal-icon',
        title: 'swal-title',
        htmlContainer: icon === "error" ? 'swal-text' : 'toast-text',
        confirmButton: 'swal-button',
        timerProgressBar: 'toast-progress-bar'
      },
      toast: icon === "success",
      position: icon === "success" ? "top-end" : "center",
      timer: icon === "success" ? 3000 : undefined,
      showConfirmButton: icon !== "success",
      timerProgressBar: icon === "success",
      didOpen: (toast) => {
        if (icon === "success") {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      },
    });
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");
    this.update();
    this.onAdd();
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button");
    const searchInput = this.root.querySelector(".search input");

    const addValue = async () => {
      const username = searchInput.value.trim();
      if (!username) return;

      addButton.disabled = true;
      await this.add(username);
      searchInput.value = "";
      addButton.disabled = false;
    };

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addValue();
      }
    });

    addButton.addEventListener("click", addValue);
  }

  update() {
    this.removeAllTr();

    if (this.entries.length === 0) {
      this.tbody.append(this.createEmptyRow());
    } else {
      for (const user of this.entries) {
        const row = this.createUserRow(user);
        this.tbody.append(row);
      }
    }
  }

  createUserRow(user) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/${user.login}.png" alt="Imagem de ${user.name ?? user.login}">
        <a href="https://github.com/${user.login}" target="_blank">
          <p>${user.name ?? user.login}</p>
          <span>/${user.login}</span>
        </a>
      </td>
      <td class="repositories">${user.public_repos}</td>
      <td class="followers">${user.followers}</td>
      <td><button class="remove">Remover</button></td>
    `;

    tr.querySelector(".remove").addEventListener("click", () => {
      Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja remover esse usuário?",
        icon: "warning",
        width: '40rem',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#f75967",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        background: '#06191d',
        customClass: {
          popup: 'swal-popup',
          icon: 'swal-icon',
          title: 'swal-title',
          confirmButton: 'swal-button',
          cancelButton: 'swal-button',
          htmlContainer: 'swal-text'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(user);
        }
      });
    });

    return tr;
  }

  removeAllTr() {
    this.tbody.innerHTML = '';
  }

  createEmptyRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="no-favorites" colspan="4">
        <img src="./assets/img/Estrela.svg" alt="Imagem de uma estrela">
        <p>Nenhum favorito ainda</p>
      </td>
    `;
    return tr;
  }
}