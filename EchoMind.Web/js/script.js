// Atualiza ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();


document.addEventListener('DOMContentLoaded', function() {
  const btnLogin = document.getElementById('btnLogin');
  const btnCadastro = document.getElementById('btnCadastro');

  async function handleAuth(action) {
    const email = document.getElementById("login") ? document.getElementById("login").value.trim() : '';
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    if (senha.length < 1) {
      alert("Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (action === 'cadastro') {
      // Cadastro: envia email como username e email
      try {
        const response = await fetch('http://localhost:8000/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email,
            password: senha
          })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = "upload.html";
        } else {
          alert(data.error || JSON.stringify(data));
        }
      } catch (err) {
        alert('Erro ao cadastrar.');
      }
    } else if (action === 'login') {
      // Login: envia email como username
      try {
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email,
            password: senha
          })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Login realizado com sucesso!');
          window.location.href = "upload.html";
        } else {
          alert(data.error || JSON.stringify(data));
        }
      } catch (err) {
        alert('Erro ao fazer login.');
      }
    }
  }

  if (btnLogin) {
    btnLogin.addEventListener('click', function(e) {
      e.preventDefault();
      handleAuth('login');
    });
  }
  if (btnCadastro) {
    btnCadastro.addEventListener('click', function(e) {
      e.preventDefault();
      handleAuth('cadastro');
    });
  }
});
